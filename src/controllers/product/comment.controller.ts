import { RequestHandler } from 'express';
import Product from '../../model/product/product';

export const createComment: RequestHandler = async ( req, res ) => {

    try {
        
        const product = await Product.findById(req.params.productId);

        if ( product ) {

            product.comments?.unshift({
                body: req.body.text,
                user: req.userId,
                rating: req.body.rating,
                createdAt: new Date(),
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

export const deleteComment: RequestHandler = async( req, res ) => {

    try {
        
        // console.log(req.params.productId);

        const product = await Product.findById(req.params.productId);

        // console.log(product);

        if ( product ) {

            const commentIndex = product.comments!.findIndex((c) => c.id === req.body.commentId);

            if( product.comments![commentIndex].user.toString() === req.userId ) {
                
                product.comments?.splice(commentIndex, 1);

                await product.save();

                res.status(201).send(product);

            }else {
                res.status(401).send({msg: 'Action not allowed'});
            }

        }else {
            res.status(401).send({msg: 'Producto no encontrado'});
        }

    } catch ( err ) {
        res.status(401).send({msg: err});
    }

}

// /* */

// export const getComments:RequestHandler = async( req, res ) => {

//     try {
        
//         return await Comment.find({'productId': req.params.productId});

//     } catch ( err ) {
//         res.status(401).send({msg: err});
//     }

// }

// export const addComment:RequestHandler = async( req, res ) => {

//     try {
        
//         const comment = new Comment({
//             content: req.body.content,
//             user: req.userId,
//             createdAt: new Date(),
//             rating: req.body.rating,
//             productId: req.params.productId
//         });

//         const created = await comment.save();

//         res.status(201).send(created);

//     } catch ( err ) {
//         res.status(401).send({msg: err});
//     }

// }