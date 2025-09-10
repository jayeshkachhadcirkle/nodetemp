const OrderModel = require('../models/OrderModel');
const CompanyMaster = require('../models/CompanyMaster'); // Assuming this is your CompanyMaster model

// Create a new order
exports.createOrder = async (req, res) => {
    try {
        const { comp_id, ord_no, name, ref_no, status, qty, value, phone, address, delivere, remark, info } = req.body;

        // Check if the company exists
        const company = await CompanyMaster.findById(comp_id);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        // Create the order
        const order = new OrderModel({
            comp_id,
            ord_no,
            name,
            ref_no,
            status,
            qty,
            value,
            phone,
            address,
            delivere,
            remark,
            info
        });

        // Save the order
        await order.save();
        res.status(201).json({ message: 'Order created successfully', order });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get all orders for a specific company
exports.getAllOrdersByCompany = async (req, res) => {
    try {
        const { comp_id } = req.query;
        if (!comp_id) {
            return res.status(400).json({ message: 'Company ID is required' });
        }

        const orders = await OrderModel.find({ comp_id });
        if (orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this company' });
        }

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get a specific order by its ID
exports.getOrderById = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await OrderModel.findById(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update order details by ID
exports.updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { ord_no, name, ref_no, status, qty, value, phone, address, delivere, remark, info } = req.body;

        const order = await OrderModel.findById(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Update the order fields
        order.ord_no = ord_no || order.ord_no;
        order.name = name || order.name;
        order.ref_no = ref_no || order.ref_no;
        order.status = status || order.status;
        order.qty = qty || order.qty;
        order.value = value || order.value;
        order.phone = phone || order.phone;
        order.address = address || order.address;
        order.delivere = delivere || order.delivere;
        order.remark = remark || order.remark;
        order.info = info || order.info;

        // Save the updated order
        await order.save();
        res.status(200).json({ message: 'Order updated successfully', order });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete an order by ID
exports.deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await OrderModel.findById(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        await order.remove();
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
