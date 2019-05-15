const express = require('express');
const router = express.Router();


router.get('/', (req, res, next)=> {
    res.json({msg:'hello from grpc'})
});

module.exports=router;
