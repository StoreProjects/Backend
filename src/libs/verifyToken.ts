import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';

export interface IPayload {
    id: string;
    email: string;
}

export const TokenValidation = ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const token = req.header('token');
        if (!token) return res.status(401).json('Access Denied');
        const payload = jwt.verify(token, config.SECRET_KEY || '') as IPayload;
        req.userId = payload.id;
        req.email = payload.email;
        next();
    } catch (e) {
        res.status(400).send('Invalid Token');
    }
}