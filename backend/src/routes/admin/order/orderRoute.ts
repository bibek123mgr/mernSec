import express, { Router } from "express";
import AuthMiddleware from "../../../middleware/AuthMiddleware";
import { Role } from "../../../services/typeDefine";
import errorHandler from "../../../services/catchAsyncError";
import orderController from "../../../controller/admin/order/OrderController";
import OrderMiddleware from "../../../middleware/OrderMiddleware";
const router: Router = express.Router()

router.use(AuthMiddleware.isAuthenticated,AuthMiddleware.restrictTo(Role.Admin))
router.route('/orders')
    .get(errorHandler(orderController.fetchAllOrder))

router.route('/orders/:id')
    .get(OrderMiddleware.isValidOrder, errorHandler(orderController.fetchoneOrder))
    .patch(OrderMiddleware.isValidOrder,errorHandler(orderController.changeOrderStatus))

export default router