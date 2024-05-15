import Category from "../../../../database/models/productCategoryModel"
import { Request, Response } from "express"


class ProductCategoryController {
    categoryData = [
        {
            categoryName: "Electonic"
        },
        {
            categoryName: 'Gloceries'
        },
        {
            categoryName: "Food/Beverages"
        }
    ]
    async categorySeeder(): Promise<void> {
        const datas = await Category.findAll()
        if (datas.length === 0) {
            await Category.bulkCreate(this.categoryData)
            console.log('successfully seeded category')
        } else {
            console.log('catrgory has been already seeded')
        }
    }

    async createCategory(req: Request, res: Response): Promise<void> {
        const { categoryName } = req.body;
        if (!categoryName) {
            res.status(400).json({
                message: 'Please provide a category name'
            });
            return;
        }
        const [categoryExist] = await Category.findAll({
            where: {
                categoryName
            }
        });

        if (categoryExist) {
            res.status(400).json({
                message: 'Category name already exists'
            });
            return;
        }

        const newCategory = await Category.create({
            categoryName,
        });

        res.status(201).json({
            message: 'Category successfully created',
            category: newCategory
        });
    }

    async deleteCategory(req: Request, res: Response): Promise<void> {
        const id = req.params.id
        if (!id) {
            res.status(400).json({
                message: 'please provide id'
            })
            return
        }
        const isCategoryExist = await Category.findByPk(id)
        if (!isCategoryExist) {
            res.status(404).json({
                message: 'no product avaiable with this id'
            })
            return
        }
        await Category.destroy({
            where: {
                id
            }
        })
        res.status(200).json({
            message: 'successfully deleted category'
        })
    }
    async updateCategoryId(req: Request, res: Response): Promise<void> {
        const id = req.params.id
        const { categoryName } = req.body;
        if (!categoryName || !id) {
            res.status(400).json({
                message: 'Please provide a category name and id'
            });
            return;
        }
        const [categoryExist] = await Category.findAll({
            where: {
                categoryName
            }
        });

        if (categoryExist) {
            res.status(400).json({
                message: 'Category name already exists'
            });
            return;
        }
        const checkCategoryById = await Category.findByPk(id)
        if (!checkCategoryById) {
            res.status(404).json({
                message: 'no product avaiable with this id'
            })
            return
        }
        const updatedategory = await Category.update({ categoryName }, {
            where: {
                id
            },
            returning: true
        })
        res.status(200).json({
            message: 'successfully update category',
            data: updatedategory
        })
    }
}

export default new ProductCategoryController()