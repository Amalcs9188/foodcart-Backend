import express from "express";
import { getOrder, paymentverification, placeOrder } from "../controller/orderControler.js";
import authmiddleware from "../middleware/jwtMiddleware.js";

const orderRouter = express.Router();

// Add error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: err.message,
  });
};

// Regular order route
orderRouter.post("/order",authmiddleware, placeOrder);
orderRouter.post("/payment", paymentverification);
orderRouter.get('/getkey', (req, res) => res.status(200).json({ key: process.env.RAZORPAY_KEY_ID }))
orderRouter.get('/getorder',getOrder)



// Verify payment route


orderRouter.use(errorHandler);

export default orderRouter;
