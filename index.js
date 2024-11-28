const express = require('express');
const app = express();
const port = 8080;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { User } =  require('./models/User');
const config = require('./config/key')
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
mongoose.connect(config.mongoURI).then(() => {
    console.log('MongoDB connected');
}).catch((err) => {
    console.log(err)
})

app.get('/', (req,res)=>{
    res.send('hi~');
    res.end();
})

app.post('/register', async(req,res) => {
    const user =  new User(req.body);
    const result = await user.save().then(()=>
    console.log(res.json({success:true}))).catch((err)=>{
        console.log(res.json({success:false,err}));
    })
})

app.listen(port, ()=>{
    console.log('{$port}버ㄴ 포트에서 서버 실행중');
})