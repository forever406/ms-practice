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
const HOST='';
let client=new account_proto.AccountService(HOST,
    grpc.credentials.createInsecure());
router.post('/login', (req, res, next)=> {
    const body=req.body;
    client.SignupNewUser({username:body.username,
        password:body.password},(err,response)=>{
        res.json({msg:response.message})
    });
});

router.post('/login',(req, res, next)=> {
    const body=req.body;
    client.SignupNewUser({username:body.username,
        password:body.password},(err, response)=>{
        res.json({msg:response.message})
    };
});

module.exports=router;
