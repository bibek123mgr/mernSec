import { orderStatus } from './../../../services/typeDefine';
import { Request, Response} from "express";
import Order from "../../../database/models/orderModel";
import PaymentDetail from "../../../database/models/paymentDetailsModel";
class OrderController{
    async fetchAllOrder(req: Request, res: Response) {
        const data = await Order.findAll({
            include: [
                {
                    model:PaymentDetail
                }
            ]
        })
        if (data.length === 0) {
            res.status(204).json({
                message: 'no orders',
                data:[]
            })
            return
        } else {
            res.status(200).json({
                message: 'fetch orders successfully',
                data
            })
    }
    }
    async fetchoneOrder(req: Request, res: Response) {
        const order = await Order.findByPk(req.params.id, {
            include: [{
                 model:PaymentDetail
          }]
        })
        res.status(200).json({
            message: 'fetch order successfully',
            data:order
        })
    }
    async changeOrderStatus(req: Request, res: Response): Promise<void>{
        const orderStatus:orderStatus = req.body.orderStatus
        const orderId=req.params.id
        await Order.update({
            orderStatus : orderStatus
        },{
            where : {
                id : orderId
            }
        })

        res.status(200).json({
            message : 'Order Status updated successfully'
        })
    }
}
export default new OrderController()