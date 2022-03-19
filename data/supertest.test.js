import request from 'supertest';
import { app, server } from '../index.js';
import { garageCreator } from '../models/garage.model.js';
import { createToken } from '../services/auth.js';
import data from './garage.data.js';
import { installGarages } from '../services/db.js';

describe('Given the test database with a initial Task collection', () => {
    // const collection = '';
    let authToken;

    let firstGarageId;
    console.log('1');
    beforeAll(() => {
        server.close();
        console.log('2');
    });
    console.log('3');
    beforeEach(async () => {
        await installGarages(data.garages);
        const Garage = garageCreator();
        const mockGarages = await Garage.find({});
        firstGarageId = mockGarages[0].id;
        console.log({ firstGarageId });

        authToken = createToken({
            name: mockGarages[0].name,
            id: mockGarages[0].id,
        });
    });

    afterEach(() => {
        // connection.disconnect();
        server.close();
    });

    describe('When the request is GET /garages ', function () {
        test('responds with json & status 200', async function () {
            const response = await request(app).get('/garages');
            expect(response.statusCode).toBe(200);
        });
    });

    describe('When the request is POST /users ', function () {
        describe('And user is valid', () => {
            test('responds with json & status 200', async function () {
                const garage = { user: 'María', pass: '12345' };
                const response = await request(app)
                    .post('/garages')
                    .send(garage);
                expect(response.statusCode).toBe(200);
            });
        });
        describe('And garage is not valid', () => {
            test('responds with json & status 200', async function () {
                const garage = {};
                const response = await request(app)
                    .post('/garages')
                    .send(garage);
                expect(response.statusCode).toBe(500);
            });
        });
    });

    describe('When the request is POST /login ', function () {
        describe('When garage is valid', () => {
            test('responds with json & status 200', async function () {
                const garage = { user: 'Pepe', pass: '1234' };
                const response = await request(app)
                    .post('/login')
                    .set('Accept', 'application/json')
                    .send(garage);
                expect(response.statusCode).toBe(200);
            });
        });
        describe('When user is not valid', () => {
            test('responds with json & status 401', async function () {
                const garage = { user: 'Marta', pass: '12345' };
                const response = await request(app)
                    .post('/login')
                    .set('Accept', 'application/json')
                    .send(garage);
                expect(response.statusCode).toBe(401);
            });
        });
        describe('When pass is not valid', () => {
            test('responds with json & status 401', async function () {
                const garage = { user: 'Pepe', pass: '346578' };
                const response = await request(app)
                    .post('/login')
                    .set('Accept', 'application/json')
                    .send(garage);
                expect(response.statusCode).toBe(401);
            });
        });
        describe('When there are not user or pass', () => {
            test('responds with json & status 401', async function () {
                const garage = { user: 'Marta' };
                const response = await request(app)
                    .post('/login')
                    .set('Accept', 'application/json')
                    .send(garage);
                expect(response.statusCode).toBe(401);
            });
        });
    });
});
