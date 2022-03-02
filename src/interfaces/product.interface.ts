import { Document, ObjectId } from 'mongoose';

interface IProduct extends Document {
    _doc        : [];
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
    id             ?: string;
    body            : string;
    user            : string | String | ObjectId;
    rating          : number;
    createdAt       : Date;
}

export { IProduct };