// server.js
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User'); // Import User model
const CompanyMaster = require('./models/CompanyMaster'); // Import CompanyMasters model
const userRoutes = require('./routes/userRoutes');
const configsRoutes = require('./routes/configsRoutes');
const companyMasters = require('./routes/companyMasters');
const branchRoutes = require('./routes/branchRoutes');
const proCatRoutes = require('./routes/proCatRoutes');
const productRoutes = require('./routes/productRoutes');
const variantRoutes = require('./routes/variantRoutes');

require('dotenv').config();

const app = express();
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Failed to connect to MongoDB', err));


app.use('/api/users', userRoutes);
app.use('/api/company', companyMasters);
app.use('/api/configs', configsRoutes);
app.use('/api/branch', branchRoutes);
app.use('/api/procat', proCatRoutes);
app.use('/api/product', productRoutes);
app.use('/api/variant', variantRoutes);

// Basic route to test server
app.get('/', (req, res) => {
    res.send('Hello, MongoDB with Node.js!');
});

app.get('/api', (req, res) => {
    res.send('API is running...');
})

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
