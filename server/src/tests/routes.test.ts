// Acceptance tests

import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';

chai.use(chaiHttp);

let token;
const API = 'http://localhost:5000';
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
    it('GET /api/user should show all users', (done: any) => {
        request(API).get('/api/user').set('Authorization', 'Bearer ' + token).expect(200, done);
    });

    it('GET /api/user/:id should get user with ID 13', async () => {
        await request(API).get('/api/user/13').set('Authorization', 'Bearer ' + token).expect((res: any) => {
            const expected = {
                id: 13,
                username: 'user',
                role: 'user',
                active: true
            };

            expect(res.body).to.deep.equal(expected);
        });
    });
});
