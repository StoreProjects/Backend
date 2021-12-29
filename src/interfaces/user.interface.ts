import { Document, ObjectId } from 'mongoose';

interface IUser extends Document {
    _doc?: any,
    id: ObjectId;
    name: string;
    lastname: string;
    phone: string;
    image: string;
    mail: string;
    password: string;
    encrypPassword(password: string): Promise<string>;
    validatePassword(password: string): Promise<boolean>;
}

export { IUser };