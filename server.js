// server.js
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User'); // Import User model
const CompanyMaster = require('./models/CompanyMaster'); // Import CompanyMasters model
const userRoutes = require('./routes/userRoutes');
const configsRoutes = require('./routes/configsRoutes');
const companyMasters = require('./routes/companyMasters');
const branchRoutes = require('./routes/branchRoutes');

require('dotenv').config();

const app = express();
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Failed to connect to MongoDB', err));

// Route to create a new user
// app.post('/api/users', async (req, res) => {
//     const { name, email, age } = req.body;

//     try {
//         const user = new User({ name, email, age });
//         await user.save();
//         res.status(201).json(user);
//     } catch (error) {
//         res.status(400).json({ message: 'Error creating user', error });
//     }
// });

// Route to get all users
// app.get('/api/users', async (req, res) => {
//     try {
//         const users = await User.find();
//         res.status(200).json(users);
//     } catch (error) {
//         res.status(400).json({ message: 'Error fetching users', error });
//     }
// });

app.use('/api/users', userRoutes);
app.use('/api/company', companyMasters);
app.use('/api/configs', configsRoutes);
app.use('/api/branch', branchRoutes);

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
