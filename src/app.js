import connection from "./connection.js";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());


app.listen(4000,()=>{console.log('Server is Running')})