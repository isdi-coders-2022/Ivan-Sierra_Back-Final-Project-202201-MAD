
import { Garage } from '../models/garage.model.js';

import bcrypt from 'bcryptjs';



export const getAllGarages = async (req, res, next) => {
  try {
    const resp = await Garage.find({}).populate('services');

    res.json(resp);
  } catch (err) {
    next(err);
  }
};

export const getGarage = async (req, res, next) => {
  try {
    const resp = await Garage.findById(req.params.id);

    res.json(resp);
  } catch (err) {
    next(err);
  }
};

export const insertGarage = async (req, resp, next) => {
  try {
    const encryptedPasswd = bcrypt.hashSync(req.body.pass);
    const userData = { ...req.body, pass: encryptedPasswd };
    const result = await Garage.create(userData);
    resp.json(result);
  } catch (error) {
    next(error);
  }
};

export const updateGarage = async (req, res, next) => {
  try {
    const resp = await Garage.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    
    res.json(resp);
  } catch (err) {
    next(err);
  }
};
export const deleteGarage = async (req, res, next) => {
  try {
    const resp = await Garage.findByIdAndDelete(req.params.id).populate(
      'services',
      {
        services: 0,
      }
    );
    res.json(resp);
  } catch (err) {
    next(err);
  }
};
