import supertest from "supertest";
import app from "../src/app";
import connection from "../src/database";

beforeEach(async ()=>{
    await connection.query(`DELETE FROM users `)
})

afterAll(()=>{
    connection.end();
})

describe("POST /sign-up", () => {
    it("returns status 200 for valid params", async () => {
        const body = {
            "email": "123@teste.com",
            "password": "456",
            "name":"789"
        }
        const result = await supertest(app).post('/sign-up').send(body)
        expect(result.status).toEqual(201);
    });

    it("returns status 409 for duplicated params", async () => {
        const body = {
            "email": "123@teste.com",
            "password": "456",
            "name":"789"
        }
        await supertest(app).post('/sign-up').send(body)
        const result = await supertest(app).post('/sign-up').send(body)
        expect(result.status).toEqual(409);
    });

    it("returns status 400 for empty name", async () => {
        const body = {
            "email": "123@teste.com",
            "password": "456",
            "name":""
        };
        const result = await supertest(app).post('/sign-up').send(body)
        expect(result.status).toEqual(400);
    });

    it("returns status 400 for empty params", async () => {
        const body = {};
        const result = await supertest(app).post('/sign-up').send(body)
        expect(result.status).toEqual(400);
    });
});

describe("POST /sign-in", () => {
    beforeEach(async ()=>{
        const body = {
            "email": "123@teste.com",
            "password": "456",
            "name":"789"
        }
        await supertest(app).post('/sign-up').send(body)
    })
    it("returns status 200 for valid params", async () => {
        const body = {
            "email": "123@teste.com",
            "password": "456"
        }
        const result = await supertest(app).post('/sign-in').send(body)
        expect(result.body.name).toEqual('789');
    });
    it("returns status 400 for invalid passwords", async () => {
        const body = {
            "email": "123@teste.com",
            "password": "4567"
        }
        const result = await supertest(app).post('/sign-in').send(body)
        expect(result.status).toEqual(400);
    });
    it("returns status 400 for empty email", async () => {
        const body = {
            "email": "",
            "password": "456"
        }
        const result = await supertest(app).post('/sign-in').send(body)
        expect(result.status).toEqual(400);
    });
    it("returns status 400 for empty params", async () => {
        const body = {}
        const result = await supertest(app).post('/sign-in').send(body)
        expect(result.status).toEqual(400);
    });
});

describe("POST /sign-out", () => {
    let token;
    beforeEach(async ()=>{
        const body = {
            "email": "123@teste.com",
            "password": "456",
            "name":"789"
        }
        await supertest(app).post('/sign-up').send(body);
        const result = await supertest(app).post('/sign-in').send(body);
        token = result.body.token;
    })
    it("returns status 200 for valid token", async () => {
        const result = await supertest(app).post('/sign-out').set('Authorization',`Bearer ${token}`);
        expect(result.status).toEqual(200);
    });
    it("returns status 400 for invalid token", async () => {
        const result = await supertest(app).post('/sign-out').set('Authorization',"token");
        expect(result.status).toEqual(400);
    });
    it("returns status 401 for empty token", async () => {
        const result = await supertest(app).post('/sign-out')
        expect(result.status).toEqual(401);
    });
});

