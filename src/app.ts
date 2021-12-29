import express from 'express';
import cors from 'cors';
import config from './config';
import morgan from 'morgan';

// ROUTES PATH

import productRoute from './routes/product-router/product';
import userRoute from './routes/user-router/user';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('port', config.PORT);

// ROUTES
app.use('/api/products', productRoute);
app.use('/api/users', userRoute);

export default app;