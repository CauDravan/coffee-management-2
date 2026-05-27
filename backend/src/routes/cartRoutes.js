import express from 'express';

import * as cartController from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, cartController.getCart);

router.post('/add', protect, cartController.addToCart);

router.put('/update', protect, cartController.updateCartItem);

router.delete('/remove/:productId', protect, cartController.removeFromCart);

router.delete('/clear', protect, cartController.clearCart);

export default router;