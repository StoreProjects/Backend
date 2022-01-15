import { Router } from 'express';
import { createOrder, getOrder, updateOrder } from '../../controllers/order/order.controller';
import { TokenValidation } from '../../libs/verifyToken';
const router = Router();

router.route( '/' )
    .post( TokenValidation, createOrder );

router.route( '/:id' )
    .get( TokenValidation, getOrder );

router.route( '/:id/pay' )
    .put( TokenValidation, updateOrder );

export default router;