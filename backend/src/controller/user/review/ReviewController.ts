import {Response } from "express";
import Review from "../../../database/models/reviewModel";
import { AuthRequest, orderStatus } from "../../../services/typeDefine";
import Order from "../../../database/models/orderModel";
import OrderDetail from "../../../database/models/orderDetailsModel";

class ReviewController{
    async createReview(req: AuthRequest, res: Response): Promise<void>{
        const userId=req.user?.id
        const { rating, comment, productId, orderId } = req.body
        if (!rating || !comment || !productId || !orderId) {
            res.status(400).json({
                message:'please provide rating,comment and productId'
            })
            return
        }
        const order = await Order.findByPk(orderId)
        if (order?.orderStatus !== orderStatus.Delivered) {
            res.status(403).json({
                message:'forbidden for this action'
            })
            return
        }
        const [checkExistReview] = await Review.findAll({
            where: {
                userId,
                productId
            }
        })
        if (checkExistReview) {
                res.status(403).json({
                message:'forbidden for this action'
            })
            return 
        }
        const [orderExistWithProduct] = await OrderDetail.findAll({
            where: {
                orderId,
                productId
            }
        })
        if (!orderExistWithProduct) {
            res.status(403).json({
                message:'forbidden for this action'
            })
            return 
        }
        const review = await Review.create({
            rating, comment, productId,orderId,userId
        })
        res.status(200).json({
            message: 'successfully created review',
            data:review
        })
    }
}
export default new ReviewController()