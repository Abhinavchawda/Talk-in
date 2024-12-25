import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socketIO/server.js";

export const sendMessage = async (req, res) => {
    try {
        const message = req.body?.message;
        //or we can destructure like
        // cosnst { message } = req.body;

        const { id: receiverId } = req.params;  //receiver id
        
        const senderId = req.user._id;  //loggedIn user is sendig messages, so it is sender

        //use let if const give error
        let conversation = await Conversation.findOne({ participants: { $all: [senderId, receiverId] } });

        if (!conversation) {
            conversation = await Conversation({
                participants: [senderId, receiverId]
            });
        }
        const newMessage = await Message({
            senderId,
            receiverId,
            message
        });
        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }
        await Promise.all([newMessage.save(), conversation.save()]);
        
        const receeiverSocketId = getReceiverSocketId(receiverId);
        if(receeiverSocketId) {
            io.to(receeiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);
    }
    catch (error) {
        console.log("ERROR in message.controller.js in sendMessage() : ", error);
        res.status(500).json({ message: "Server err in message.controller.js in sendMessage()" });
    }
}

export const getMessage = async (req, res) => {
    try {
        const { id: receiverId } = req.params;  //receiver id

        const senderId = req.user._id;  //loggedIn user is sendig messages, so it is sender

        const conversation = await Conversation.findOne(
            { participants: { $all: [senderId, receiverId] } }
        ).populate("messages");

        if (!conversation) {
            res.status(201).json({});
        }

        const messages = conversation?.messages;
        res.status(201).json(messages);
    }
    catch (error) {
        console.log("ERROR in message.controller.js in getMessage() : ", error);
        res.status(500).json({ message: "Server err in message.controller.js in getMessage()" });
    }
} 

export const getLabelledMessages = async (req, res) => {
    try {
        const userId = req.user._id; // Extract user ID from JWT: secuteRoute middleware        
        const labeledMessages = await Message.find({ 
            $or: [
                { senderId: userId },
                { receiverId: userId }
            ], 
            label: "star" 
        }).sort({ createdAt: -1 }).populate('receiverId', 'name') // Populate receiver's name
        .exec(); // Sort by latest
        res.status(200).json(labeledMessages);
    }
    catch (error) {
        console.log("ERROR in message.controller.js in getLabelledMessages() : ", error);
        res.status(500).json({ message: "Server err in message.controller.js in getLabelledMessages()" });
    }
}

export const updateLabel = async (req, res) => {    
    try {
        const { id } = req.params; // Extract message ID from URL
        const updatedLabel = req.body; // Extract label from request body        
        await Message.findByIdAndUpdate(id, updatedLabel); // Update label in database
        res.status(200).json({ message: "Label updated successfully" });
    }
    catch (error) {
        console.log("ERROR in message.controller.js in updateLabel() : ", error);
        res.status(500).json({ message: "Server err in message.controller.js in updateLabel()" });
    }
}