import Product from "../../../database/models/productModel";
import { Request, Response } from "express";
import Category from "../../../database/models/productCategoryModel";
import { ProdRequest } from "../../../services/typeDefine";
import Review from "../../../database/models/reviewModel";
class ProductController {
    async fetchProducts(req: Request, res: Response): Promise<void> {
        const products = await Product.findAll({
            attributes: ["id", "productName", "productPrice", "productDescription", "productStockQty", "productImage"],
            include: [{
                model: Category,
                attributes: ['id', 'categoryName']
            }]
        })
        if (products.length === 0) {
            res.status(400).json({
                message: 'no data to fetch',
                data: []
            })
            return
        }
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
            }
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