import { Request, Response } from "express";
import Category from "../../../../database/models/productCategoryModel";

class ProductCategoryController{
    async fetchAllCategory(req: Request, res: Response) {
        const category = await Category.findAll()
        res.status(200).json({
            message: 'fetch successfull',
            data:category
        })
    }
}

export default new ProductCategoryController()