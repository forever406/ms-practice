const express = require('express');
const {Client,Pool}=require('pg');
const router = express.Router();
const pool =new Pool({
    host: 'db',
    port: 5432,
    database: 'user_test_table',
    user: 'postgres',
    password: '',
    max: 100,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });
client.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto";');


router.post('/add', async(req, res, next)=> {
    let body=req.body;
    console.log(body);
    const client = await pool.connect();
    let dbResult=await client.query('SELECT * FROM account WHERE username = ($1);',[body.username]);
    if (dbResult.rows[0]){
        res.json({
            status:-1,
            msg:'account already exists'
        });
    }else{
       let result=await client.query("INSERT INTO account(username, password,userid) VALUES('"+
            body.username+ "', '"+
            body.password+ "',"+"gen_random_uuid());"
        )
        res.json({
            status: 0,
            msg: 'add account succeed'
        });
    }
    client.release(true)
});
router.post('/login', async(req, res, next)=> {
    let body=req.body;
    const client = await pool.connect();
    let dbResult= await client.query('SELECT * FROM account WHERE username = ($1);',[body.username]);
    dbResult.rows[0].password&&(body.password===dbResult.rows[0].password)? res.json({
        msg:'log in succeed',
        userid: dbResult.rows[0].userid,
        status:0
    }):res.json({
        status:-1,
        msg:'log in fail'});
    client.release(true)
});
module.exports=router;
