// Acceptance tests
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';

chai.use(chaiHttp);

let token;
const API = 'koa-backend-svc.development.svc.cluster.local:5000';
const loginData = {
    username: process.env.DEV_ADMIN_USERNAME,
    password: process.env.DEV_ADMIN_PASS
};

describe('Login Endpoints', () => {
    it('POST /api/auth/login should respond with a token', async () => {
        const res = await request(API).post('/api/auth/login').send(loginData).expect((res: any) => {
            res.body.token.length;
        });

        token = res.body.token;
    });
});

describe('User Endpoints', () => {
    it('GET /api/user should return status code 200', (done: any) => {
        request(API).get('/api/user').set('Authorization', 'Bearer ' + token).expect(200, done);
    });
});
