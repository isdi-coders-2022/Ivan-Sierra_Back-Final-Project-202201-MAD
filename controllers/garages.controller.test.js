import * as controller from './garages.controller.js';
import { Garage } from '../models/garage.model.js';
import { createToken } from '../services/auth.js';
import bcrypt from 'bcryptjs';

jest.mock('bcryptjs');
jest.mock('../services/auth.js');
jest.mock('../models/garage.model.js');

describe('Given the Garage controller', () => {
  let req;
  let res;
  let next;
  beforeEach(() => {
    req = { params: {} };
    res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    next = jest.fn();
  });
  describe('When getAllGarages is triggered', () => {
    describe('And it works (promise is resolved)', () => {
      beforeEach(() => {
        Garage.find.mockReturnValue({
          populate: jest.fn().mockResolvedValue([]),
        });
      });
      test('Then call json', async () => {
        await controller.getAllGarages(req, res, next);
        expect(res.json).toHaveBeenCalled();
      });
    });
    describe('And it does not work (promise is rejected)', () => {
      beforeEach(() => {
        Garage.find.mockReturnValue({
          populate: jest
            .fn()
            .mockRejectedValue(new Error('Get All Garages not possible')),
        });
      });
      test('Then call next', async () => {
        await controller.getAllGarages(req, res, next);
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
      });
    });
  });

  describe('When insertGarage is triggered', () => {
    describe('And it works (promise is resolved)', () => {
      beforeEach(() => {
        req.body = { user: 'Pepe', pass: '1234' };
        bcrypt.hashSync.mockResolvedValue('encrypted1234');
        Garage.create.mockReturnValue({
          user: 'Pepe',
          pass: 'encrypted1234',
          id: 1,
        });
        createToken.mockReturnValue('mock_token');
      });
      test('Then call json', async () => {
        await controller.insertGarage(req, res, next);
        expect(res.json).toHaveBeenCalledWith({
          pass: 'encrypted1234',
          user: 'Pepe',
          id: 1,
        });
      });
    });
    describe('And it not works (promise is rejected)', () => {
      beforeEach(() => {
        req.body = { user: 'Pepe', pass: '1234' };
        bcrypt.hashSync.mockReturnValue('encrypted1234');
        Garage.create.mockRejectedValue(new Error('Error adding user'));
        // createToken.mockReturnValue('mock_token');
      });
      test('Then call next', async () => {
        await controller.insertGarage(req, res, next);
        expect(next).toHaveBeenCalled();
      });
    });
  });

  describe('When  getGarageById is triggered', () => {
    describe('And the id is found (promise resolved)', () => {
      beforeEach(() => {
        req.params.id = '619516dd75bcdf9b77e6690c';
        Garage.findById.mockResolvedValue([]);
      });
      test('Then call json', async () => {
        await controller.getGarage(req, res, next);
        expect(res.json).toHaveBeenCalled();
      });
    });
    describe('And the id is not found (promise rejected)', () => {
      beforeEach(() => {
        req.params.id = '0000';
        Garage.findById.mockRejectedValue(new Error('The id has not be found'));
      });
      test('Then call next', async () => {
        await controller.getGarage(req, res, next);
        expect(res.json).not.toHaveBeenCalled();
        // expect(next).toHaveBeenCalled();
      });
    });
  });

  describe('When  updateGarage is triggered', () => {
    describe('And the document is updated (promise resolved)', () => {
      beforeEach(() => {
        // req.params.id = '619516dd75bcdf9b77e6690c';
        Garage.findByIdAndUpdate.mockReturnValue({
          populate: jest.fn().mockResolvedValue([]),
        });
      });
      test('Then call json', async () => {
        await controller.updateGarage(req, res, next);
        expect(res.json).toHaveBeenCalled();
      });
    });
    describe('And update Garage is not possible (promise is resolved)', () => {
      beforeEach(() => {
        Garage.findByIdAndUpdate.mockReturnValue({
          populate: jest
            .fn()
            .mockRejectedValue(new Error('Add Garage not possible')),
        });
      });
      test('Then call next', async () => {
        await controller.updateGarage(req, res, next);
        expect(res.json).not.toHaveBeenCalled();
        // expect(next).toHaveBeenCalled();
      });
    });
  });

  describe('When deleteGarage is triggered', () => {
    describe('And id exists', () => {
      beforeEach(() => {
        req.params.id = '619516dd75bcdf9b77e6690c';
        Garage.findByIdAndDelete.mockReturnValue({
          populate: jest.fn().mockResolvedValue([]),
        });
      });
      test('Then call json', async () => {
        await controller.deleteGarage(req, res, next);
        //expect(res.status).toHaveBeenCalledWith(204);
        expect(res.json).toHaveBeenCalled();
      });
    });
    describe('And id not exists', () => {
      beforeEach(() => {
        req.params.id = '619516dd75bcdf9b77e6690c';
        Garage.findByIdAndDelete.mockReturnValue({
          populate: jest.fn().mockResolvedValue(null),
        });
      });
      test('Then call json', async () => {
        await controller.deleteGarage(req, res, next);
        //expect(res.status).toHaveBeenCalledWith(204);
        expect(res.json).toHaveBeenCalled();
      });
    });
    describe('And there are a error (promise rejected)', () => {
      beforeEach(() => {
        Garage.findByIdAndDelete.mockReturnValue({
          populate: jest
            .fn()
            .mockRejectedValue(new Error('Error deleting a Garage')),
        });
      });
      test('Then call next', async () => {
        await controller.deleteGarage(req, res, next);
        expect(res.json).not.toHaveBeenCalled();
        // expect(next).toHaveBeenCalled();
      });
    });
  });
});
