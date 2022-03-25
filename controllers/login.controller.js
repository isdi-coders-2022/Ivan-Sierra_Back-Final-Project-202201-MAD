import { createToken } from '../services/auth.js';
import bcrypt from 'bcryptjs';
import { Garage } from '../models/garage.model.js';

export const login = async (req, resp, next) => {
    const garage = req.body;
    console.log(garage);
    const loginError = new Error('user or password invalid');
    loginError.status = 401;
    if (!garage.name || !garage.pass) {
        next(loginError);
    } else {
        const garageFound = await Garage.findOne({
            user: garage.name,
        });
        console.log('Find', garageFound);
        if (!garageFound) {
            next(loginError);
        } else if (!bcrypt.compareSync(garage.pass, garageFound.pass)) {
            next(loginError);
        } else {
            const token = createToken({
                user: garageFound.user,
                id: garageFound._id,
            });
            resp.json({
                token,
                user: garageFound.user,
                id: garageFound._id,
            });
        }
    }
};
