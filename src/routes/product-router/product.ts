import { Router } from 'express';
import { getProducts, createProduct, getProduct, getCategory, getProductPerCategory } from '../../controllers/product/product.controller';
import { createComment, deleteComment } from '../../controllers/product/comment.controller';
import { TokenValidation } from '../../libs/verifyToken';
const router = Router();

router.route('/')
    .get( getProducts )
    .post( createProduct );

router.route('/:id')
    .get( getProduct );

router.route('/comment/:productId')
    .post( TokenValidation, createComment )
    .put( TokenValidation, deleteComment );

router.route('/category/:catekey')
    .get( getCategory );

router.route('/:category/limit/:page/:order?')
    .get( getProductPerCategory );
    

export default router;