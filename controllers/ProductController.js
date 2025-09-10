const ProductModel = require('../models/ProductModel');
const ProCatModel = require('../models/ProCatModel'); // Assuming you already have this model

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const { pro_catid, name, base_price, base_price2, desc, info } = req.body;

        // Check if the product category exists
        const proCat = await ProCatModel.findById(pro_catid);
        if (!proCat) {
            return res.status(404).json({ message: 'Product category not found' });
        }

        // Check if product with the same sno exists in the category
        const lastProduct = await ProductModel.findOne({ pro_catid }).sort({ sno: -1 });
        let newSno = 1; // Default sno value
        if (lastProduct) {
            newSno = lastProduct.sno + 1; // Increment sno
        }

        // Create new product
        const product = new ProductModel({
            pro_catid,
            sno: newSno,
            name,
            base_price,
            base_price2,
            desc,
            info
        });

        await product.save();
        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get all products by category ID
exports.getAllProductsByCategory = async (req, res) => {
    try {
        const { pro_catid } = req.query;
        if (!pro_catid) {
            return res.status(400).json({ message: 'Product category ID is required' });
        }

        const products = await ProductModel.find({ pro_catid });
        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found for this category' });
        }

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await ProductModel.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update product details by ID
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, base_price, base_price2, desc, info } = req.body;

        const product = await ProductModel.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        product.name = name || product.name;
        product.base_price = base_price || product.base_price;
        product.base_price2 = base_price2 || product.base_price2;
        product.desc = desc || product.desc;
        product.info = info || product.info;

        await product.save();
        res.status(200).json({ message: 'Product updated successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await ProductModel.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await product.remove();
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
