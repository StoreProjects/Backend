import express from 'express';
import cors from 'cors';
import config from './config';
import morgan from 'morgan';
import { createServer } from 'http';
import { Server } from 'socket.io';

// ROUTES PATH

import productRoute from './routes/product-router/product';
import userRoute from './routes/user-router/user';
import orderRoute from './routes/order-router/order';
import paypalRoute from './routes/paypal-router/paypal';
import stripeRoute from './routes/stripe-router/stripe';

const app = express();

app.use( morgan('dev') );
app.use( cors() );
app.use( express.json() );
app.use( express.urlencoded({ extended: false }) );

app.set( 'port', config.PORT );

// ROUTES
app.use( '/api/products', productRoute );
app.use( '/api/users', userRoute );
app.use( '/api/order', orderRoute );
app.use( '/api/paypal', paypalRoute );
app.use( '/api/stripe', stripeRoute );

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

io.of('/api/socket').on('connection', (socket) => {
    //TODO
    console.log('New connection');
});

export default httpServer;