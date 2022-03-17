//import * as crud from '../services/garage.crud.js';
// import { serviceCreator } from '../models/service.model.js';
import { Service } from '../models/service.model.js';
//import { Garage } from './garages.controller.js';



export const getAllServices = async (req, res, next) => {
  try {
    const serviceResult = await Service.find({});
    res.status(200);
    res.json(serviceResult);
  } catch (error) {
    next(error);
  }
};

export const getService = async (req, res, next) => {
  try {
    const serviceResult = await Service.findById(req.params.id);
    res.status(200);
    res.json(serviceResult);
  } catch (error) {
    next(error);
  }
};

export const insertService = async (req, res, next) => {
  try {
    console.log('1');
    console.log(req.body);
    const serviceResult = await Service.create(req.body);
    console.log('2');
    res.status(201);
    res.json(serviceResult);
  } catch (error) {
    next(error);
  }
};
