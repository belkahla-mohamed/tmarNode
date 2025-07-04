const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Add item to cart
router.post('/add', cartController.addItem);
// Fetch cart for user (userID in body)
router.post('/', cartController.getCart);
// Update item in cart
router.put('/update', cartController.updateItem);
// Remove item from cart (userID and dateId in body)
router.delete('/remove', cartController.removeItem);
// Clear cart (userID in body)
router.delete('/clear', cartController.clearCart);

module.exports = router; 