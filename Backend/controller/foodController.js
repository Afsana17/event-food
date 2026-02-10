const MenuItem = require('../models/menuItem');
const Order = require('../models/order');

// Create menu item (Vendor only)
exports.createMenuItem = async (req, res) => {
  try {
    const menuItem = new MenuItem({
      ...req.body,
      vendor: req.user.id,
    });
    await menuItem.save();
    res.status(201).json({ success: true, menuItem });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all menu items
exports.getAllMenuItems = async (req, res) => {
  try {
    const { vendor, category, vegetarian, vegan, glutenFree } = req.query;
    const filter = { isAvailable: true };
    
    if (vendor) filter.vendor = vendor;
    if (category) filter.category = category;
    if (vegetarian === 'true') filter.isVegetarian = true;
    if (vegan === 'true') filter.isVegan = true;
    if (glutenFree === 'true') filter.isGlutenFree = true;

    const menuItems = await MenuItem.find(filter)
      .populate('vendor', 'name vendorProfile')
      .sort({ 'rating.average': -1 });
    
    res.json({ success: true, menuItems });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get vendor's menu
exports.getVendorMenu = async (req, res) => {
  try {
    const menuItems = await MenuItem.find({ vendor: req.user.id })
      .sort({ createdAt: -1 });
    
    res.json({ success: true, menuItems });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update menu item
exports.updateMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    
    if (!menuItem) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }
    
    if (menuItem.vendor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    
    Object.assign(menuItem, req.body);
    await menuItem.save();
    
    res.json({ success: true, menuItem });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete menu item
exports.deleteMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    
    if (!menuItem) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }
    
    if (menuItem.vendor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    
    await menuItem.deleteOne();
    res.json({ success: true, message: 'Menu item deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create order
exports.createOrder = async (req, res) => {
  try {
    const { eventId, vendorId, items, deliveryLocation, specialInstructions } = req.body;
    
    // Calculate total amount
    let totalAmount = 0;
    const orderItems = [];
    
    for (const item of items) {
      const menuItem = await MenuItem.findById(item.menuItemId);
      if (!menuItem || !menuItem.isAvailable) {
        return res.status(400).json({ success: false, message: `Item ${item.menuItemId} not available` });
      }
      
      orderItems.push({
        menuItem: menuItem._id,
        name: menuItem.name,
        quantity: item.quantity,
        price: menuItem.price,
      });
      
      totalAmount += menuItem.price * item.quantity;
    }
    
    const order = new Order({
      user: req.user.id,
      event: eventId,
      vendor: vendorId,
      items: orderItems,
      totalAmount,
      deliveryLocation,
      specialInstructions,
    });
    
    await order.save();
    res.status(201).json({ success: true, order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get user's orders
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate('event', 'title startDate')
      .populate('vendor', 'name vendorProfile')
      .populate('items.menuItem')
      .sort({ orderDate: -1 });
    
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get vendor's orders
exports.getVendorOrders = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = { vendor: req.user.id };
    
    if (status) filter.status = status;
    
    const orders = await Order.find(filter)
      .populate('user', 'name email phone')
      .populate('event', 'title startDate')
      .sort({ orderDate: -1 });
    
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update order status (Vendor only)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    
    if (order.vendor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    
    order.status = status;
    if (status === 'delivered') {
      order.deliveredAt = new Date();
    }
    
    await order.save();
    res.json({ success: true, order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
