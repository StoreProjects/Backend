import { RequestHandler } from 'express';
import Product from '../../model/product/product';

export const createProduct: RequestHandler = async ( req, res ) => {

    try {
        
        const product = new Product( req.body );
        const savedProduct = await product.save();
        if(savedProduct) {
            res.status(202).json(savedProduct);
        } else {
            res.status(401).json({
                message: 'Error in creating'
            });
        }

    } catch ( err:any ) {
        res.status(401).json({ message: err.message });
    }


}

export const getProducts: RequestHandler = async ( req, res ) => {

    const products = await Product.find();
    if( products ) {
        res.status(202).json( products );
    } else {
        res.status(202).json({
            message: 'There are not products yet'
        });
    }

}

export const getProduct: RequestHandler = async ( req, res) => {

    const product = await Product.findById(req.params.id);

    if ( product ) {
        res.status(202).json( product );
    } else {
        res.status(202).json({
            message: 'There are not products yet'
        })
    }

}