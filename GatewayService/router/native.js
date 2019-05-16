const express = require('express');
const {Client}=require('pg');
const router = express.Router();
const client = new Client({
    host: 'db',
    port: 5432,
    database: 'user_test_table',
    user: 'postgres',
    password: '',
});

router.post('/add', async(req, res, next)=> {
    let body=req.body;
    await client.connect();
    let dbResult=await client.query('INSERT INTO user(username, password) VALUES($1, $2)', [body.username, body.password]);
    client.end((err) => {
        console.log('client has disconnected');
        if (err) {
            console.log('error during disconnection', err.stack)
        }
    });
    res.json({msg:dbResult})
});
router.post('/login', async(req, res, next)=> {
    let body=req.body;
    await client.connect();
    let dbResult=await client.query('select username, password from person where username = $1', body.username);
    (body.password===dbResult.row[0].password)? res.json({msg:'log in succeed'}):res.json({msg:'log in fail'})
});
module.exports=router;
