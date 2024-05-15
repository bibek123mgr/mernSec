import multer from 'multer';
import { Request } from 'express';

const storage = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb: any) {
        const allowedFileTypes = ['image/jpg', 'image/jpeg', 'image/png'];
        if (!allowedFileTypes.includes(file.mimetype)) {
            cb(new Error('This file type is not supported'));
        } else {
            cb(null, './src/storage');
        }
    },
    filename: function (req: Request, file: Express.Multer.File, cb: any) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

export {
    multer,
    storage,
}

