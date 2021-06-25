import supertest from "supertest";
import app from "../src/app";
import connection from "../src/database";

let token;

beforeAll(async ()=>{
    await connection.query(`DELETE FROM users`)
    const body = {
        "email": "123@teste.com",
        "password": "456",
        "name":"789"
    }
    await supertest(app).post('/sign-up').send(body);
    const result = await supertest(app).post('/sign-in').send(body);
    token = result.body.token;
})

afterAll(()=>{
    connection.end();
})

describe('GET /transactions',()=>{

});

describe('POST /transactions',()=>{

});