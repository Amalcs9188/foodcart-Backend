import mongoose from "mongoose";

// adminschema 

const FoodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

const foodModel =mongoose.models.food || mongoose.model("food", FoodSchema);
export default foodModel

