import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import createTokenAndSaveCookie from "../jwt/generateToken.js";

export const signup = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;
        
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Password not matched !" });
        }
        const check = await User.findOne({ email });
        if (check) {
            return res.status(400).json({ message: "User (email) already exits !" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);  // (password, salt)
        const newUser = await new User({
            "name": name,
            "email" : email,
            password: hashedPassword
        });        

        const userToPass = {
            _id: newUser._id,
            name,
            email
        }

        await newUser.save().then(() => {
            createTokenAndSaveCookie(userToPass._id, res);
            res.status(200).json({ message: "Sign-up successful !", userToPass });
        });
    }
    catch (err) {
        console.log("ERROR in user.controller.js in signup : ", err);
        res.status(500).json({ message: "Server err in user.controller.js in signup" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const checkUser = await User.findOne({ email });
        if (!checkUser) {
            res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, checkUser.password);
        if (!isMatch) {
            res.status(404).json({ message: "Invalid credentials !" });
        }

        const userToPass = {
            _id: checkUser._id,
            name: checkUser.name,
            email: checkUser.email
        }
        createTokenAndSaveCookie(userToPass._id, res);
        res.status(201).json({ message: "Log-in successful !", userToPass });
    }
    catch (err) {
        console.log("ERROR in user.controller.js in login : ", err);
        res.status(500).json({ message: "Server err in user.controller.js in login" });
    }
} 

export const logout = async (req, res) => {
    try {
        res.clearCookie('jwt');
        res.status(200).json({ message: "Logged out successfully !" });
    } 
    catch (err) {
        console.log("ERROR in user.controller.js in logout : ", err);
        res.status(500).json({ message: "Server err in user.controller.js in logout" });
    }
}