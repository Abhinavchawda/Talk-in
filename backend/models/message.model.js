import mongoose, { Schema } from "mongoose";
import User from "./user.model.js";
import Group from "./group.model.js";

const messageSchema = new Schema({
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: User, require: true },
    isGroupMessage: { type: Boolean, default: false },
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: Group, default: null },
    groupName: { type: String, default: "" },
    receiverId: [
        { type: mongoose.Schema.Types.ObjectId, ref: User, require: true }
    ],
    message: {
        type: String, require: true, trim: true, validate: [
            {
                validator: (value) => value.length > 0,
                message: "Message cannot be empty"
            }
        ]
    },
    label: { type: String, default: "" },   //like personal, starred, important, etc
    createdAt: { type: Date, default: Date.now }
},
    {
        timestamps: true
    }
);

const Message = mongoose.model("Message", messageSchema);
export default Message;