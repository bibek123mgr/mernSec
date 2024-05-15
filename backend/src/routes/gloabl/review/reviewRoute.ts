import express, { Router } from 'express'
import errorHandler from '../../../services/catchAsyncError'
import ReviewController from '../../../controller/global/review/ReviewController'
const router: Router = express.Router()

router.route('/')
    .get(errorHandler(ReviewController.fetchallReviews))
router.route('/:id')
    .get(errorHandler(ReviewController.fetchReview))
// router.route('/product/:id')
//     .get(errorHandler(ReviewController.fetchReview))

export default router