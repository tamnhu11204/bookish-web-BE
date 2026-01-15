// cron_news.js
const cron = require('node-cron');
const cheerio = require('cheerio');
const { MongoClient } = require('mongodb');
const axios = require('axios');

const MONGO_URL = 'mongodb+srv://tamnhu11204:nhunguyen11204@cluster0.kezkc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const DB_NAME = 'test';
const COLL_NAME = 'newstrend';

// CẤU HÌNH
const BASE_URL = 'https://vnexpress.net/giai-tri/sach/diem-sach';
const MAX_PAGES = 5; // Tăng lên nếu muốn crawl nhiều hơn (ví dụ 10 → ~200 bài), nhưng cẩn thận block IP
const ARTICLES_PER_PAGE_EST = 20; // Ước lượng để log

// TEST MODE
const RUN_NOW = process.argv.includes('--now') || process.argv.includes('-n');
const TEST_MODE = process.argv.includes('--test');

async function fetchAndSaveNews() {
    console.log(`[${new Date().toLocaleString()}] Bắt đầu crawl Điểm sách VnExpress (tối đa ${TEST_MODE ? 1 : MAX_PAGES} trang)...`);
    let client;

    try {
        const allNewsItems = [];
        let page = 1;
        let hasMore = true;

        while (hasMore && page <= (TEST_MODE ? 1 : MAX_PAGES)) {
            const url = page === 1 ? BASE_URL : `${BASE_URL}-p${page}`;
            console.log(`  → Crawl trang ${page}: ${url}`);

            const response = await axios.get(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                },
                timeout: 15000
            });

            const $ = cheerio.load(response.data);

            let pageItems = 0;

            // Selector cho VnExpress: thường là .list_news .item-news, hoặc .tb-row, nhưng phổ biến nhất:
            $('.list_news .item-news, article.item-news, .tb-row, li').each((i, el) => {
                const $el = $(el);

                // Title & Link
                const titleEl = $el.find('h3.title-news a, h2.title-news a, .title-news a, h3 a, .title a');
                const title = titleEl.text().trim();
                let link = titleEl.attr('href') || $el.find('a').first().attr('href');

                if (!link || !title || title.length < 10) return;

                if (!link.startsWith('http')) {
                    link = new URL(link, BASE_URL).href;
                }

                if (!link.includes('vnexpress.net/') || !link.endsWith('.html')) return;

                // Excerpt (description/sapo)
                let contentSnippet = '';
                const descEl = $el.find('.description a, .sapo, .lead, .excerpt, p');
                if (descEl.length) {
                    contentSnippet = descEl.first().text().trim().substring(0, 350);
                } else {
                    // Fallback: text sau title hoặc trong item
                    contentSnippet = $el.find('p').text().trim().substring(0, 350) ||
                        $el.text().replace(title, '').trim().substring(0, 350) || '';
                }

                allNewsItems.push({
                    title,
                    link,
                    contentSnippet: contentSnippet || 'Không có mô tả',
                    publishedAt: new Date(), // fallback (danh mục không có ngày chính xác)
                    source: 'vnexpress-diemsach',
                    createdAt: new Date()
                });

                pageItems++;
            });

            console.log(`    → Trang ${page}: crawl được ${pageItems} bài`);

            // Nếu trang không có bài → dừng
            if (pageItems === 0) {
                hasMore = false;
            }

            page++;
            // Delay nhẹ để tránh bị block
            await new Promise(resolve => setTimeout(resolve, 1500));
        }

        if (allNewsItems.length === 0) {
            console.warn('Không crawl được bài viết nào. Có thể selector cần điều chỉnh hoặc trang thay đổi cấu trúc.');
            return;
        }

        console.log(`=> Tổng crawl được ${allNewsItems.length} bài từ ${page - 1} trang`);

        // Kết nối MongoDB
        client = await MongoClient.connect(MONGO_URL);
        const db = client.db(DB_NAME);
        const coll = db.collection(COLL_NAME);

        // Upsert: chỉ insert nếu link chưa tồn tại
        const ops = allNewsItems.map(item => ({
            updateOne: {
                filter: { link: item.link },
                update: { $setOnInsert: item },
                upsert: true
            }
        }));

        const result = await coll.bulkWrite(ops);
        const newCount = result.upsertedCount || 0;
        const newIds = Object.values(result.upsertedIds || {});

        console.log(`=> Insert mới: ${newCount} bài (các bài trùng đã bỏ qua)`);

        let articlesToSend = [];

        if (newCount > 0) {
            console.log(`=> Có ${newCount} tin mới → gửi sang AI service`);
            articlesToSend = await coll.find({ _id: { $in: newIds } }).toArray();
        } else if (RUN_NOW) {
            console.log(`=> Không có tin mới, nhưng --now: lấy ${TEST_MODE ? 5 : 20} tin gần nhất để đồng bộ lại`);
            articlesToSend = await coll.find({ source: 'vnexpress-diemsach' })
                .sort({ createdAt: -1 })
                .limit(TEST_MODE ? 5 : 20)
                .toArray();
        }

        // Gửi sang AI nếu có
        if (articlesToSend.length > 0) {
            const payload = {
                articles: articlesToSend.map(a => ({
                    id: a._id.toString(),
                    title: a.title,
                    content: a.contentSnippet
                }))
            };

            console.log(`=> Gửi ${articlesToSend.length} bài tới AI service...`);
            try {
                const res = await axios.post('http://localhost:8000/ai/news/vectorize', payload, { timeout: 60000 });
                console.log("=> AI OK:", res.data);
            } catch (err) {
                console.error("=> LỖI AI service:", err.message);
            }
        }

        // Dọn dẹp cũ >7 ngày
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const deleted = await coll.deleteMany({ createdAt: { $lt: weekAgo } });
        if (deleted.deletedCount > 0) {
            console.log(`=> Xóa ${deleted.deletedCount} tin cũ`);
        }

    } catch (e) {
        console.error("!!! LỖI crawl:", e.message);
    } finally {
        if (client) await client.close();
    }
}

// CHẠY THỦ CÔNG (--now)
if (RUN_NOW) {
    console.log("=== CHẾ ĐỘ CHẠY NGAY ===");
    fetchAndSaveNews().then(() => {
        console.log("Hoàn tất.");
        process.exit(0);
    });
}

// CRON: 10:20 hàng ngày
cron.schedule('20 10 * * *', () => {
    console.log("=== TỰ ĐỘNG CHẠY HÀNG NGÀY ===");
    fetchAndSaveNews();
});

console.log('Cron Điểm sách VnExpress đã sẵn sàng');
console.log(`- Tự động: 10:20 hàng ngày (crawl tối đa ${MAX_PAGES} trang)`);
console.log('- Chạy thủ công: node cron_news.js --now');
console.log('- Test nhanh: node cron_news.js --now --test');