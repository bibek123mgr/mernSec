import Review from "../../../database/models/reviewModel";
import { Request,Response } from "express";

class ReviewController{
    async fetchallReviews(req: Request, res: Response): Promise<void>{
        const reviews = await Review.findAll()
        if (reviews.length === 0) {
            res.status(400).json({
                message:'no reviews'
            })
            return
        }
        res.status(400).json({
            message: 'fetch successfully',
            data:reviews
        })
    }

    async fetchReview(req: Request, res: Response): Promise<void>{
          const reviewId=req.params.id
        const review = await Review.findByPk(reviewId)
        if (!review) {
            res.status(400).json({
                message:'no reviews'
            })
            return
        }
        res.status(400).json({
            message: 'fetch successfully',
            data:review
        })
    }
    
    // async fetchallProductReviews(req: Request, res: Response): Promise<void>{
    //        const productId=req.params.id
    //        const reviews = await Review.findAll({
    //         where:{
    //             productId
    //         }
    //     })
    //     if (reviews.length === 0) {
    //         res.status(400).json({
    //             message:'no reviews'
    //         })
    //         return
    //     }
    //     res.status(400).json({
    //         message: 'fetch successfully',
    //         data:reviews
    //     })
    // }

}

export default new ReviewController()