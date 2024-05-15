import { NextFunction,Request,Response } from "express";
import Order from "../database/models/orderModel";

class OrderMiddleware{
    async isValidOrder(req: Request, res: Response, next: NextFunction): Promise<void>{
       try {
                const orderId = req.params.id
        if (!orderId) {
            res.status(400).json({
                message:'please provide orderId'
            })
            return
        }
        const order = await Order.findByPk(orderId)
        if (!order) {
            res.status(404).json({
                message:'no order found with this id'
            })
        }
        next()
       } catch (error) {
           res.status(500).json({
            message:'internal server error wrong'
        })
       }
    }
}

export default new OrderMiddleware()