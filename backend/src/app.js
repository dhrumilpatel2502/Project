// create server in it
const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const foodRoutes = require('./routes/food.routes');
const cors = require('cors');
const foodPartnerRoutes = require('./routes/food-partner.routes');

const app = express();
app.use(cookieParser());
app.use(express.json()); // middleware to parse JSON request bodies
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    credentials: true
}));
app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/food-partner', foodPartnerRoutes);

module.exports = app;