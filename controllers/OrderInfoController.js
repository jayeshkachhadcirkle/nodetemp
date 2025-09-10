const OrderInfoModel = require('../models/OrderInfoModel');
const OrderModel = require('../models/OrderModel'); // Assuming this is your Order Model
const VariantModel = require('../models/VariantModel'); // Assuming this is your Variant Model

// Create a new order info entry
exports.createOrderInfo = async (req, res) => {
    try {
        const { ord_no, sno, name, var_id, qty, price, value, info } = req.body;

        // Check if the order exists
        const order = await OrderModel.findOne({ ord_no });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Check if the variant exists
        const variant = await VariantModel.findById(var_id);
        if (!variant) {
            return res.status(404).json({ message: 'Variant not found' });
        }

        // Create the order info entry
        const orderInfo = new OrderInfoModel({
            ord_no,
            sno,
            name,
            var_id,
            qty,
            price,
            value: qty * price, // Value is calculated as qty * price
            info
        });

        // Save the order info entry
        await orderInfo.save();
        res.status(201).json({ message: 'Order info created successfully', orderInfo });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get all order info entries for a specific order
exports.getAllOrderInfoByOrder = async (req, res) => {
    try {
        const { ord_no } = req.query;
        if (!ord_no) {
            return res.status(400).json({ message: 'Order number is required' });
        }

        const orderInfos = await OrderInfoModel.find({ ord_no });
        if (orderInfos.length === 0) {
            return res.status(404).json({ message: 'No order info found for this order' });
        }

        res.status(200).json(orderInfos);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get a specific order info entry by ID
exports.getOrderInfoById = async (req, res) => {
    try {
        const { id } = req.params;

        const orderInfo = await OrderInfoModel.findById(id);
        if (!orderInfo) {
            return res.status(404).json({ message: 'Order info not found' });
        }

        res.status(200).json(orderInfo);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update an order info entry by ID
exports.updateOrderInfo = async (req, res) => {
    try {
        const { id } = req.params;
        const { sno, name, var_id, qty, price, value, info } = req.body;

        const orderInfo = await OrderInfoModel.findById(id);
        if (!orderInfo) {
            return res.status(404).json({ message: 'Order info not found' });
        }

        // Update the order info fields
        orderInfo.sno = sno || orderInfo.sno;
        orderInfo.name = name || orderInfo.name;
        orderInfo.var_id = var_id || orderInfo.var_id;
        orderInfo.qty = qty || orderInfo.qty;
        orderInfo.price = price || orderInfo.price;
        orderInfo.value = value || (qty * price); // Recalculate value if needed
        orderInfo.info = info || orderInfo.info;

        // Save the updated order info
        await orderInfo.save();
        res.status(200).json({ message: 'Order info updated successfully', orderInfo });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete an order info entry by ID
exports.deleteOrderInfo = async (req, res) => {
    try {
        const { id } = req.params;

        const orderInfo = await OrderInfoModel.findById(id);
        if (!orderInfo) {
            return res.status(404).json({ message: 'Order info not found' });
        }

        await orderInfo.remove();
        res.status(200).json({ message: 'Order info deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
