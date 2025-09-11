// server.js
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const app = express();
app.use(express.json());

app.use(cookieParser());


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Failed to connect to MongoDB', err));

const userRoutes = require('./routes/userRoutes');
const configsRoutes = require('./routes/configsRoutes');
const companyRoutes = require('./routes/companyRoutes');
const branchRoutes = require('./routes/branchRoutes');
const proCatRoutes = require('./routes/proCatRoutes');
const productRoutes = require('./routes/productRoutes');
const variantRoutes = require('./routes/variantRoutes');
const orderRoutes = require('./routes/orderRoutes');
const orderInfoRoutes = require('./routes/orderInfoRoutes');


app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/users', userRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/configs', configsRoutes);
app.use('/api/branch', branchRoutes);
app.use('/api/procat', proCatRoutes);
app.use('/api/product', productRoutes);
app.use('/api/variant', variantRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/orderinfo', orderInfoRoutes);



app.get('/', (req, res) => {
    res.send('Hello, MongoDB with Node.js!');
});

app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from the API!' });
});

app.get('/api', (req, res) => {
    res.send({ "message": "Api Running..." });
})

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    // Get token from Authorization header
    const token = req.header('Authorization')?.split(' ')[1]; // Extract token after 'Bearer'

    if (!token) {
        return res.status(401).json({ message: 'Access denied, token required' });
    }

    try {
        // Verify the token using the secret key
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;  // Attach the verified user data to the request
        next();  // Pass control to the next middleware or route handler
    } catch (error) {
        return res.status(400).json({ message: 'Invalid or expired token' });
    }
};
