import { Request, Response } from "express";
import User from "../../../database/models/userModel";
import { AuthRequest } from "../../../services/typeDefine";

class ProfileController{
    async fetchMyprofile(req:AuthRequest,res:Response):Promise<void> {
        const id=req.user?.id
        const user = await User.findByPk(id, {
            attributes:["id","username","email","gender","address","number"]
        })
        res.status(200).json({
            message: 'profile fetch successfully',
            data:user
        })
    }

    // async updateProfile(req: AuthRequest, res: Response): Promise<void>{
    //     const id = req.user?.id
        

    // }
}

export default new ProfileController()