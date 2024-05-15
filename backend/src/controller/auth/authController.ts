import { NextFunction, Request, Response } from "express";
import User from "../../database/models/userModel";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import otpGenerator from 'otp-generator'
import sendMail from "../../services/EmailSender";
import AppErrorHandler from "../../services/AppErrorHandler";

class AuthController {
    async createUser(req: Request, res: Response,next:NextFunction): Promise<void> {
        const { username, email, password, role } = req.body
        if (!username || !email || !password) {
            return next(new AppErrorHandler("please give all credentials",400))
        }
        const [userExist] = await User.findAll({
            where: {
                email
            }
        })
        if (userExist) {
            return next(new AppErrorHandler("user user with this email already exist",400))
        }
        const user=await User.create({
            username,
            email,
            password: hashPassword(password),
            role
        })
        const token=getJwt(user.id)
        res.status(200).json({
            message: 'new user registered',
            data:{
                user,
                token
            }
        })
    }

    async loginUser(req: Request, res: Response,next:NextFunction): Promise<void> {
        const { email, password } = req.body
        if (!email || !password) {
            return next(new AppErrorHandler("please give all credentials",400))
        }
        const [userExist] = await User.findAll({
            where: {
                email
            },
            attributes:['id','username','password','email','role',]
        })
        if (!userExist) {
           return next(new AppErrorHandler("invalid credentials",404))
        }
        const validPassword = bcrypt.compareSync(password, userExist.password)
        if (!validPassword) {
           return next(new AppErrorHandler("invalid credentials",404))
        }
        const token=getJwt(userExist.id)
        res.status(200).json({
            message: 'successfully login',
            data:{
                user:userExist,
                token
            }
        })
    }

    async forgetPassword(req: Request, res: Response,next:NextFunction): Promise<void> {
        const { email } = req.body
        if (!email) {
            return next(new AppErrorHandler("please give all credentials",400))
        }
        const userEmailExist = await User.findOne({
            where: {
                email
            }
        })

        if (!userEmailExist) {
            return next(new AppErrorHandler("invalid credentials",404))
        }
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
            return next(new AppErrorHandler("please give all credentials",400))
        }
        const userEmailExist = await User.findOne({
            where: {
                email,
                otp
            }
        })

        if (!userEmailExist) {
            return next(new AppErrorHandler("invalid credentials",404))
        }
        userEmailExist.isVerifiedOtp = true
        await userEmailExist.save()
        res.status(200).json({
            message: 'otp verified successfully'
        })
    }
    async changePassword(req: Request, res: Response,next:NextFunction): Promise<void> {
        const { email, otp, newPassord, confirmNewPassword } = req.body

        if (!email || !otp || !newPassord || !confirmNewPassword) {
            return next(new AppErrorHandler("provide all credentials",400))
        }
        if (newPassord !== confirmNewPassword) {
             return next(new AppErrorHandler("password doesnot match",400))
        }
        const userEmailExist = await User.findOne({
            where: {
                email,
                otp
            }
        })

        if (!userEmailExist) {
            return next(new AppErrorHandler("invalid credentials",404))
        }
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