import { Request, Response, NextFunction } from "express";
import Product from "../database/models/productModel";
import { ProdRequest } from "../services/typeDefine";
import fs from 'fs'

class ProductMiddleware {
    async productExist(req: ProdRequest, res: Response, next: NextFunction): Promise<void> {
        const { productName } = req.body
        if (!productName) {
            res.status(400).json({
                message: 'please provide product name'
            })
            if (req.file) {
                fs.unlink(`./src/storage/${req.file.filename}`, (err) => {
                    if (err) throw err
                })
            }
            return
        }
        try {
            const [product] = await Product.findAll({
                where: {
                    productName
                }
            })
            if (product) {
                res.status(400).json({
                    message: 'product already exist with this name'
                })
                if (req.file) {
                    fs.unlink(`./src/storage/${req.file.filename}`, (err) => {
                        if (err) throw err
                    })
                }
                return
            }
            next()
        } catch (error) {
            res.status(500).json({
                message: 'somting went wrong'
            })
            return
        }
    }

    async isValidProduct(req: ProdRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const productId = req.params.id || req.body.productId;
            if (!productId) {
                res.status(400).json({
                    message: 'please provide product id'
                });
                return;
            }
            const [product] = await Product.findAll({
                where: {
                    id: productId
                }
            });
            if (!product) {
                res.status(404).json({
                    message: 'product with this product id not exist'
                });
                if (req.file) {
                    fs.unlink(`./src/storage/${req.file.filename}`, (err) => {
                        if (err) throw err
                    })
                }
                return;
            }

            req.product = product;
            next();
        } catch (error) {
            res.status(500).json({
                message: 'something went wrong'
            });
            return;
        }
    }
}



export default new ProductMiddleware()