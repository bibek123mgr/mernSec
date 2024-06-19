import express, { Router } from 'express'
import errorHandler from '../../../services/catchAsyncError'
import AuthMiddleware from '../../../middleware/AuthMiddleware'
import { Role } from '../../../services/typeDefine'
import ProfileController from '../../../controller/user/profile/ProfileController'
const router: Router = express.Router()

router.use(AuthMiddleware.isAuthenticated,AuthMiddleware.restrictTo(Role.Customer))
router.route('/').get(errorHandler(ProfileController.fetchMyprofile))

export default router