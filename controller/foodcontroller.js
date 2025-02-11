
import foodModel from '../model/userModel.js';
import  fs  from 'fs';



// ADD FOOD 

export const addfood= async (req,res)=>{

    console.log('adding food');
    
    const image_file = `${req.file.filename}`
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_file
    })
    try {
        await food.save();
        res.status(201).json(food);
        
    } catch (error) {
        res.status(400).json({message: error.message});
    }

}


// GET FOOD

export const getFood = async (req,res)=>{
    console.log('getting food');
    
    try {
        const food = await foodModel.find({});
        res.status(200).json(food);
        
    } catch (error) {
        res.status(400).json({message: error.message});
        
    }
}


// REMOVE FOOD
export const removeFood = async (req,res)=>{
    console.log("Removing");
    
    try {
        const food = await foodModel.findById(req.body._id);
        fs.unlink(`./uploads/${food.image}`,()=>{});
        
        

        await foodModel.findByIdAndDelete(req.body._id);
        res.status(200).json(food);

        
    } catch (error) {
        res.status(400).json({message: error.message});
        
    }
}


// UPDATE FOOD using put method

export const updateFood = async (req, res) => {
    console.log('updating food');
    const {_id, name, description, price, category } = req.body;
    const updateImage = req.file ? req.file.filename : req.body.image;

    try {
        const updatedFood = await foodModel.findByIdAndUpdate(
            _id,
            { name, description, price, category, image: updateImage },
            { new: true }
        );
        
        if (!updatedFood) {
            res.status(404).json({ success: false, message: "Food item not found" });
            return;
        }

        res.json({ success: true, message: 'Food updated successfully', updatedFood });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};





    
   







