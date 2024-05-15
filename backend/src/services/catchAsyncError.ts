import { Request, Response } from "express";
import { environment } from "./typeDefine";
const errorHandler = (fn: Function) => {
    return (req: Request, res: Response) => {
        fn(req, res).catch((err: Error) => {
            res.status(500).json({
                message: 'internal server error',
                error:process.env.ENVIRONMENT === environment.DEV ? err : ''
            })
        })
    }
}
export default errorHandler
