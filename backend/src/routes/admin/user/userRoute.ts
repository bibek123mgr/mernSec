import exress,{ Router } from 'express';
import errorHandler from '../../../services/catchAsyncError';
import UserController from '../../../controller/admin/user/UserController';
import AuthMiddleware from '../../../middleware/AuthMiddleware';
import { Role } from '../../../services/typeDefine';
const router: Router = exress.Router()

router.use(AuthMiddleware.isAuthenticated,AuthMiddleware.restrictTo(Role.Admin))
router.route('/users')
    .get(errorHandler(UserController.fetchUsers))
router.route('/users/:id')
    .get(errorHandler(UserController.fetchUser))


export default router