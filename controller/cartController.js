import UserModel from "../model/registerUser.js";

// add to cart

export const addToCart = async (req, res) => {
  const user_id = req.body.userId;

  try {
    const userData = await UserModel.findById(user_id);
    const cartdata = userData.cart;

    if (!cartdata[req.body.item_Id]) {
      cartdata[req.body.item_Id] = 1;
    } else {
      cartdata[req.body.item_Id] += 1;
    }

    await UserModel.findByIdAndUpdate(user_id, { cart: cartdata });

    res.status(200).json({ message: "Item added to cart", userData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// update cart

export const removecart = async (req, res) => {
  console.log("Removing");

  const user_id = req.body.userId;
  try {
    const userData = await UserModel.findById(user_id);
    const cartData = await userData.cart;

    if (cartData[req.body.item_Id] > 0) {
      cartData[req.body.item_Id] -= 1;
    }
    await UserModel.findByIdAndUpdate(user_id, { cart: cartData });
    res.status(200).json({ message: "Item removed from cart", userData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const getcart = async (req, res) => {
    const user_id = req.body.userId;
    try {
      const userData = await UserModel.findById(user_id);
      const cartData = await userData.cart;
      res.status(200).json({ message: "Cart data", cartData });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

