import { Schema, model } from 'mongoose';
import { ICategory } from '../../interfaces/category.interface';

const categorySchema = new Schema({

    name: { type: String, unique: true },

},
{
    timestamps: true
});

export default model<ICategory>('Category', categorySchema);