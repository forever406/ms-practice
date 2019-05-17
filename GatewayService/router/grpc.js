const express = require('express');
const router = express.Router();
const PROTO_PATH = __dirname + '/../../AccountMicroService/service.proto';
const grpc=require('grpc');
const protoLoader=require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
const account_proto=grpc.loadPackageDefinition(packageDefinition).accountservice;
const HOST='account:50051';
const HOST1='account1:50051';
let client=new account_proto.AccountService(HOST,
    grpc.credentials.createInsecure());
let client1=new account_proto.AccountService(HOST1,
    grpc.credentials.createInsecure());
router.post('/add', (req, res, next)=> {
    const body=req.body;
    console.log(body);
    Math.random()<0.5?
    client.SignupNewUser({username:body.username,
        password:body.password},(err,response)=>{
        res.json({msg:response.message})
    }):client1.SignupNewUser({username:body.username,
            password:body.password},(err,response)=>{
            res.json({msg:response.message})
    });
});

router.post('/login',(req, res, next)=> {
    const body=req.body;
    client.LoginUser({username:body.username,
        password:body.password},(err, response)=>{
        res.json({msg:response.message})
    });
});

module.exports=router;
