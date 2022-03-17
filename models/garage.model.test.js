import mongoose from 'mongoose';
import { garageCreator } from './garage.model.js';

jest.mock('mongoose');

describe('Given a factory for create the Garage Model', () => {
    beforeAll(() => {
        mongoose.Schema.mockImplementation(function () {});
        mongoose.Schema.prototype.set = jest.fn();
        mongoose.model.mockReturnValue({});
    });

    test('Using previous model', () => {
        mongoose.default = { models: { Garage: {} } };
        const model = garageCreator();
        expect(mongoose.Schema.prototype.set).toHaveBeenCalled();
        expect(model).toBeTruthy();
    });
    test('Creating a model', () => {
        mongoose.default = { models: {} };
        const model = garageCreator();
        expect(mongoose.Schema.prototype.set).toHaveBeenCalled();
        expect(model).toBeTruthy();
    });
});