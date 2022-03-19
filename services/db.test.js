import * as dotenv from 'dotenv';
dotenv.config();
import { mongoConnect, installGarages, installServices } from './db.js';
import data from '../data/garage.data.js';
import mongoose from 'mongoose';

describe('given a connection with MongoDB', () => {
    afterEach(async () => {
        await mongoose.disconnect();
    });

    test('then should be possible connect to our DB ', async () => {
        const connect = await mongoConnect();
        expect(connect).toBeTruthy();
        await expect(connect.connections[0].name).toBe('Talleres');
    });

    test('then it should be created and populated', async () => {
        await mongoConnect();
        // const { Task, connection } = await taskCreator(modelName);
        const mockGarages = data.garages;
        const { result: garages } = await installGarages(mockGarages);
        const mockServices = data.services.map((item, i) => {
            const index = i <= 1 ? i : 0;
            return { ...item, responsible: garages[index]._id };
        });
        const { result } = await installServices(mockServices);
        expect(result).toBeTruthy();
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(data.services.length);
    });
});
