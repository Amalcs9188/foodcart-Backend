import multer from 'multer' // multer 



const storage = multer.diskStorage({
    destination:'./uploads',
    filename:(req,file,callback)=>{
        callback(null,`image-${Date.now()}-${file.originalname}`)

    }
})

const multermiddleware = multer({storage})


export default multermiddleware;