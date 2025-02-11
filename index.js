import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { connectDB } from "./db/connectiondb.js";
import foodrouter from "./router/foodrouter.js";
import RegisterRouter from "./router/registerUserRouter.js";
import cartrouter from "./router/cartRout.js";
import orderRouter from "./router/orderRoute.js";
import Razorpay from 'razorpay'
import bodyParser from "body-parser";


// Webhook endpoint




// create App

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

const app = express();
const port = process.env.PORT || 3000;

// Configure CORS
app.use(cors({
  origin: [
    'https://your-frontend-domain.vercel.app',
    'https://your-admin-domain.vercel.app',
    'http://localhost:5173', // For local development
    'http://localhost:5174'  // For local admin development
  ],
  credentials: true
}));

// Webhook endpoint must come before body parser
app.post("/order/webhook", express.raw({ type: "application/json" }));

// Regular middleware for other routes
app.use(express.json());

app.use(bodyParser.json()); // to parse JSON payloads
app.use(bodyParser.urlencoded({ extended: true }));

// db connection
connectDB();

// routes
app.use("/api/food", foodrouter);
app.use("/uploads", express.static("./uploads"));
app.use("/user", RegisterRouter);
app.use("/cart", cartrouter);
app.use('/order', orderRouter);


app.get("/", (req, res) => {
  res.send("server is running fast");
});
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
