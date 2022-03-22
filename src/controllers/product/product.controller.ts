import { RequestHandler } from 'express';
import Product from '../../model/product/product';
import Category from '../../model/product/category';

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

export const getProduct: RequestHandler = async ( req, res ) => {

    const product = await Product.findById(req.params.id)
        .populate("comments.user");
    
    if ( product ) {
        res.status(202).json(product);
    } else {
        res.status(202).json({
            message: 'There are not products yet'
        })
    }

}

export const getCategory: RequestHandler = async( req, res ) => {

    const categories = await Category.find({"name": {$regex: '.*' + req.params.catekey + '.*'}});

    if(categories){
        res.status(202).json(categories);
    } else {
        res.status(202).json([]);
    }

}

export const getProductPerCategory: RequestHandler = async( req, res ) => {

    const { page, category, order } = req.params;

    let pageRef = parseInt(page);

    let limit = 9;

    const sortOrder = order === 'lowest' ? { price: 1 } : order === 'highest' ? { price: -1 } : order === 'new' ? { _id: 1 } : { _id: 1 }

    try {
        
        const products = await Product.find({'category': category})
        .sort(sortOrder)
        .limit(limit)
        .skip( (pageRef - 1 ) * limit );

        res.status(202).send(products);

    } catch ( ex ) {
        res.send(ex);
    }

}