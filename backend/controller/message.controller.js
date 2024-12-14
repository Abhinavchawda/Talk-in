import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

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
            const newMessage = await Message({
                senderId,
                receiverId,
                message
            });
            if (newMessage) {
                conversation.messages.push(newMessage._id);
            }
            await Promise.all([newMessage.save(), conversation.save()])
            res.status(201).json({ message: "Message sent successfully !", newMessage });
        }

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
            res.status(201).json({ message: "No conversation found" });
        }

        const messages = conversation.messages;
        res.status(201).json(messages);
    }
    catch (error) {
        console.log("ERROR in message.controller.js in getMessage() : ", error);
        res.status(500).json({ message: "Server err in message.controller.js in getMessage()" });
    }
} 