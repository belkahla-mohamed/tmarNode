const DateModel = require('../models/Date');

// Get all dates
exports.getAllDates = async (req, res) => {
  try {
    const dates = await DateModel.find();
    res.json({ status: 'success', message: 'تم تحميل المعلومات بنجاح .', dates });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'جاري تحميل المعلومات ...', error: err.message });
  }
};

// Get a single date by ID
exports.getDateById = async (req, res) => {
  try {
    const date = await DateModel.findById(req.params.id);
    if (!date) return res.status(404).json({ status: 'error', message: 'data non touver' });
    res.json({ status: 'success', message: 'data trouver', dates: date });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

// Create a new date
exports.createDate = async (req, res) => {
  try {
    const newDate = new DateModel(req.body);
    await newDate.save();
    res.status(201).json({ status: 'success', message: 'تمت الإضافة بنجاح!', date: newDate });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
};

// Update a date by ID
exports.updateDate = async (req, res) => {
  try {
    const updated = await DateModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ status: 'error', message: 'data non touver' });
    res.json({ status: 'success', message: '! تم التحديث بنجاح', date: updated });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
};

// Delete a date by ID
exports.deleteDate = async (req, res) => {
  try {
    const deleted = await DateModel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ status: 'error', message: 'invalide ID' });
    res.json({ status: 'success', message: 'operation valider' });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
}; 