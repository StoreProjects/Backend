import { Schema, model } from 'mongoose';
import { IProduct } from '../../interfaces/product.interface';

const productSchema = new Schema({
    name: { type: String, unique: true },
    description: String,
    category: String,
    brand: String,
    price: Schema.Types.Decimal128,
    image: String,
    stock: Number
}, {
    timestamps: true
});

export default model<IProduct>('Product', productSchema);