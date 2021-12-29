import dotenv from 'dotenv';
dotenv.config();

export default {
    MONGODB_DATABASE: process.env.MONGO_DATABASE || 'shopping',
    MONGO_USER: process.env.MONGO_USER || 'admin',
    MONGO_PASSWORD: process.env.MONGO_PASSWORD || 'admin',
    MONGO_HOST: process.env.MONGO_HOST || 'localhost',
    PORT: process.env.PORT || 4000,
    SECRET_KEY: process.env.SECRET_KEY || 'something secret'
}