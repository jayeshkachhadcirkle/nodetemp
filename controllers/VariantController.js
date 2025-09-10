const VariantModel = require('../models/VariantModel');
const ProductModel = require('../models/ProductModel'); // Assuming this is your Product model

// Create a new product variant
exports.createVariant = async (req, res) => {
    try {
        const { product_id, name, var_price, var_price2, desc, info } = req.body;

        // Check if the product exists
        const product = await ProductModel.findById(product_id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Find the last variant for the product to increment sno
        const lastVariant = await VariantModel.findOne({ product_id }).sort({ sno: -1 });
        let newSno = 1; // Default sno value
        if (lastVariant) {
            newSno = lastVariant.sno + 1; // Increment sno
        }

        // Create the variant
        const variant = new VariantModel({
            product_id,
            sno: newSno,
            name,
            var_price,
            var_price2,
            desc,
            info
        });

        // Save the variant to the database
        await variant.save();
        res.status(201).json({ message: 'Variant created successfully', variant });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get all variants for a specific product
exports.getAllVariantsByProduct = async (req, res) => {
    try {
        const { product_id } = req.query;
        if (!product_id) {
            return res.status(400).json({ message: 'Product ID is required' });
        }

        const variants = await VariantModel.find({ product_id });
        if (variants.length === 0) {
            return res.status(404).json({ message: 'No variants found for this product' });
        }

        res.status(200).json(variants);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get a specific variant by ID
exports.getVariantById = async (req, res) => {
    try {
        const { id } = req.params;

        const variant = await VariantModel.findById(id);
        if (!variant) {
            return res.status(404).json({ message: 'Variant not found' });
        }

        res.status(200).json(variant);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update variant details by ID
exports.updateVariant = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, var_price, var_price2, desc, info } = req.body;

        const variant = await VariantModel.findById(id);
        if (!variant) {
            return res.status(404).json({ message: 'Variant not found' });
        }

        // Update the variant fields
        variant.name = name || variant.name;
        variant.var_price = var_price || variant.var_price;
        variant.var_price2 = var_price2 || variant.var_price2;
        variant.desc = desc || variant.desc;
        variant.info = info || variant.info;

        // Save the updated variant
        await variant.save();
        res.status(200).json({ message: 'Variant updated successfully', variant });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete a variant by ID
exports.deleteVariant = async (req, res) => {
    try {
        const { id } = req.params;

        const variant = await VariantModel.findById(id);
        if (!variant) {
            return res.status(404).json({ message: 'Variant not found' });
        }

        await variant.remove();
        res.status(200).json({ message: 'Variant deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
