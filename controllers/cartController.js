const Cart = require('../models/Cart');

// Helper: get or create a cart for a user
const getOrCreateCart = async (userID) => {
  let cart = await Cart.findOne({ user: userID });
  if (!cart) cart = await Cart.create({ user: userID, items: [] });
  return cart;
};

exports.addItem = async (req, res) => {
  const { userID, dateId, name, price, imagePath, weight } = req.body;
  if (!userID || !dateId || !name || !price || !weight) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  const cart = await getOrCreateCart(userID);
  const existing = cart.items.find(i => i.dateId == dateId);
  if (existing) {
    existing.weight += weight;
  } else {
    cart.items.push({ dateId, name, price, imagePath, weight });
  }
  await cart.save();
  res.status(201).json({ message: 'Item added', cart });
};

// Accept POST for fetching cart (to allow userID in body)
exports.getCart = async (req, res) => {
  const userID = req.body.userID || req.query.userID;
  if (!userID) return res.status(400).json({ error: 'Missing userID' });
  const cart = await getOrCreateCart(userID);
  const total = cart.items.reduce((sum, item) => sum + item.price * item.weight, 0);
  res.json({ items: cart.items, total });
};

exports.updateItem = async (req, res) => {
  const { userID, dateId, weight } = req.body;
  if (!userID || !dateId || weight == null) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  const cart = await getOrCreateCart(userID);
  const item = cart.items.find(i => i.dateId == dateId);
  if (item) {
    item.weight = weight;
    await cart.save();
    res.json({ message: 'Item updated', cart });
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
};

// Accept DELETE with userID and dateId in body (axios style)
exports.removeItem = async (req, res) => {
  const { userID, dateId } = req.body;
  if (!userID || !dateId) return res.status(400).json({ error: 'Missing fields' });
  const cart = await getOrCreateCart(userID);
  cart.items = cart.items.filter(i => i.dateId != dateId);
  await cart.save();
  res.json({ message: 'Item removed', cart });
};

exports.clearCart = async (req, res) => {
  const { userID } = req.body;
  if (!userID) return res.status(400).json({ error: 'Missing userID' });
  const cart = await getOrCreateCart(userID);
  cart.items = [];
  await cart.save();
  res.json({ message: 'Cart cleared', cart });
}; 