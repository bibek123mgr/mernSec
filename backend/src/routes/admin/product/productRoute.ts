import express, { Router } from 'express'
const router: Router = express.Router()
import errorHandler from '../../../services/catchAsyncError'
import { multer, storage } from '../../../middleware/multerConfig'
import AuthMiddleware from '../../../middleware/AuthMiddleware'
import productController from '../../../controller/admin/product/productController'
import ProductMiddleware from '../../../middleware/ProductMiddleware'
import { Role } from '../../../services/typeDefine'
const ulpload = multer({ storage: storage })

router.use(AuthMiddleware.isAuthenticated, AuthMiddleware.restrictTo(Role.Admin))
router.route('/products')
    .post(ulpload.single('image'), ProductMiddleware.productExist, errorHandler(productController.createProduct))
    .get(errorHandler(productController.fetchProducts))
router.route('/products/:id')
    .delete(ProductMiddleware.isValidProduct, errorHandler(productController.deleteProduct))
    .patch(ulpload.single('image'), ProductMiddleware.productExist, ProductMiddleware.isValidProduct, errorHandler(productController.updateProduct))
    .get(ProductMiddleware.isValidProduct, errorHandler(productController.fetchOneProduct))

export default router