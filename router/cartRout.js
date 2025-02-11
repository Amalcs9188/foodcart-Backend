import express from "express";
import { addToCart, getcart, removecart } from "../controller/cartController.js";
import authmiddleware from "../middleware/jwtMiddleware.js";

const cartrouter = express.Router();
cartrouter.post("/add",authmiddleware, addToCart);
cartrouter.post("/remove",authmiddleware, removecart);
cartrouter.post("/get",authmiddleware, getcart);
export default cartrouter