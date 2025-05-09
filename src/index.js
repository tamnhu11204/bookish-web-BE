const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const routes = require('./routes');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRouter = require('./routes/AuthRouter');
const { Server } = require('socket.io');
const http = require('http');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Tạo server HTTP để tích hợp Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000', 'http://localhost:8000'],
        credentials: true,
    },
});

// Middleware Socket.IO
io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
    socket.on('disconnect', () => console.log('Client disconnected:', socket.id));
});

app.use((req, res, next) => {
    req.io = io;
    next();
});

// Middleware
app.use(
    cors({
        origin: ['http://localhost:3000', 'http://localhost:8000'],
        credentials: true,
    })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use('/api/auth', authRouter);
app.get('/', (req, res) => {
    res.send('Hello world');
});
routes(app);

// Kết nối MongoDB
mongoose
    .connect(process.env.MONGO_DB)
    .then(() => {
        console.log('Connect Db success!');
    })
    .catch((err) => {
        console.log('Connect Db error:', err);
    });

// Chạy server
server.listen(port, () => {
    console.log('Server is running on port:', port);
});