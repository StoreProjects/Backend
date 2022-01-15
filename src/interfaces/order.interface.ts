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

interface PaymentResult {
    id              : string;
    status          : string;
    update_time     : string;
    email_address   : string;
}

interface IOrder extends Document {
    orderItems          : OrderItem[];
    shippingAddress     : ShippingAddress;
    paymentMethod       : string;
    paymentResult       : PaymentResult;
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