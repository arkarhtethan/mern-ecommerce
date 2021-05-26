const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const path = require('path');

dotenv.config()

connectDB();

const app = express();

app.use(express.json())

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.get('/', (req, res) => {
    return res.json("API is running");
})

app.use('/api/products', productRoutes);

app.use('/api/users', userRoutes);

app.use('/api/orders', orderRoutes);

app.use('/api/upload', uploadRoutes);

app.use('/uploads', express.static(path.join(__dirname, '..', '/uploads')))

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server is running in ${process.env.NODE} on ${PORT}`.yellow.bold));