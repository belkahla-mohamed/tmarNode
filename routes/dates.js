const express = require('express');
const router = express.Router();
const datesController = require('../controllers/datesController');

router.get('/', datesController.getAllDates);
router.get('/:id', datesController.getDateById);
router.post('/', datesController.createDate);
router.put('/:id', datesController.updateDate);
router.delete('/:id', datesController.deleteDate);

module.exports = router; 