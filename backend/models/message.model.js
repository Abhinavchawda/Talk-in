import mongoose, { Schema } from "mongoose";
import User from "./user.model.js";

const messageSchema = new Schema({
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: User, require: true },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: User, require: true },
    message: {
        type: String, require: true, trim: true, validate: [
            {
                validator: (value) => value.length > 0,
                message: "Message cannot be empty"
            }
        ]
    },
    createdAt: { type: Date, default: Date.now }
},
    {
        timestamps: true
    }
);

const Message = mongoose.model("Message", messageSchema);
export default Message;