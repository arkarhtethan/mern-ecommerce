import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import connectDB from "./config/db.js";
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
dotenv.config()

connectDB();

const app = express();
app.use(cors())
app.use(express.json())

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// app.get('/', (req, res) => {
//     return res.json("API is running");
// })

app.use('/api/products', productRoutes);

app.use('/api/users', userRoutes);

app.use('/api/orders', orderRoutes);

app.use('/api/upload', uploadRoutes);

app.use('/uploads', express.static(path.join(__dirname, '..', '/uploads')))

app.use(express.static(path.join(__dirname, '..', '/build/index.html')));

app.use(express.static(path.join(__dirname, '..', 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build/index.html'));
})

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server is running in ${process.env.NODE} on ${PORT}`.yellow.bold));