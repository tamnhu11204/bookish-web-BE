// cron_news.js
const cron = require('node-cron');
const Parser = require('rss-parser');
const { MongoClient, ObjectId } = require('mongodb');
const axios = require('axios');

const parser = new Parser();
const MONGO_URL = 'mongodb+srv://tamnhu11204:nhunguyen11204@cluster0.kezkc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const DB_NAME = 'test';
const COLL_NAME = 'newstrend';

// === CẤU HÌNH TEST ===
const RUN_NOW = process.argv.includes('--now') || process.argv.includes('-n');
const TEST_MODE = process.argv.includes('--test');

async function fetchAndSaveNews() {
    console.log(`[${new Date().toLocaleString()}] Bắt đầu tiến trình xử lý tin tức...`);
    let client;

    try {
        const feed = await parser.parseURL('https://vnexpress.net/rss/tin-moi-nhat.rss');
        client = await MongoClient.connect(MONGO_URL);
        const db = client.db(DB_NAME);
        const coll = db.collection(COLL_NAME);

        // 1. Chuẩn bị dữ liệu từ RSS
        const newsItems = feed.items.slice(0, TEST_MODE ? 3 : 10).map(item => ({
            title: item.title?.trim(),
            link: item.link?.trim(),
            contentSnippet: (item.contentSnippet || item.description || '').trim(),
            publishedAt: item.isoDate ? new Date(item.isoDate) : new Date(),
            source: 'vnexpress',
            createdAt: new Date()
        })).filter(n => n.title && n.link);

        // 2. Thực hiện Upsert vào MongoDB
        const ops = newsItems.map(item => ({
            updateOne: {
                filter: { link: item.link },
                update: { $setOnInsert: item },
                upsert: true
            }
        }));

        const result = await coll.bulkWrite(ops);
        const newIds = Object.values(result.upsertedIds);

        let articlesToSend = [];

        // 3. Logic quyết định gửi tin tức nào sang AI Service
        if (newIds.length > 0) {
            console.log(`=> Phát hiện ${newIds.length} tin mới hoàn toàn.`);
            articlesToSend = await coll.find({ _id: { $in: newIds } }).toArray();
        }
        else if (RUN_NOW) {
            console.log("=> Không có tin mới trong RSS, nhưng bạn đang chạy chế độ TEST (--now).");
            console.log("=> Đang lấy 10 tin cũ nhất trong máy để đồng bộ lại với AI Service...");
            articlesToSend = await coll.find().sort({ createdAt: -1 }).limit(10).toArray();
        }

        // 4. Gửi dữ liệu sang AI Service
        if (articlesToSend.length > 0) {
            const payload = {
                articles: articlesToSend.map(a => ({
                    id: a._id.toString(),
                    title: a.title,
                    content: a.contentSnippet
                }))
            };

            console.log(`=> Đang gửi ${articlesToSend.length} tin tới AI service (http://localhost:8000/ai/news/vectorize)...`);
            try {
                const res = await axios.post('http://localhost:8000/ai/news/vectorize', payload);
                console.log("=> AI Service phản hồi thành công:", res.data);
            } catch (err) {
                console.error("=> LỖI: Không thể kết nối tới AI Service. Hãy chắc chắn FastAPI đang chạy.");
                console.error("   Chi tiết lỗi:", err.message);
            }
        } else {
            console.log("=> Không có dữ liệu tin tức nào để gửi.");
        }

        // 5. Dọn dẹp tin cũ > 7 ngày để tránh rác DB
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const deleted = await coll.deleteMany({ createdAt: { $lt: weekAgo } });
        if (deleted.deletedCount > 0) {
            console.log(`=> Đã dọn dẹp ${deleted.deletedCount} tin cũ từ hệ thống.`);
        }

    } catch (e) {
        console.error("!!! Lỗi thực thi cron:", e.message);
    } finally {
        if (client) await client.close();
    }
}

// === KHỞI CHẠY ===

if (RUN_NOW) {
    console.log("--------------------------------------------------");
    console.log("CHẾ ĐỘ CHẠY NGAY TẬP TRUNG (MANUAL MODE)");
    fetchAndSaveNews().then(() => {
        console.log("Hoàn tất xử lý thủ công.");
        process.exit(0);
    });
}

// Lịch chạy tự động (10:20 mỗi ngày)
cron.schedule('20 10 * * *', () => {
    console.log("--------------------------------------------------");
    console.log("Kích hoạt lịch chạy tự động hàng ngày...");
    fetchAndSaveNews();
});

console.log('Hệ thống Cron News đã sẵn sàng.');
console.log('- Tự động chạy: 10:20 hàng ngày.');
console.log('- Chạy thủ công & Đồng bộ lại AI: node src/cron-jobs/cronJob.js --now');