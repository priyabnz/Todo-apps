import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import {Types} from 'mongoose';

const { verify } = jwt;

export const authMiddleware = (req, res, next) => {
    if (!req.headers.authorization) {
        console.log.log('here')
        return res.status(401).json({ error: 'Not authorized' });
    }

    try {
        const token = req.headers.authorization;
        const payload = verify(token, config.jwtKey);

        req.currentUser = { ...payload, id: new Types.ObjectId(payload.id) };
        next();
    } catch (error) {
        console.log(error, 'here');
        return res.status(401).json({ error: 'Not authorized' });
    }
};
