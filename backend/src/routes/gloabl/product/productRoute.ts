import express, { Router } from 'express';
import errorHandler from '../../../services/catchAsyncError';
import ProductController from '../../../controller/global/product/ProductController';
import ProductMiddleware from '../../../middleware/ProductMiddleware';

const router: Router = express.Router();

router.route('/')
    .get(errorHandler(ProductController.fetchProducts));
router.route('/:id')
    .get(ProductMiddleware.isValidProduct, errorHandler(ProductController.fetchOneProduct));

export default router;
