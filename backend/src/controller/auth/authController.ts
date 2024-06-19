import { NextFunction, Request, Response } from "express";
import User from "../../database/models/userModel";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import otpGenerator from 'otp-generator'
import sendMail from "../../services/EmailSender";

class AuthController {
    async createUser(req: Request, res: Response,next:NextFunction): Promise<void> {
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            res.status(400).json({
                message:'require all fields'
            })
            return 
        }
        const [userExist] = await User.findAll({
            where: {
                email
            }
        })
        if (userExist) {
            res.status(403).json({
                message:'user already exist'
            })
            return 

        }
        const user=await User.create({
            username,
            email,
            password: hashPassword(password),
        })
        const token = getJwt(user.id)
        
        const UserData = await User.findByPk(user.id, {
            attributes:["id","username","email","gender","address","role","number"]
        })
        res.status(200).json({
            message: 'new user registered',
            data:{
                user:UserData,
                token
            }
        })
    }

    async loginUser(req: Request, res: Response,next:NextFunction): Promise<void> {
        const { email, password } = req.body
        if (!email || !password) {
         res.status(400).json({
                message:'require all fields'
            })
            return 
        }
        const [user] = await User.findAll({
            where: {
                email
            }
        })
        if (!user) {
            res.status(400).json({
                message:'invaid credentails'
            })
            return 
        }
        const validPassword = bcrypt.compareSync(password, user.password)
        if (!validPassword) {
            res.status(400).json({
                message:'invaid credentails'
            })
            return
        }
        const token = getJwt(user.id)
        const UserData = await User.findByPk(user.id, {
            attributes:["id","username","email","gender","address","role","number"]
        })
        res.status(200).json({
            message: 'successfully login',
            data:{
                user:UserData,
                token
            }
        })
    }

    async forgetPassword(req: Request, res: Response,next:NextFunction): Promise<void> {
        const { email } = req.body
        if (!email) {
         res.status(400).json({
                message:'require all fields'
            })
            return         }
        const userEmailExist = await User.findOne({
            where: {
                email
            }
        })

        if (!userEmailExist) {
            res.status(400).json({
                message:'invaid credentails'
            })
            return          }
        const otp = otpGenerator.generate(6)
        const option = {
            to: email,
            subject: 'forget otp vefification code',
            message: `Dear Customer,You have request for the password reset. Your code is ${otp} please don/'t share with any one.`
        };
        await sendMail({ option })
            .then(() => console.log('email successfully send'))
            .catch((err) => console.log(err))
        userEmailExist.otp = otp
        await userEmailExist.save()
        res.status(200).json({
            message: 'otp send',
            data: otp,

        })
    }
    async verifyOTP(req: Request, res: Response,next:NextFunction): Promise<void> {
        const { email, otp } = req.body

        if (!email || !otp) {
         res.status(400).json({
                message:'require all fields'
            })
            return
        }
        const userEmailExist = await User.findOne({
            where: {
                email,
                otp
            }
        })

        if (!userEmailExist) {
          res.status(400).json({
                message:'invaid credentails'
            })
            return          }
        userEmailExist.isVerifiedOtp = true
        await userEmailExist.save()
        res.status(200).json({
            message: 'otp verified successfully'
        })
    }
    async changePassword(req: Request, res: Response,next:NextFunction): Promise<void> {
        const { email, otp, newPassord, confirmNewPassword } = req.body

        if (!email || !otp || !newPassord || !confirmNewPassword) {
         res.status(400).json({
                message:'require all fields'
            })
            return        }
        if (newPassord !== confirmNewPassword) {
          res.status(400).json({
                message:'password doenot match'
            })
            return           }
        const userEmailExist = await User.findOne({
            where: {
                email,
                otp
            }
        })

        if (!userEmailExist) {
          res.status(400).json({
                message:'invaid credentails'
            })
            return          }
        if (userEmailExist?.isVerifiedOtp == true && userEmailExist) {
            userEmailExist.otp = ''
            userEmailExist.isVerifiedOtp = false
            userEmailExist.password = hashPassword(newPassord)
            await userEmailExist?.save()
            res.status(200).json({
                message: 'successfully set new password'
            })
        } else {
            res.status(403).json({
                message: 'forbidden for this action'
            })
        }
    }

}
function getJwt(userId:string) {
    return  jwt.sign({ id:userId }, process.env.JWT_SECRET as string, {
            expiresIn: '30d'
    })
}

function hashPassword(password:string) {
    return bcrypt.hashSync(password,Number(process.env.BCRYPT_SALT))
}
export default new AuthController()