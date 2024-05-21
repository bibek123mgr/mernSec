import { Request, Response } from "express";
import User from "../../../database/models/userModel";
import Order from "../../../database/models/orderModel";
import Product from "../../../database/models/productModel";
import Review from "../../../database/models/reviewModel";
import Category from "../../../database/models/productCategoryModel";

class DataServiceController{
    async fetchData(req: Request, res: Response):Promise<void> {
        const users = await User.count()
        const orders = await Order.count()
        const products = await Product.count()
        const reviews = await Review.count()
        const categories=await Category.count()
            res.status(200).json({
                message: 'Fetched successfully',
                data: {
                    users,
                    orders,
                    products,
                    reviews,
                    categories
                }
            });
    }
    async totalProductSales(req: Request, res: Request): Promise<void>{
        
    }
}

export default new DataServiceController()