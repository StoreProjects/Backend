import { Schema, model } from 'mongoose';
import { IUser } from '../../interfaces/user.interface';
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
    name        : String,
    lastname    : String,
    phone       : Number,
    image       : String,
    mail        : String,
    password    : String,
}, {
    timestamps: true
});

userSchema.methods.encrypPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

userSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};

export default model<IUser>('User', userSchema);