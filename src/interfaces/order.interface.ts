import { Document, ObjectId } from 'mongoose';

interface OrderItem {
    name    : string;
    qty     : number;
    image   : string;
    price   : number;
    product : ObjectId;
}

interface ShippingAddress {
    fullName    : string;
    address     : string;
    city        : string;
    postalCode  : string;
    country     : string;
}

interface IOrder extends Document {
    orderItems          : OrderItem[];
    shippingAddress     : ShippingAddress;
    paymentMethod       : string;
    itemsPrice          : number;
    shippingPrice       : number;
    taxPrice            : number;
    totalPrice          : number;
    user                : ObjectId;
    isPaid              : boolean;
    paidAt              : Date;
    isDelivered         : boolean;
    deliveredAt         : Date;
}

export { IOrder };