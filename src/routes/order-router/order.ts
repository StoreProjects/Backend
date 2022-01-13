import { Router } from 'express';
import { createOrder, getOrder } from '../../controllers/order/order.controller';
import { TokenValidation } from '../../libs/verifyToken';
const router = Router();

router.route('/')
    .post( TokenValidation, createOrder );

router.route('/:id')
    .get( TokenValidation, getOrder );

export default router;