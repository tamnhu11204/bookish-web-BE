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
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: [
            'http://localhost:3000',
            'http://localhost:8000',
            process.env.FRONTEND_URL || 'https://bookish-web-frontend.onrender.com',
            process.env.CHATBOT_URL || 'https://chatbot-backend.onrender.com'
        ],
        credentials: true,
    },
});

app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use(
    cors({
        origin: [
            'http://localhost:3000',
            'http://localhost:8000',
            process.env.FRONTEND_URL || 'https://bookish-web-frontend.onrender.com',
            process.env.CHATBOT_URL || 'https://chatbot-backend.onrender.com'
        ],
        credentials: true,
    })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/api/auth', authRouter);
app.get('/', (req, res) => {
    res.send('Hello world');
});
routes(app);

mongoose
    .connect(process.env.MONGO_DB || 'mongodb://localhost:27017/bookish_db')
    .then(() => console.log('Connect Db success!'))
    .catch((err) => console.log('Connect Db error:', err));

server.listen(process.env.PORT || 3001, () => {
    console.log('Server is running on port:', process.env.PORT || 3001);
});