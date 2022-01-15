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

export const updateOrder: RequestHandler = async ( req, res ) => {

    const order = await Order.findById(req.params.id);

    if ( order ) {
        order.isPaid = true;
        order.paidAt = new Date();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address 
        };
        const updatedOrder = await order.save();
        res.status(201).send({ message: 'Order Paid', order:updatedOrder });
    } else {
        res.status(401).send({ message: 'Order not found' });
    }

}