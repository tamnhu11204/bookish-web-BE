// cron_news.js
const cron = require('node-cron');
const Parser = require('rss-parser');
const { MongoClient, ObjectId } = require('mongodb');
const axios = require('axios');

const parser = new Parser();
const MONGO_URL = 'mongodb+srv://tamnhu11204:nhunguyen11204@cluster0.kezkc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const DB_NAME = 'test';
const COLL_NAME = 'newstrend';

// === THÊM: CHO PHÉP TEST NGAY ===
const RUN_NOW = process.argv.includes('--now') || process.argv.includes('-n');
const TEST_MODE = process.argv.includes('--test');

// === HÀM CHÍNH ===
async function fetchAndSaveNews() {
    console.log(`[${new Date().toLocaleString()}] Bắt đầu lấy tin tức...`);

    try {
        const feed = await parser.parseURL('https://vnexpress.net/rss/tin-moi-nhat.rss');
        const client = await MongoClient.connect(MONGO_URL);
        const db = client.db(DB_NAME);
        const coll = db.collection(COLL_NAME);

        const newsItems = feed.items.slice(0, TEST_MODE ? 3 : 10).map(item => ({
            title: item.title?.trim(),
            link: item.link?.trim(),
            contentSnippet: (item.contentSnippet || item.description || '').trim(),
            publishedAt: item.isoDate ? new Date(item.isoDate) : new Date(),
            source: 'vnexpress',
            createdAt: new Date()
        })).filter(n => n.title && n.link);

        const ops = newsItems.map(item => ({
            updateOne: {
                filter: { link: item.link },
                update: { $setOnInsert: item },
                upsert: true
            }
        }));

        const result = await coll.bulkWrite(ops);
        const newIds = Object.keys(result.upsertedIds).map(k => result.upsertedIds[k].toString());

        if (newIds.length > 0) {
            const newArticles = await coll.find({ _id: { $in: newIds.map(id => new ObjectId(id)) } }).toArray();
            const payload = {
                articles: newArticles.map(a => ({
                    id: a._id.toString(),
                    title: a.title,
                    content: a.contentSnippet
                }))
            };

            console.log(`Gửi ${newIds.length} tin mới đến AI service...`);
            const res = await axios.post('http://localhost:8000/ai/news/vectorize', payload);
            console.log("Vectorize thành công:", res.data);
        } else {
            console.log("Không có tin mới.");
        }

        // Xóa tin cũ > 7 ngày
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const deleted = await coll.deleteMany({ createdAt: { $lt: weekAgo } });
        console.log(`Đã xóa ${deleted.deletedCount} tin cũ.`);

        await client.close();
    } catch (e) {
        console.error("Lỗi cron:", e.message);
    }
}

// === CHẠY NGAY NẾU CÓ --now ===
if (RUN_NOW) {
    console.log("TEST MODE: Chạy ngay lập tức...");
    fetchAndSaveNews().then(() => process.exit(0));
}

// === ĐẶT GIỜ 10:20 HÀNG NGÀY ===
cron.schedule('20 10 * * *', () => {
    console.log("Cron kích hoạt lúc 10:20...");
    fetchAndSaveNews();
});

console.log('Cron đã sẵn sàng. Chạy hàng ngày lúc 10:20. Dùng --now để test ngay.');