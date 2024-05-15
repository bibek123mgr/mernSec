import express, { Router } from 'express'
import AuthMiddleware from '../../../middleware/AuthMiddleware'
import { Role } from '../../../services/typeDefine'
import errorHandler from '../../../services/catchAsyncError'
import OrderController from '../../../controller/user/order/OrderController'
import OrderMiddleware from '../../../middleware/OrderMiddleware'
const router: Router = express.Router()

router.use(AuthMiddleware.isAuthenticated, AuthMiddleware.restrictTo(Role.Customer))
router.route('/')
    .post(errorHandler(OrderController.createOrder))
    .get(errorHandler(OrderController.fetchMyOrders))

router.route('/:id')
    .get(OrderMiddleware.isValidOrder,errorHandler(OrderController.fetchMyOrder))
    .patch(OrderMiddleware.isValidOrder,errorHandler(OrderController.updateShippingDetails))
router.route('/cancel/:id')
    .patch(OrderMiddleware.isValidOrder,errorHandler(OrderController.cancelOrder))
router.route('/details/:id')
    .get(OrderMiddleware.isValidOrder,errorHandler(OrderController.fetchOrderDetails))

export default router