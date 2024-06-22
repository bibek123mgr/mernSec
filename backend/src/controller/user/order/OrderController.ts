import { orderStatus} from './../../../services/typeDefine';
import { Response } from "express";
import { AuthRequest, OrderType } from "../../../services/typeDefine";
import Order from "../../../database/models/orderModel";
import PaymentDetail from "../../../database/models/paymentDetailsModel";
import OrderDetail from '../../../database/models/orderDetailsModel';
import Product from '../../../database/models/productModel';

class OrderController {
    async createOrder(req: AuthRequest, res: Response): Promise<void> {
        const userId = req.user?.id
        const { phoneNumber, shippingAddress, paymentDetails, items, amount }: OrderType = req.body
        if (!phoneNumber || !shippingAddress || !paymentDetails || !paymentDetails.paymentMethod || items.length == 0 || !amount) {
            res.status(400).json({
                message: 'plase provide phoneNumber,ShippingAddress,paymentMethod,paymentStatus,items,amount}'
            })
            return
        }
        const payment = await PaymentDetail.create({
            paymentMethod: paymentDetails.paymentMethod
        })
        const order = await Order.create({
            userId,
            phoneNumber,
            shippingAddress,
            amount,
            paymentId: payment.id
        })
        items.forEach(async (item) => {
               await OrderDetail.create({
               quantity: item.quantity,
               productId: item.productId,
               orderId: order.id
            });
        });
         
        res.status(200).json({
            message: 'order successfully place'

        })
    }
    async cancelOrder(req: AuthRequest, res: Response): Promise<void>{
        const orderId = req.params.id
        const userId = req.user?.id
        
        const [order] = await Order.findAll({
            where: {
                id: orderId,
                userId
            }
        })
        if (order.orderStatus != orderStatus.Pending) {
            res.status(403).json({
                message:'forbidden for this action'
            })
            return
        }
        order.orderStatus = orderStatus.Cancelled
        await order.save()
        res.status(200).json({
            message:'order successfully cancelled'
        }) 
    }

async fetchMyOrders(req: AuthRequest, res: Response): Promise<void>{
    const userId = req.user?.id
    const orders = await Order.findAll({
        where:{
            userId
        },
        attributes:["id","amount","shippingAddress","phoneNumber","createdAt","orderStatus"],
        include: [
            {
                model: PaymentDetail,
                attributes: ["id","paymentMethod","paymentStatus","pidx"],

            }
        ]
    })
        res.status(200).json({
            message: 'orders fetched successfully',
            data: orders
        })
}

    async fetchMyOrder(req: AuthRequest, res: Response): Promise<void> {

        const userId = req.user?.id
        const orderId = req.params.id
         const [order] = await Order.findAll({
            where: {
                id: orderId,
                userId
             },
            attributes:["id","amount","shippingAddress","phoneNumber","createdAt","orderStatus"],
            include: [
                {
                    model: PaymentDetail,
                    attributes: ["id","paymentMethod","paymentStatus","pidx"],
                }
            ]
         })
    const orderdetails = await OrderDetail.findAll({
            where: {
                orderId
            },
            attributes:["id","quantity"],
            include: [
                {
                    model: Product,
                    attributes:["id","productImage","productName","productPrice"]
                }
            ]
    })
        const data = {
            order,
            items:orderdetails
        }
            res.status(200).json({
                message: 'orders fetch fetch successfully',
                data
            })
  

    }


    async fetchOrderDetails(req:AuthRequest, res:Response): Promise<void>{
    const orderId = req.params?.id;
        const orderdetails = await OrderDetail.findAll({
            where: {
                orderId
            },
            attributes:["id","quantity"],
            include: [
                {
                    model: Product,
                    attributes:["id","productImage","productName","productPrice"]
                }
            ]
        })

            res.status(200).json({
                message: 'fetch successfully',
                data:orderdetails
            })
    }
    async updateShippingDetails(req: AuthRequest, res: Response): Promise<void> {
        const orderId = req.params.id
        const userId = req.user?.id
        const { phoneNumber, shippingAddress } = req.body
        if (!phoneNumber || !shippingAddress) {
            res.status(200).json({
                message:'please provide phone number and shipping address'
            })
        }
        const [order] = await Order.findAll({
            where: {
                id: orderId,
                userId
            }
        })
        if (order.orderStatus == orderStatus.Prepration || order.orderStatus == orderStatus.Pending) {
            order.phoneNumber = phoneNumber
            order.shippingAddress = shippingAddress
            await order.save()
            res.status(200).json({
                message: 'updated'
            })
            return
        }
        res.status(403).json({
             message:'can\'t perform this action'
         }) 
    }
}

export default new OrderController()