import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { connectDB } from "./db/connectiondb.js";
import foodrouter from "./router/foodrouter.js";
import RegisterRouter from "./router/registerUserRouter.js";
import cartrouter from "./router/cartRout.js";
import orderRouter from "./router/orderRoute.js";
import Razorpay from "razorpay";
import bodyParser from "body-parser";

// Create Razorpay instance
export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

const app = express();
const port = process.env.PORT || 3000;

// Global error handler
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal server error",
  });
};

// Configure CORS with environment variables
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,
      process.env.ADMIN_URL,
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    credentials: true,
  })
);

// Webhook endpoint must come before body parser
app.post("/order/webhook", express.raw({ type: "application/json" }));

// Regular middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to database
connectDB().catch(console.error);

// Static files
app.use("/uploads", express.static("./uploads"));

// Routes
app.use("/api/food", foodrouter);
app.use("/user", RegisterRouter);
app.use("/cart", cartrouter);
app.use("/order", orderRouter);

// Health check route
app.get("/", (req, res) => {
  res.json({ status: "healthy", message: "Server is running" });
});

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err);
  // Don't exit in production, just log
  if (process.env.NODE_ENV === "development") {
    process.exit(1);
  }
});
