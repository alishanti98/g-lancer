import Jwt from 'jsonwebtoken';
import { Payload } from '../interfaces';

const { JWT_SECRET } = process.env;

const generateToken = (payload: Payload) => new Promise((resolve, reject) => {
  if (!JWT_SECRET) throw new Error('No Secret Key');
  Jwt.sign(payload, JWT_SECRET, (err, token) => {
    if (err) return reject(err);
    return resolve(token);
  });
});

export default generateToken;
