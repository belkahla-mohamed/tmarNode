const Cart = require('../models/Cart');

// Helper: get or create the single cart
defaultCart = async () => {
  let cart = await Cart.findOne();
  if (!cart) cart = await Cart.create({ items: [] });
  return cart;
};

exports.addItem = async (req, res) => {
  const { dateId, name, price, quantity } = req.body;
  if (!dateId || !name || !price || !quantity) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  const cart = await defaultCart();
  const existing = cart.items.find(i => i.dateId.equals(dateId));
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.items.push({ dateId, name, price, quantity });
  }
  await cart.save();
  res.status(201).json({ message: 'Item added', cart });
};

exports.getCart = async (req, res) => {
  const cart = await defaultCart();
  const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  res.json({ items: cart.items, total });
};

exports.updateItem = async (req, res) => {
  const { dateId, quantity } = req.body;
  if (!dateId || quantity == null) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  const cart = await defaultCart();
  const item = cart.items.find(i => i.dateId.equals(dateId));
  if (item) {
    item.quantity = quantity;
    await cart.save();
    res.json({ message: 'Item updated', cart });
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
};

exports.removeItem = async (req, res) => {
  const { dateId } = req.params;
  const cart = await defaultCart();
  cart.items = cart.items.filter(i => !i.dateId.equals(dateId));
  await cart.save();
  res.json({ message: 'Item removed', cart });
};

exports.clearCart = async (req, res) => {
  const cart = await defaultCart();
  cart.items = [];
  await cart.save();
  res.json({ message: 'Cart cleared', cart });
}; 