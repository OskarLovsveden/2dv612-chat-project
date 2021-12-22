// Acceptance tests
import chai from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';

chai.use(chaiHttp);

let token;
const API = 'koa-backend-svc.development.svc.cluster.local:5000';
// const API = 'localhost:5000';
// const loginData = {
//     username: process.env.DEV_USERNAME,
//     password: process.env.DEV_PASS
// };

const loginData = {
    username: 'useradmin',
    password: 'admin123'
};

describe('Auth Endpoints', () => {
    it('POST /api/auth/login should respond with a token', async () => {
        const res = await request(API).post('/api/auth/login').send(loginData).expect((res: any) => {
            res.body.token.length;
        }).expect(200);

        token = res.body.token;
    });

    it('POST /api/auth/login should return status code 400', (done: any) => {
        request(API).post('/api/auth/login').expect(400, done);
    });
});

describe('Application Endpoints', () => {
    it('GET /api/user should return status code 200', (done: any) => {
        request(API).get('/api/user').set('Authorization', 'Bearer ' + token).expect(200, done);
    });

    it('GET /api/user should return status code 401', (done: any) => {
        request(API).get('/api/user').expect(401, done);
    });

    it('GET /api/room should return status code 200', (done: any) => {
        request(API).get('/api/room').set('Authorization', 'Bearer ' + token).expect(200, done);
    });

    it('GET /api/room should return status code 401', (done: any) => {
        request(API).get('/api/room').expect(401, done);
    });
});
