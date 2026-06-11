import express from 'express';

import * as adminController from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

const router = express.Router();

/// Product Management
router.get('/products', protect, admin, adminController.getAllProductsAdmin);

router.post('/products', protect, admin, adminController.createProduct);

router.put('/products/:id', protect, admin, adminController.updateProduct);

router.delete('/products/:id', protect, admin, adminController.deleteProduct);

/// Category Management
router.post('/categories', protect, admin, adminController.createCategory);

/// Order Management
router.get('/orders', protect, admin, adminController.getAllOrders);

router.put('/orders/:id/status', protect, admin, adminController.updateOrderStatus);

/// User Management
router.get('/users', protect, admin, adminController.getAllUsers);

router.delete('/users/:id', protect, admin, adminController.deleteUser);

/// Admin Dashboard
router.get('/dashboard', protect, admin, adminController.getDashboardStats);

export default router;