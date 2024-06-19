import Product from "../../../database/models/productModel";
import { Request, Response } from "express";
import Category from "../../../database/models/productCategoryModel";
import { ProdRequest } from "../../../services/typeDefine";
import Review from "../../../database/models/reviewModel";
import User from "../../../database/models/userModel";
class ProductController {
    async fetchProducts(req: Request, res: Response): Promise<void> {
        const products = await Product.findAll({
            attributes: ["id", "productName", "productPrice", "productDescription", "productStockQty", "productImage"],
            include: [{
                model: Category,
                attributes: ['id', 'categoryName']
            }]
        })
        res.status(200).json({
            message: 'products fetch successfully',
            data: products
        })
    }
    async fetchOneProduct(req: ProdRequest, res: Response): Promise<void> {
        const productId = req.product?.id
        const product = await Product.findByPk(productId, {
            attributes: ["id", "productName", "productPrice", "productDescription", "productStockQty", "productImage"]
            , include: [{
                model: Category,
                attributes: ['id', 'categoryName']
            }]
        })
        const reviews = await Review.findAll({
            where:{
                productId
            },
            attributes: ["id", "rating", "comment", "createdAt","updatedAt"],
            include: [{
                model: User,
                attributes:['id',"username"]
            }]
        })
        res.status(200).json({
            message: 'product fetch successfully',
            data: {
                product,
                reviews
            }
        })

    }
}
export default new ProductController()