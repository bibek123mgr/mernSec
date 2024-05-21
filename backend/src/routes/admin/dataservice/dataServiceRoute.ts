import express, { Router } from 'express'
import AuthMiddleware from '../../../middleware/AuthMiddleware'
import { Role } from '../../../services/typeDefine'
import DataServiceController from '../../../controller/admin/dataSevice/DataServiceController'
import errorHandler from '../../../services/catchAsyncError'
const router: Router = express.Router()

router.use(AuthMiddleware.isAuthenticated, AuthMiddleware.restrictTo(Role.Admin))
router.route('/dataservice')
    .get(errorHandler(DataServiceController.fetchData))

export default router