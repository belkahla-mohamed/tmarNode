const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/add', cartController.addItem);
router.get('/', cartController.getCart);
router.put('/update', cartController.updateItem);
router.delete('/remove/:dateId', cartController.removeItem);
router.delete('/clear', cartController.clearCart);

module.exports = router; 