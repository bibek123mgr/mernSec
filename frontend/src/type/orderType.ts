import { STATUSES } from "./Type"

export interface paymentDetails{
    id: string,
    paymentMethod: string,
    paymentStatus: string,
    pidx: string

}

export interface orders
{
    id: string,
    amount: number,
    orderStatus:string
    shippingAddress: string,
    phoneNumber: number,
    createdAt: string,
    PaymentDetail:paymentDetails
}

export interface order extends orders{
    items:productItems[]
}

export interface productItems
{
    id: string,
    quantity: number,
    Product:Product
                
 }
export interface Product {
    id: string,
    productImage: string,
    productName: string,
    productPrice: number
}
// export interface data{
//     orders: orders[],
//     selectOrder: order
// }



export interface orderState{
    orders: orders[],
    selectOrder: order
    status:STATUSES
}
export enum ROLE {
    Admin = 'admin',
    Customer = 'customer'
}
export enum PAYMENTSTATUSES {
    paid = 'paid',
    unpaid = 'unpaid',
    refund = 'refund'
}

export enum ORDERSTATUSES{
    Pending = 'pending',
    Cancelled = 'cancelled',
    Returned = 'returned',
    OnTheWay = 'ontheway',
    Prepration = 'prepration',
    Delivered='delivered'
}



