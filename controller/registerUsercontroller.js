import jwt from "jsonwebtoken";

import bcrypt from "bcryptjs";
import Usermodel from "../model/registerUser.js";
import validator from "validator";

// Register User

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exist = await Usermodel.findOne({email})
    if(exist){
        return res.status(403).json({ message: "User already exists",status: "user exists" });
    
    }
    if (!validator.isEmail(email)) {
        return res.status(407).json({ message: "Invalid email" });
        
        
    }
    if (!validator.isLength(name, { min: 2, max: 30 })) {
        return res.status(406).json({ message: "Name must be between 2 and 30 characters" });
    }
    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ message: "Password is not strong enough" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Usermodel({ name, email, password: hashedPassword });
    const userregisterd = await newUser.save();
    const token = jwt.sign({ userId: userregisterd._id }, process.env.JWT_SECRET);
    
    res.status(201).json({ message: "User registered successfully" , token: token });
   
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login User

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
  try {
    const user = await Usermodel.findOne({ email });
    
    
    if (!user) {
      console.log('Invalid email attempt:', email);
      return res.status(401).json({ message: "Invalid email " });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Invalid password attempt:', password);
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
