import { RequestHandler } from 'express';
import Product from '../../model/product/product';

export const craeteComment: RequestHandler = async ( req, res ) => {

    try {
        
        const product = await Product.findById(req.params.prodcutId);

        if ( product ) {

            product.comments?.unshift({
                body: req.body.body,
                user: req.body.username,
                createdAt: new Date()
            });

            await product.save();

            res.status(201).send(product);

        } else {
            res.status(401).send({msg: 'Producto no encontrado'});
        }

    } catch ( err ) {
        res.status(401).send({msg: err});
    }

}