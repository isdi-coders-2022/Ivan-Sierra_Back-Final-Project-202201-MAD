import mongoose from 'mongoose';

export function serviceCreator(modelName = 'Service') {
  const serviceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
  });

  serviceSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      delete returnedObject.__v;
    },
  });

  let Service;
  if (mongoose.default.models[modelName]) {
    Service = mongoose.model(modelName);
  } else {
    Service = mongoose.model(modelName, serviceSchema);
  }
  return Service;
}

export const Service = serviceCreator();
