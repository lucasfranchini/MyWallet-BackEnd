import connection from "./connection.js";
import express from "express";
import cors from "cors";
import { stripHtml } from "string-strip-html";
import userSchema from "./Validations/userSchema.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import dayjs from "dayjs";
import transactionSchema from "./Validations/transactionSchema.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post('/sign-up', async (req,res)=>{
    try{
        const {email,password,name} = req.body;
        const newUser = {
            email: stripHtml(email).result.trim(),
            password: stripHtml(password).result.trim(),
            name: stripHtml(name).result.trim()
        }
        const emailInUse = await connection.query(`
            SELECT * 
            FROM users
            WHERE email= $1
        `,[newUser.email]);
        const validation = userSchema.validate(newUser);

        if(emailInUse.rowCount > 0){
            return res.sendStatus(409)
        }
        if(!!validation.error){
            return res.sendStatus(400);
        }

        const hash = bcrypt.hashSync(newUser.password,12);
        await connection.query(`
            INSERT INTO users
            (name,email,password)
            VALUES ($1,$2,$3)
        `,[newUser.name,newUser.email,hash])

        res.sendStatus(201)
    }
    catch (e){
        console.log(e);
        res.sendStatus(500)
    }
});

app.post('/sign-in',async (req,res)=>{
    try{
        const { email, password } = req.body;
        const validation = await connection.query(`
            SELECT * 
            FROM users
            WHERE email=$1 
        `,[email])
        const user = validation.rows[0];
        if(user && bcrypt.compareSync(password, user.password)) {
            const token = uuidv4();
            await connection.query(`
            INSERT INTO sessions ("userId", token)
            VALUES ($1, $2)
            `, [user.id, token]);
            res.send({
                name:user.name,
                token:token
            });
        } else {
            res.sendStatus(400);
        }
    }
    catch (e){
        console.log(e);
        res.sendStatus(500)
    }
})

app.get('/transactions',async (req,res)=>{
    try{
        const token = req.headers.authorization.replace('Bearer ', '');
        const transactions = await connection.query(`
        SELECT transactions.* 
        FROM transactions 
        JOIN sessions 
        ON transactions."userId"= sessions."userId" 
        where token=$1
        `,[token]);
        if(transactions.rowCount===0){
            const validation = await connection.query(`
            SELECT *
            FROM sessions
            WHERE token=$1
            `,[token]);
            return validation.rowCount === 0 ? res.sendStatus(401):res.send(transactions.rows);
        }
        transactions.rows.forEach(r=>{
            r.date=dayjs(r.date).format("DD/MM")
        })
        res.send(transactions.rows)
    }
    catch (e){
        console.log(e);
        res.sendStatus(500)
    }
})

app.post('/transactions', async (req,res)=>{
    try{
        if(!req.headers.authorization) return sendStatus(401)
        const token = req.headers.authorization.replace('Bearer ', '');
        const validation = transactionSchema.validate(req.body)
        if(validation.error){
            return res.sendStatus(400)
        }
        const authorization = await connection.query(`
            SELECT "userId" 
            FROM sessions
            WHERE token=$1
        `,[token])
        const id = authorization.rows[0].userId;
        if(!id) return sendStatus(400)
        const result = await connection.query(`
            INSERT INTO transactions 
            (date,value,type,"userId",name) 
            VALUES (NOW(),$1,$2,$3,$4);
        `,[req.body.value,req.body.type,id,req.body.description])
        result.rowCount===0 ? res.sendStatus(400):res.sendStatus(200)
        
    }
    catch (e){
        console.log(e);
        res.sendStatus(500)
    }
});

app.post('/sign-out', async (req,res)=>{
    try{
        if(!req.headers.authorization) return sendStatus(401);
    const token = req.headers.authorization.replace('Bearer ', '');
    const result= await connection.query(`
        DELETE FROM sessions
        WHERE token=$1
    `,[token]);
    result.rowCount === 0 ? res.sendStatus(400):res.sendStatus(200)
    }
    catch (e){
        console.log(e);
        res.sendStatus(500)
    }
})

app.listen(4000,()=>{console.log('Server is Running')})