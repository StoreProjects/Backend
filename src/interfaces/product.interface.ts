import { Document, ObjectId } from 'mongoose';

interface IProduct extends Document {
    id          : ObjectId;
    name        : string;
    description : string;
    category    : string;
    brand       : string;
    price       : number;
    image       : string;
    stock       : number;
    comments    ?: Comment[];
}

interface Comment {
    body        : string;
    user        : string;
    createdAt   : Date;
}

export { IProduct };