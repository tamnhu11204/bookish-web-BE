const cron = require('node-cron');
const Parser = require('rss-parser');
const MongoClient = require('mongodb').MongoClient;

const parser = new Parser();
const url = 'mongodb+srv://tamnhu11204:nhunguyen11204@cluster0.kezkc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Thay bằng URL MongoDB của bạn
const dbName = 'test';

// Hàm lấy tin tức và lưu vào MongoDB
async function fetchAndSaveNews() {
    const feed = await parser.parseURL('https://vnexpress.net/rss/tin-moi-nhat.rss');
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection('newstrend');

    //đọc các thành phần cần thiết và lưu vào mongodb
    const newsItems = feed.items.map(item => ({
        title: item.title,
        link: item.link,
        contentSnippet: item.contentSnippet || item.description || item.content || 'No summary available',
        isoDate: item.isoDate,
        createdAt: new Date()
    }));

    await collection.insertMany(newsItems);
    console.log('Đã lưu tin tức mới.');

    // Xóa tin tức cũ (ví dụ: giữ 7 ngày gần nhất)
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    await collection.deleteMany({ createdAt: { $lt: oneWeekAgo } });
    console.log('Đã xóa tin tức cũ hơn 7 ngày.');

    client.close();
}

// Lịch chạy Cron Job (ví dụ: chạy mỗi ngày lúc 20h)
cron.schedule('0 20 * * *', () => {
    console.log('Chạy công việc lấy tin tức...');
    fetchAndSaveNews();
});

console.log('Cron Job đã được khởi động.');