import { Router } from 'express';
import { createOrder, getOrder, updateOrder, listOrderMine } from '../../controllers/order/order.controller';
import { TokenValidation } from '../../libs/verifyToken';
import { updateOrderStripe } from '../../controllers/stripe/stripe.controller';
const router = Router();

router.route( '/mine' )
    .get( TokenValidation, listOrderMine );

router.route( '/' )
    .post( TokenValidation, createOrder );

router.route( '/:id' )
    .get( TokenValidation, getOrder );

router.route( '/:id/pay' )
    .put( TokenValidation, updateOrder );

router.route( '/:id/stripe' )
    .put( TokenValidation, updateOrderStripe );

export default router;