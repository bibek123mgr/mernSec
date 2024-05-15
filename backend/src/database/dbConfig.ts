import { Sequelize } from 'sequelize-typescript'
import User from './models/userModel'
import Product from './models/productModel'
import Category from './models/productCategoryModel'
import Order from './models/orderModel'
import OrderDetail from './models/orderDetailsModel'
import PaymentDetail from './models/paymentDetailsModel'
import Cart from './models/cartModel'
import Review from './models/reviewModel'

const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    dialect: 'mysql',
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    models: [__dirname + "/models"]
})

sequelize.authenticate()
    .then(() => {
        console.log("connected")
    })
    .catch((err) => {
        console.log(err)
    })

sequelize.sync({ force: false }).then(() => {
    console.log("synced !!!")
})

//relationShip
User.hasMany(Product, { foreignKey: 'userId' })
Product.belongsTo(User, { foreignKey: 'userId' })

Category.hasMany(Product, { foreignKey: 'categoryId' })
Product.belongsTo(Category, { foreignKey: 'categoryId' })

Order.hasMany(OrderDetail, { foreignKey: 'orderId' })
OrderDetail.belongsTo(Order, { foreignKey: 'orderId' })

Product.hasMany(OrderDetail, { foreignKey: 'productId' })
OrderDetail.belongsTo(Product, { foreignKey: 'productId' })

PaymentDetail.hasOne(Order, { foreignKey: 'paymentId' })
Order.belongsTo(PaymentDetail, { foreignKey: 'paymentId' })

User.hasMany(Order, { foreignKey: 'userId' })
Order.belongsTo(User, { foreignKey: 'userId' })
//cart relationship
Product.hasMany(Cart, { foreignKey: 'productId' })
Cart.belongsTo(Product, { foreignKey: 'productId' })

User.hasMany(Cart, { foreignKey: 'userId' })
Cart.belongsTo(User, { foreignKey: 'userId' })

User.hasMany(Review, { foreignKey: 'userId' })
Review.belongsTo(User,{foreignKey:'userId'})

Product.hasMany(Review, { foreignKey: 'productId' })
Review.belongsTo(Product, { foreignKey: 'productId' })

Order.hasMany(Review, { foreignKey: 'orderId' })
Review.belongsTo(Order,{foreignKey:'orderId'})


export default sequelize