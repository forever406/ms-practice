const express = require('express');
const {Client}=require('pg');
const router = express.Router();
const client =new Client({
      host: 'db',
      port: 5432,
      database: 'user_test_table',
      user: 'postgres',
      password: '',
  });

router.post('/add', async(req, res, next)=> {
    let body=req.body;
    console.log(body);
    await client.connect();
    await client.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto";');
    let dbResult=await client.query('SELECT * FROM account WHERE username = ($1);',[body.username]);
    if (dbResult.rows[0]){
        res.json({
            status:-1,
            msg:'account already exists'
        });
    }else{
        client.query("INSERT INTO account(username, password,userid) VALUES('"+
            body.username+ "', '"+
            body.password+ "',"+"gen_random_uuid());"
        ).then(
            (result)=>{
                client.query('SELECT * FROM account WHERE username = ($1);',[body.username]
                ).then(
                    (result)=>{
                        res.json({
                            userid:result.rows[0].userid,
                            status:0,
                            msg:'add account succeed'
                        });
                    }
                ).catch(
                    (err)=>{
                        res.json({
                            status:-1,
                            msg:'add account fail'
                        });
                    }
                );
            }
        ).catch((err)=>{
            console.log(err);
        });
    }
});
router.post('/login', async(req, res, next)=> {
    let body=req.body;
    await client.connect();
    let dbResult=await client.query('SELECT * FROM account WHERE username = ($1);',[body.username]);
    (body.password===dbResult.rows[0].password)? res.json({
        msg:'log in succeed',
        userid: dbResult.rows[0].userid,
        status:0
    }):res.json({
        status:-1,
        msg:'log in fail'});
});
module.exports=router;
