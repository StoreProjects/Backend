import { Router } from 'express';
import { getProducts, createProduct, getProduct } from '../../controllers/product/product.controller';
import { TokenValidation } from '../../libs/verifyToken';
const router = Router();

router.route('/')
    .get(TokenValidation, getProducts)
    .post(createProduct);

router.route('/:id')
    .get(getProduct);

export default router;