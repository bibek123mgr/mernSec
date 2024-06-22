import express, { Application } from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
dotenv.config()
import productCategoryController from './controller/admin/product/category/productCategoryController'
import adminSeeder from './adminSeeder'
const app: Application = express()
const PORT: number = Number(process.env.PORT) || 3000
import './database/dbConfig'
//view engine
//middleware
app.use(express.json())
app.use(express.static('src/storage/'))
app.use(cors())
//seed
adminSeeder()
productCategoryController.categorySeeder()


//router start
import authRoute from './routes/auth/authRoute'
import adminProductRoute from './routes/admin/product/productRoute'
import globalProductRoute from './routes/gloabl/product/productRoute'
import userCartRoute from './routes/user/cart/cartRoute'
import paymentRoute from './routes/user/payment/paymentRoute'
import adminOrderRoute from './routes/admin/order/orderRoute'
import orderRoute from './routes/user/order/orderRoute'
import reviewRoute from './routes/user/review/reviewRoute'
import globalReveviewRoute from './routes/gloabl/review/reviewRoute'
import adminUserRoute from './routes/admin/user/userRoute'
import dataService from './routes/admin/dataservice/dataServiceRoute'
import profileRoute from './routes/user/profile/profileRoute'
//router end

app.use("/api/auth", authRoute)
app.use("/api/admin", adminProductRoute, adminOrderRoute,adminUserRoute,dataService)
app.use("/api/orders",orderRoute)
app.use("/api/products", globalProductRoute)
app.use("/api/carts", userCartRoute)
app.use("/api/payment", paymentRoute)
app.use("/api/reviews", reviewRoute, globalReveviewRoute)
app.use("/api/profile", profileRoute)

app.listen(PORT, () => {
    console.log(`Server has started at http://localhost:${PORT}`)
})
