
import { Request } from 'express'
export interface AuthRequest extends Request {
    user?: {
        id: string,
        username: string,
        email: string,
        role: string,
        password: string,
        otp: string,
        isVerifiedOtp: boolean

    }
}
export enum Role {
    Admin = 'admin',
    Customer = 'customer'
}

export enum environment {
    PROD = 'production',
    DEV = 'development'
}
export enum orderStatus{
    Pending = 'pending',
    Cancelled = 'cancelled',
    Returned = 'returned',
    OnTheWay = 'ontheway',
    Prepration = 'prepration',
    Delivered='delivered'
}

export interface ProdRequest extends Request {
    product?: {
        id: string;
        productName: string;
        productPrice: number;
        productDescription: string;
        productStatus: string;
        productStockQty: number;
        productImage: string;
    }
}
export interface ProdAuthRequest extends AuthRequest, ProdRequest { }


export interface OrderType {
    id:string,
    phoneNumber: number,
    shippingAddress: string,
    orderStatus:orderStatus
    amount: number,
    paymentDetails:paymentDetails,
    items: OrderDetails[],
    createdAt: string,
    updatedAt:string
}

export interface paymentDetails{
        id:string
        paymentMethod: paymentMethod,
        paymentStatus?: paymentStatus
        pidx?: string,
        createdAt: string,
        updatedAt:string
}

export interface OrderDetails {
    quantity: number,
    productId: string
}
export enum paymentMethod {
    khalti = 'khalti',
    cod = 'cod',
    eswea = 'esewa'
}

export enum paymentStatus {
    paid = 'paid',
    unpaid = 'unpaid',
    refund = 'refund'
}

export interface khaltiresponse {
    pidx: string,
    payment_url: string,
    expires_at: Date | string,
    expires_in: number,
    user_fee: number
}

export enum khaltiPayemntStatus{
    completed = 'Completed',
    pending = 'Pending',
    initiated = 'Initiated',
    refunded = 'Refunded',
    expired = 'Expired',
    cancelled='User canceled'
}

export interface khaltiVerifyResponse{
   pidx: string,
   total_amount: number,
   status: khaltiPayemntStatus,
   transaction_id:string,
   fee: number,
   refunded: true | false
}