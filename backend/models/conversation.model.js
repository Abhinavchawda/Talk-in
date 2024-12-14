import mongoose, { Schema } from "mongoose";
import Message from "./message.model.js";
import User from "./user.model.js";

const conversationSchema = new Schema({
    participants: [
        { type: mongoose.Types.ObjectId, ref: User }
    ],
    messages: [
        { type: mongoose.Types.ObjectId, ref: Message, default: [] }
    ]
},
    {
        timestamps: true
    }
);

const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;