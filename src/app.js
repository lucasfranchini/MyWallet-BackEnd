import connection from "./connection.js";
import express from "express";
import cors from "cors";
import { stripHtml } from "string-strip-html";

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
        const x = await connection.query(`
        SELECT * 
        FROM users
        WHERE email= $1
        `,[newUser.email]);
        if(x.rowCount > 0){
            return res.sendStatus(409)
        }
        console.log(x.rows,x.rowCount)

        res.sendStatus(201)
    }
    catch (e){
        console.log(e);
        res.sendStatus(500)
    }
});

app.listen(4000,()=>{console.log('Server is Running')})