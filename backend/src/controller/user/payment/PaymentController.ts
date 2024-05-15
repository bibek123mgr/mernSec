import { khaltiPayemntStatus, khaltiVerifyResponse, paymentStatus} from './../../../services/typeDefine';
import axios from 'axios'
import { Request, Response } from 'express'
import { AuthRequest} from '../../../services/typeDefine'
import Order from '../../../database/models/orderModel'
import OrderDetail from '../../../database/models/orderDetailsModel'
import PaymentDetail from '../../../database/models/paymentDetailsModel';

class PaymentController {
    async khaltiInitiate(req: AuthRequest, res: Response): Promise<void> {
        const userId = req.user?.id
        const { amount, orderId } = req.body
        if (!amount || !orderId) {
            res.status(400).json({
                message: 'please provide amount productId'
            })
            return
        }
        const order: any = await Order.findOne({
            where: {
                userId,
                id: orderId
            }
        })
        // if (!order) {
        //     res.status(200).json({
        //         message: 'no order match'
        //     })
        //     return
        // }
        const orderDetailExixt: OrderDetail | any = await OrderDetail.findByPk(order.paymentId)
        const data = {
            website_url: 'http://localhost:3000',
            return_url: 'http://localhost:3000/api/payment/khaltisuccess',
            amount: amount * 100,
            purchase_order_id: orderId +'-' + Date.now(),
            purchase_order_name: `__orderName ${orderId}`
        }
        const response = await axios.post('https://a.khalti.com/api/v2/epayment/initiate/', data, {
            headers: {
                'Authorization': 'key 191e809935014f76869721a2989cbc16'
            }
        })
        orderDetailExixt.pidx = response.data.pidx
        await orderDetailExixt?.save()
        res.status(200).json({
            message: 'khalti initiated successfully',
            data: response.data
        })
    }
    async verifyPidx(req:Request, res: Response): Promise<void> {
        const { pidx } = req.body
        const response = await axios.post('https://a.khalti.com/api/v2/epayment/lookup/', { pidx }, {
            headers: {
                'Authorization':'key 191e809935014f76869721a2989cbc16'
            }
        })
        const data:khaltiVerifyResponse= await response.data
        if (data.status == khaltiPayemntStatus.completed) {
            await PaymentDetail.update({paymentStatus:paymentStatus.paid},{
            where : {
                pidx : pidx
            }
        })
        res.status(200).json({
            message: 'successfully payment successful'
        })
        } else {
         res.status(400).json({
            message: 'payment failed '+ data.status
        }) 
        }
    }
}

export default new PaymentController()