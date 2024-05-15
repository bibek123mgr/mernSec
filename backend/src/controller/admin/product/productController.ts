import { Request, Response } from "express";
import Product from "../../../database/models/productModel";
import fs from 'fs'
import { AuthRequest, ProdAuthRequest, ProdRequest } from "../../../services/typeDefine";
import Category from "../../../database/models/productCategoryModel";
import User from "../../../database/models/userModel";
import Review from "../../../database/models/reviewModel";

class ProductController {
    async createProduct(req: AuthRequest, res: Response): Promise<void> {
        const { productName, productPrice, productDescription, productStatus, productStockQty, categoryId } = req.body
        const id = req.user?.id
        // if (!productName || !productPrice || !productDescription || !categoryId) {
        //     res.status(400).json({
        //         message: 'required all fields'
        //     })
        //     if (req.file) {
        //         fs.unlink(`./src/storage/${req.file.filename}`, (err) => {
        //             if (err) throw err
        //         })
        //     }
        //     return
        // }
        let fileName
        if (req.file) {
            fileName = process.env.WEBSITE_DOMAIN + req.file?.filename
        } else {
            fileName = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhZHBob25lfGVufDB8fDB8fHww"
        }
        const product = await Product.create({
            productName,
            productPrice,
            productStatus,
            productDescription,
            productStockQty,
            productImage: fileName,
            categoryId,
            userId: id
        })
        res.status(200).json({
            message: "Product added successfully",
            data: product
        })
    }
    async deleteProduct(req: ProdRequest, res: Response): Promise<void> {
        const productId = req.product?.id
        const fileName = req.product?.productImage.replace(process.env.WEBSITE_DOMAIN as string, "")
        fs.unlink(`./src/storage/${fileName}`, (err) => {
            if (err) {
                console.log('unable to delete')
            }
        })
        await Product.destroy({
            where: {
                id: productId
            }
        });
        res.status(200).json({
            message: 'successfully deleted product'
        })
    }

    async updateProduct(req: ProdAuthRequest, res: Response): Promise<void> {
        const productId = req.product?.id
        const userId = req.user?.id
        const { productName, productPrice, productDescription, productStockQty, categoryId, productStatus } = req.body
        if (!productName || !productPrice || !productDescription || !productStockQty || !categoryId) {
            res.status(400).json({
                message: 'required all fields'
            })
            // if (req.file) {
            //     fs.unlink(`./src/storage/${req.file.filename}`, (err) => {
            //         if (err) throw err
            //     })
            // }
            return
        }
        let fileName
        if (req.file) {
            const oldFilename = (req.product?.productImage)?.replace(process.env.WEBSITE_DOMAIN as string, '')
            fs.unlink(`./src/storage/${oldFilename}`, (err) => {
                if (err) throw err
            })
            fileName = process.env.WEBSITE_DOMAIN + req.file.filename
        }
        await Product.update({
            productName,
            productPrice,
            productDescription,
            productStockQty,
            productImage: fileName,
            categoryId,
            productStatus,
            userId
        }, {
            where: { id: productId }
        });
        const updateProduct = await Product.findByPk(productId)
        res.status(200).json({
            message: 'successfully updated product',
            data: updateProduct
        })
    }

    async fetchProducts(req: Request, res: Response): Promise<void> {
        const products = await Product.findAll({
            include: [{
                model: Category,
                attributes: ["id", "categoryName"]
            },
            {
                model: User,
                attributes: ["id", "username"]

            }
            ]
        })
        if (products.length === 0) {
            res.status(200).json({
                message: 'no data to fetch',
                data: []
            })
            return
        }
        res.status(200).json({
            message: 'successfully fetch product',
            data: products
        })
    }
    async fetchOneProduct(req: ProdRequest, res: Response): Promise<void> {
        const productId = req.product?.id
        const product = await Product.findByPk(productId, {
            include: [{
                model: Category,
                attributes: ["id", "categoryName"]
            },
            {
                model: User,
                attributes: ["id", "username", "email"]
            }
            ]
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