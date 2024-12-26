import Group from "../models/group.model.js";
import User from "../models/user.model.js";

export const createGroup = async (req, res) => {
    try {        
        const { name, description, members, admin } = req.body;        
        const newGroup = await Group({
            name,
            description,
            admin,
            members: [ ...members, ...admin]
        });
        await newGroup.save();

        const user = await User.findById(admin);
        user.groups.push(newGroup._id);
        await user.save();

        res.status(201).json(newGroup);
    }
    catch (error) {
        console.log("ERROR in group.controller.js in createGroup() : ", error);
        res.status(500).json({ message: "Server err in group.controller.js in createGroup()" });
    }
}

export const getGroups = async (req, res) => {
    try {
        const groups = await Group.find({ members: req.user._id });
        res.status(200).json(groups);
    }
    catch (error) {
        console.log("ERROR in group.controller.js in getGroups() : ", error);
        res.status(500).json({ message: "Server err in group.controller.js in getGroups()" });
    }
}