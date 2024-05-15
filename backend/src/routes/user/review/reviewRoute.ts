import express, { Router } from 'express'
import AuthMiddleware from '../../../middleware/AuthMiddleware'
import { Role } from '../../../services/typeDefine'
import errorHandler from '../../../services/catchAsyncError'
import ReviewController from '../../../controller/user/review/ReviewController'
const router: Router = express.Router()

router.route('/')
    .post(AuthMiddleware.isAuthenticated, AuthMiddleware.restrictTo(Role.Customer),errorHandler(ReviewController.createReview))

export default router