import express, { Router } from 'express'
import PaymentController from '../../../controller/user/payment/PaymentController'
const router: Router = express.Router()

router.route('/khaltiInitiate')
    .post(PaymentController.khaltiInitiate)
router.route('/verifypidx')
    .post(PaymentController.verifyPidx)
    
export default router