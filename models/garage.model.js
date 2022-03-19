import mongoose from 'mongoose';

export function garageCreator(modelName = 'Garage') {
  const garageSchema = new mongoose.Schema({
    user: { type: String, required: true, unique: true },
    pass: { type: String, required: true },
    garage_name: { type: String, required: true },
    cif_nif: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    web: { type: String, required: true },
    address: { type: String, required: true },
    services: {
        ruedas : {type: Number, default : 0},
        aceite : {type: Number, default : 0},
        aire : {type: Number, default : 0},
        filtros : {type: Number, default : 0},
        amortiguadores : {type: Number, default : 0},
        bombillas : {type: Number, default : 0},
        discos : {type: Number, default : 0},
        pastillas : {type: Number, default : 0}
    }

  });

  garageSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      delete returnedObject.__v;
    },
  });

  let Garage;
  if (mongoose.default.models[modelName]) {
    Garage = mongoose.model(modelName);
  } else {
    Garage = mongoose.model(modelName, garageSchema);
  }
  return Garage;
}

export const Garage = garageCreator();
