const express = require('express');
const {Client}=require('pg');
const router = express.Router();
const getClient =()=>{
  return new Client({
      host: 'zjk.vkwk.site',
      port: 5432,
      database: 'user_test_table',
      user: 'postgres',
      password: '',
  });
};

router.post('/add', async(req, res, next)=> {
    let body=req.body;
    let client=getClient();
    await client.connect();
    await client.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto";');
    let dbResult=await client.query('SELECT * FROM account WHERE username = ($1);',[body.username]);
    if (dbResult.rows[0]){
        res.json({
            status:-1,
            msg:'account already exists'
        })
        client=null
    }else{
        client.query("INSERT INTO account(username, password,userid) VALUES('"+
            body.username+ "', '"+
            body.password+ "',"+"gen_random_uuid());"
        ).then(
            (result)=>{
                client.query('SELECT * FROM account WHERE username = ($1);',[body.username]).then(
                    (result)=>{
                        res.json({
                            userid:result.rows[0].userid,
                            status:0,
                            msg:'add account succeed'
                        })
                    }
                );
                client=null
            }
        ).catch((err)=>{
            console.log(err);
            client=null
        });
    }
});
router.post('/login', async(req, res, next)=> {
    let body=req.body;
    let client=getClient();
    await client.connect();
    let dbResult=await client.query('SELECT * FROM account WHERE username = ($1);',[body.username]);
    (body.password===dbResult.rows[0].password)? res.json({
        msg:'log in succeed',
        userid: dbResult.rows[0].userid,
        status:0
    }):res.json({
        status:-1,
        msg:'log in fail'})
    client=null
});
module.exports=router;
