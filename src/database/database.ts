import mongoose from 'mongoose';
import config from '../config';

(async () => {

    try {
        const db = await mongoose.connect(`mongodb://${ config.MONGO_HOST }/${ config.MONGODB_DATABASE }`);
        //const db = await mongoose.connect(`${ config.MONGODB_ATLAS_URL }`);
        console.log('database is connected', db.connection.name);

    } catch (error) {
        console.log(error);
    }

})()