const http=require('http');
const express=require('express');
const logger=require('morgan');
const app=express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use('/native',require('./router/native'));
app.use('/grpc',require('./router/grpc'));
app.get('/test',(req,res,next)=>{
    res.json({msg:0})
});

const server=http.createServer(app);
server.listen(3000,()=>{
    console.log('Nodejs running on port 3000');
});
