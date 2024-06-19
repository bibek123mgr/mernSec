import Cart from "../../../database/models/cartModel";
import Category from "../../../database/models/productCategoryModel";
import Product from "../../../database/models/productModel";
import { AuthRequest, ProdAuthRequest } from "../../../services/typeDefine";
import { Response } from "express";

class CartController {
    async addToCart(req: ProdAuthRequest, res: Response): Promise<void> {
        const productId = req.product?.id
        const userId = req.user?.id
        const { quantity } = req.body
        if (quantity === 'NaN' || quantity <= 0 || quantity === 'null') {
            res.status(400).json({
            message: 'invalid qunatity'
        }) 
        }
        const ExisCart = await Cart.findOne({
            where: {
                productId,
                userId
            }
        })

        if (ExisCart) {
            ExisCart.quantity += quantity;
            await ExisCart.save()
        } else {
            await Cart.create({
                quantity,
                productId,
                userId
            })
        }
        const cart = await Cart.findOne({
            where: {
                productId,
                userId
            },
            attributes:["id","quantity","createdAt"],
            include: [{
                model: Product,
                attributes: ["id", "productName", "productImage","productPrice","productDescription"],
                // include: [{
                //     model: Category,
                //     attributes: ["id", "categoryName"]
                // }]
            }]

        })
        res.status(201).json({
            message: 'successfully added to cart',
            data: cart
        })
    }

    async deleteCart(req: AuthRequest, res: Response): Promise<void> {
        const { id } = req.params
        const userId = req.user?.id
        const ExisCart = await Cart.findOne({
            where: {
                id,
                userId
            }
        })
        if (!ExisCart) {
            res.status(404).json({
                message: 'no cart Exist'
            })
            return
        }
        await Cart.destroy({
            where: {
                id,
                userId
            }
        })

        res.status(200).json({
            message: 'cart product successfully deleted'
        })
    }

    async EmptyCart(req: AuthRequest, res: Response): Promise<void>{
        const userId = req.user?.id
         const deletedCount = await Cart.destroy({
            where: { userId }
        });

        if (deletedCount === 0) {
             res.status(200).json({
                message: 'No products to delete'
             });
            return
        }

        res.status(200).json({
            message: 'Successfully deleted all cart products'
        });
    }

    async fetchMyCart(req: AuthRequest, res: Response): Promise<void> {
        const userId = req.user?.id
        const cart = await Cart.findAll({
            where: {
                userId
            },
            attributes:["id","quantity","createdAt"],
            include: [{
                model: Product,
                attributes: ["id", "productName", "productImage","productPrice","productDescription"],
                // include: [{
                //     model: Category,
                //     attributes: ["id", "categoryName"]
                // }]
            }]
        })
        res.status(200).json({
            message: 'cart product successfully fetch',
            data: cart
        })
    }
    async updateCart(req: AuthRequest, res: Response): Promise<void> {
        const userId = req.user?.id
        const { id } = req.params
        const { quantity } = req.body
        const cartExist = await Cart.findOne({
            where: {
                id,
                userId
                
            }
        })
        if (!cartExist) {
            res.status(404).json({
                message: 'no product found'
            })
            return
        }
        cartExist.quantity = quantity
        await cartExist.save()
        res.status(200).json({
            message: 'successfully updated'
            // ,
            // data: cartExist
        })
    }
}

export default new CartController()