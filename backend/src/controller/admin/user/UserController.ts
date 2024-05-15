import { Request, Response } from "express";
import User from "../../../database/models/userModel";

class UserController{
    async fetchUsers(req: Request, res: Response): Promise<void>{
        const users = await User.findAll()
        if (users.length === 0) {
            res.status(200).json({
                message: 'no users to fetch',
                data:[]
            })
        } else {
            res.status(200).json({
                message: 'fetch successfully',
                data:users
            })
        }
    }

    async fetchUser(req: Request, res: Response): Promise<void>{
        const userId=req.params.id
        const user = await User.findByPk(userId)
        if (!user) {
            res.status(400).json({
                message: 'no user to fetch',
                data:[]
            })
        } else {
            res.status(200).json({
                message: 'fetch successfully',
                data:user
            })
        }
    }
}

export default new UserController()