import  jwt  from "jsonwebtoken";

const authmiddleware = (req, res, next) => {
    const token = req.headers.authorization
    
    
    if (!token) {
        return res.status(401).json({ message: "You are not authenticated" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = decoded.userId;
        console.log(decoded);
        
        next();
    }
    catch (error) {
        return res.status(400).json({ message: "Invalid token" });
    }
}
export default authmiddleware
