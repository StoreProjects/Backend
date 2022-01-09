import { Router } from 'express';
import { createOrder } from '../../controllers/order/order.controller';
import { TokenValidation } from '../../libs/verifyToken';
const router = Router();

router.route('/')
    .post( TokenValidation, createOrder );

export default router;