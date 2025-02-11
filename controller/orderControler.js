import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils.js";
import { instance } from "../index.js";
import crypto from "crypto";
import UserModel from "../model/registerUser.js";
import orderModel from "../model/orderModel.js";

export const placeOrder = async (req, res) => {
  const amount = req.body.order.amount;
  const { userId } = req.body;

  const { address, items } = req.body.order;

  try {
    await UserModel.findByIdAndUpdate(userId, { cart: {} });
    const options = {
      amount: Number(amount) * 100,
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    await orderModel.create({
      userId,
      name: address.name,
      phone: address.phone,
      pincode: address.pincode,
      place: address.place,
      address: address.address,
      items: items,
      amount: amount,
    });
    res.status(200).json(order);
  } catch (error) {
    console.log(error);

    res.status(400).json({ message: error });
  }
};

export const paymentverification = (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  const order_id = razorpay_order_id;

  const secret = process.env.RAZORPAY_SECRET;
  const generated_signature = crypto
    .createHmac("sha256", secret)
    .update(`${order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (generated_signature === razorpay_signature) {
    try {
      validatePaymentVerification(
        { order_id: order_id, payment_id: razorpay_payment_id },
        razorpay_signature,
        secret
      );

      // add to database

      // Payment is successful
      res.redirect("http://localhost:5174/success");
    } catch (error) {
      res
        .status(400)
        .json({ message: "Payment verification failed", error: error.message });
    }
  } else {
    res.status(400).json({ message: "Invalid signature" });
    res.redirect("http://localhost:5173/cancel");
  }
};



export const getOrder =async (req, res) => {

  try {
   const orders = await orderModel.find({})

    res.status(200).json(orders)
    
  } catch (error) {
    
    res.status(400).json({ message: error.message });
    
  }
  
}
