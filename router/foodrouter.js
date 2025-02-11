
import express from 'express';
import { addfood, getFood, removeFood, updateFood } from '../controller/foodcontroller.js';
import multermiddleware from '../middleware/multer.js';
 const foodrouter = express.Router();



foodrouter.post('/add',multermiddleware.single('image'),addfood);  
foodrouter.get('/get',getFood)   
foodrouter.post('/delete',removeFood) 

foodrouter.post('/update',multermiddleware.single('image'),updateFood)  

 export default foodrouter
