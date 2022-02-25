import { RequestHandler } from 'express';
import Order from '../../model/order/order';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SEED_PRIVATE!, {
    apiVersion: '2020-08-27',
});

export const updateOrderStripe: RequestHandler = async ( req, res ) => {

    const order = await Order.findById(req.params.id);

    if ( order ) {

        const payment = await stripe.paymentIntents.create({
            amount: Math.round(order.totalPrice * 100),
            currency: "USD",
            description: "",
            payment_method: req.body.id,
            confirm: true
        });

        // console.log( payment );

        if( payment ) {
            order.isPaid = true;
            order.paidAt = new Date();
            order.paymentResult = {
                id: payment.id,
                status: payment.status,
                update_time: new Date().toISOString(),
                email_address: req.email,
            };
            const updatedOrder = await order.save();
            res.status(201).send({ message: 'Order Paid', order:updatedOrder });
        }
        
    } else {
        res.status(401).send({ message: 'Order not found' });
    }

}

export const getStripeClientID: RequestHandler = ( req, res ) => {

    res.status(201).send({ clientID: process.env.STRIPE_SEED_CLIENT });

}
