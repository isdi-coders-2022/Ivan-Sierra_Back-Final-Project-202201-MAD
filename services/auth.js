import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export function createToken(garage) {
  const tokenPayload = {
    
    id: garage.id,
  };
  const secret = process.env.SECRET;
  return jwt.sign(tokenPayload, secret);
}

export function verifyToken(token) {
  const secret = process.env.SECRET;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return error.message;
  }
}
