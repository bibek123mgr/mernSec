import { Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import User from '../database/models/userModel'
import { AuthRequest, Role } from '../services/typeDefine'



class AuthMiddleware {
    async isAuthenticated(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
        const token = req.headers?.authorization
        if (!token || token === undefined) {
            res.status(400).json({
                message: 'please login first'
            })
            return
        }
        jwt.verify(token, process.env.JWT_SECRET as string, async (error, decoded: any) => {
            if (error) {
                res.status(403).json({
                    message: 'invalid token'
                })
            } else {
                try {
                    const user = await User.findByPk(decoded.id)
                    if (!user) {
                        res.status(404).json({
                            message: 'user with this token not found'
                        })
                        return
                    }
                    req.user = user
                    next()
                } catch (error) {
                    res.status(500).json({
                        message: 'internal error'
                    })
                    return
                }
            }

        })
    }


    restrictTo(...roles: Role[]) {
        return (req: AuthRequest, res: Response, next: NextFunction) => {
            let userRole = req.user?.role as Role
            if (!roles.includes(userRole)) {
                res.status(403).json({
                    message: 'forbidden for this action'
                })
            } else {
                next()

            }
        }
    }


}

export default new AuthMiddleware()