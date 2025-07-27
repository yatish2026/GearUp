import express from 'express';
import cors from 'cors';
import "dotenv/config";
import connectDB from './configs/db.js';
import userRouter from './routes/userRoutes.js';
import ownerRoutes from './routes/ownerRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import newsletterRouter from "./routes/newsletter.js";

const app = express();

// Dynamic CORS setup
const allowedOrigins = [
  "http://localhost:5173", // Local dev
  
  "https://gear-hgt28z7nd-yatishs-projects-0a9d1434.vercel.app" // Your current deployment
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, curl, Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin) || origin.endsWith(".vercel.app")) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed for this origin: " + origin), false);
    }
  },
  credentials: true
}));

app.use(express.json());

// Connect to DB
await connectDB();

// Mount routes
app.use('/api/user', userRouter);
app.use('/api/owner', ownerRoutes);
app.use('/api/bookings', bookingRoutes);
app.use("/api/newsletter", newsletterRouter);

// Health check endpoint
app.get('/', (req, res) => res.send("✅ Car Rental Server is Running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
