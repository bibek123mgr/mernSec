import express, { Router } from 'express'
import AuthMiddleware from '../../../middleware/AuthMiddleware'
import { Role } from '../../../services/typeDefine'
import ProductMiddleware from '../../../middleware/ProductMiddleware'
import errorHandler from '../../../services/catchAsyncError'
import CartController from '../../../controller/user/cart/CartController'
const router: Router = express.Router()

router.use(AuthMiddleware.isAuthenticated, AuthMiddleware.restrictTo(Role.Customer))
router.route('/')
    .post(ProductMiddleware.isValidProduct,errorHandler(CartController.addToCart))
    .get(errorHandler(CartController.fetchMyCart))
router.route('/:id')
    .post(errorHandler(CartController.deleteCart))
    .patch(errorHandler(CartController.updateCart))
    
export default router