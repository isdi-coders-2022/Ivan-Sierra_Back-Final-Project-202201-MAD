import * as dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import { serviceCreator } from '../models/service.model.js';
import { garageCreator } from '../models/garage.model.js';

export async function mongoConnect() {
  const user = process.env.DBUSER;
  const password = process.env.DBPASSWD;
  const dbName = process.env.DBNAME;
  const uri = `mongodb+srv://${user}:${password}@cluster0.ojc5i.mongodb.net/${dbName}?retryWrites=true&w=majority`;

  const mongooseConnect = await mongoose.connect(uri);
  return mongooseConnect;
}

export async function installGarages(data, modelName = 'Garage') {
  const Garage = garageCreator(modelName);
  const deleted = await Garage.deleteMany({});
  const result = await Garage.insertMany(data);
  return { result, deleted };
}

export async function installServices(data, modelName = 'Service') {
  const Service = serviceCreator(modelName);
  const deleted = await Service.deleteMany({});
  const result = await Service.insertMany(data);
  return { result, deleted };
}
