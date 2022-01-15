import { RequestHandler } from 'express';
export const getClientID: RequestHandler = ( req, res ) => {

    res.status(201).send(process.env.PAYPAL_CLIENT_ID || 'sb');

}
