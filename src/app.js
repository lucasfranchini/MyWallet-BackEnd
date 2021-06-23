import connection from "./connection.js";
import express from "express";
import cors from "cors";
import { stripHtml } from "string-strip-html";
import userSchema from "./Validations/userSchema.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';

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
        const token = req.headers.authorization.replace('Bearer ', '');0
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
            validation.rowCount === 0 ? res.sendStatus(404):res.send(transactions.rows);
        }
        res.send(transactions.rows)
    }
    catch (e){
        console.log(e);
        res.sendStatus(500)
    }
})

app.listen(4000,()=>{console.log('Server is Running')})