import express from 'express';
import * as authController from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/profile', protect, authController.getProfile);

router.post('/register', authController.register);
router.post('/login', authController.login);

export default router;