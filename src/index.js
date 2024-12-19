const express=require("express");
const dotenv=require('dotenv');
const { default: mongoose } = require("mongoose");
const routes=require('./routes')
const bodyParser = require('body-parser')
const cors=require('cors');
const cookieParser = require('cookie-parser')

dotenv.config()

const app=express()
const port=process.env.PORT || 3001


// Server-side (Node.js với Express):
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));


// Cấu hình giới hạn tải lên (ví dụ: 50MB)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(bodyParser.json())
app.use(cookieParser())

app.get('/',(req,res)=>{
    res.send('Hello worldvgchch')
})

routes(app);

mongoose.connect(`${process.env.MONGO_DB}`)
.then(()=>{
    console.log('Connect Db success!')
})
.catch((err)=>{
    console.log(err)
})

app.listen(port, ()=>{
  console.log('Server is running in port:',+port)
})