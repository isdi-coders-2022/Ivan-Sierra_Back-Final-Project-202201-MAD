import mongoose from 'mongoose';
import { serviceCreator } from './service.model.js';

jest.mock('mongoose');

describe('Given a factory for create the Service Model', () => {
    beforeAll(() => {
        mongoose.Schema.mockImplementation(function () {});
        mongoose.Schema.prototype.set = jest.fn();
        mongoose.model.mockReturnValue({});
    });

    test('Using previous model', () => {
        mongoose.default = { models: { Service: {} } };
        const model = serviceCreator();
        expect(mongoose.Schema.prototype.set).toHaveBeenCalled();
        expect(model).toBeTruthy();
    });
    test('Creating a model', () => {
        mongoose.default = { models: {} };
        const model = serviceCreator();
        expect(mongoose.Schema.prototype.set).toHaveBeenCalled();
        expect(model).toBeTruthy();
    });
});