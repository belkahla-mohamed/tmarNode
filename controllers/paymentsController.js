const Payment = require('../models/Payment');

exports.processPayment = async (req, res) => {
  try {
    const { name, email, cardNumber, expiryDate, cvv, amount } = req.body;
    if (!name || !email || !cardNumber || !expiryDate || !cvv) {
      return res.status(400).json({ status: 'error', message: 'جميع الحقول مطلوبة.' });
    }
    if (cardNumber.length !== 16 || cvv.length !== 3) {
      return res.status(400).json({ status: 'error', message: 'رقم البطاقة أو رمز CVV غير صالح.' });
    }
    // Simulate payment processing
    const transaction_id = 'txn_' + Math.random().toString(36).substr(2, 9);
    const payment = new Payment({
      name,
      email,
      card_number: cardNumber,
      expiry_date: expiryDate,
      cvv,
      amount,
      transaction_id
    });
    await payment.save();
    res.json({ status: 'success', message: 'تمت معالجة الدفع بنجاح!', transaction_id });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
}; 