import { RequestHandler } from 'express';
import Product from '../../model/product/product';

export const createProduct: RequestHandler = async ( req, res ) => {

    const product = new Product( req.body );
    const savedProduct = await product.save();
    if(savedProduct) {
        res.status(202).json(savedProduct);
    } else {
        res.status(500).json({
            message: 'Error in creating'
        });
    }


}

export const getProducts: RequestHandler = async ( req, res ) => {

    const products = await Product.find();
    if(products) {
        res.status(202).json( products );
    } else {
        res.status(202).json({
            message: 'There are not videos yet'
        });
    }

}