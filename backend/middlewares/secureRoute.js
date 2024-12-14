import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const secureRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;  //get the token from the request
        
        if(!token) {
            return res.status(401).json({ message: "Not authorized "});
        }

        const verified = jwt.verify(token, process.env.JWT_TOKEN);  //verifying the token

        if(!verified) {
            return res.status(403).json({ message: "Invalid token "});
        }

        const user = await User.findById(verified.userId).select("-password");  //removing the password from user
        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        req.user = user;      

        next();
    } catch (error) {
        console.log("ERROR in secureRoute.js in secureRoute() : ", error);
        res.status(500).json({ message: "Server error in secureRoute.js in secureRote()" });
    }
}