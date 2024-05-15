import expess, { Router } from 'express'
import AuthController from '../../controller/auth/authController'
import errorHandler from '../../services/catchAsyncError'
const router: Router = expess.Router()

router.route('/register')
    .post(errorHandler(AuthController.createUser))
router.route('/login')
    .post(errorHandler(AuthController.loginUser))
router.route('/forgetpassword')
    .get(errorHandler(AuthController.forgetPassword))
router.route('/verifyotp')
    .post(errorHandler(AuthController.verifyOTP))
router.route('/changepassword')
    .post(errorHandler(AuthController.changePassword))
export default router