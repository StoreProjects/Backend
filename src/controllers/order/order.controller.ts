import { RequestHandler } from 'express';
import Order from '../../model/order/order';

export const getOrder: RequestHandler = async ( req, res ) => {

    const order = await Order.findById(req.params.id);

    if ( order ) {
        res.send(order);
    } else {
        res.status(404).send({ message: 'Order Not Found' });
    }

}

export const createOrder: RequestHandler = async ( req, res ) => {
    try {
        if ( req.body.orderItems.length === 0 ) {
            res.status(400).send(
                {
                    message: 'Cart is empty'
                }
            );
        } else {
            const order = new Order({
                orderItems: req.body.orderItems,
                shippingAddress: req.body.shippingAddress,
                paymentMethod: req.body.paymentMethod,
                itemsPrice: req.body.itemsPrice,
                shippingPrice: req.body.shippingPrice,
                taxPrice: req.body.taxPrice,
                totalPrice: req.body.totalPrice,
                user: req.userId
            });
            const createdOrder = await order.save();
            res
                .status(201)
                .send({message: 'New Order created', order: createdOrder});
        }
    } catch ( e: any ) {
        res.status(401).json({ message: e.message });
    }
}