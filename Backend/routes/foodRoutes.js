const express = require('express');
const router = express.Router();
const foodController = require('../controller/foodController');
const { verifyToken: auth } = require('../middleware/auth');
const { checkRole, checkApprovalStatus } = require('../middleware/roleAuth');

// Public routes
router.get('/menu', foodController.getAllMenuItems);

// Vendor routes - Menu management
router.post('/menu', auth, checkRole('vendor'), checkApprovalStatus, foodController.createMenuItem);
router.get('/vendor/menu', auth, checkRole('vendor'), foodController.getVendorMenu);
router.put('/menu/:id', auth, checkRole('vendor', 'admin'), foodController.updateMenuItem);
router.delete('/menu/:id', auth, checkRole('vendor', 'admin'), foodController.deleteMenuItem);

// Vendor routes - Order management
router.get('/vendor/orders', auth, checkRole('vendor'), foodController.getVendorOrders);
router.put('/orders/:id/status', auth, checkRole('vendor', 'admin'), foodController.updateOrderStatus);

// User routes - Ordering
router.post('/orders', auth, foodController.createOrder);
router.get('/orders', auth, foodController.getUserOrders);

module.exports = router;
