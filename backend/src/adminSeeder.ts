import bcrypt from 'bcrypt'
import User from './database/models/userModel'

const adminSeeder = async (): Promise<void> => {
    const [data] = await User.findAll({
        where: {
            email: process.env.ADMIN_EMAIL,

        }
    })
    if (!data) {
        await User.create({
            email: process.env.ADMIN_EMAIL,
            password: bcrypt.hashSync(process.env.ADMIN_PASSWORD as string, 10),
            username: process.env.ADMIN_NAME,
            role: process.env.ADMIN_ROLE
        })
        console.log("admin credentials seeded successfully")
    } else {
        console.log("admin credentials already seeded")
    }
}

export default adminSeeder