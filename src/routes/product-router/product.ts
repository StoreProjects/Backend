import { Router } from 'express';
import { getProducts, createProduct } from '../../controllers/product/product.controller';
const router = Router();

router.route('/')
    .get(getProducts)
    .post(createProduct);

export default router;