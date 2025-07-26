import express from 'express';
import cors from 'cors';
import "dotenv/config";
import connectDB from './configs/db.js';
import userRouter from './routes/userRoutes.js';
import ownerRoutes from './routes/ownerRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "https://car-rental-bd.vercel.app"],
  credentials: true
}));

app.use(express.json());

await connectDB(); // connect to DB

// Mount routes
app.use('/api/user', userRouter);
app.use('/api/owner', ownerRoutes);
app.use('/api/bookings', bookingRoutes);

// Optional health check
app.get('/', (req, res) => res.send("✅ Car Rental Server is Running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
