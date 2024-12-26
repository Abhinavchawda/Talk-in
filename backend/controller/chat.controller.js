import Group from "../models/group.model.js";
import User from "../models/user.model.js";

export const getAllChats = async (req, res) => {
    try {
        const loggenInUser = req?.user?._id;   
        //we want all users except the loggedInUser     
        const filteredUsers = await User.find({ _id: { $ne: loggenInUser } }).select("name email");
        const groups = await Group.find({ members: req.user._id});        
        res.status(201).json([ ...filteredUsers, ...groups]);
    } catch (error) {
        console.log("ERROR in user.controller.js in getAllUsersProfile() : ", error);
        res.status(500).json({ message: "Server err in user.controller.js in getAllUsersProfile()" });
    }
}