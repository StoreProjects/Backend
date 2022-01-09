import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';

export interface IPayload {
    _id: string;
}

export const TokenValidation = ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const token = req.get('token');
        if (!token) return res.status(401).json('Access Denied');
        const payload = jwt.verify(token, config.SECRET_KEY || '') as IPayload;
        req.userId = payload._id;
        next();
    } catch (e) {
        res.status(400).send('Invalid Token');
    }
}