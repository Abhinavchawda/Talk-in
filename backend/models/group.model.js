import mongoose, { Schema } from "mongoose";
import User from "./user.model.js";

const groupSchema = new Schema({
    name: { type: String, require: true },
    description: { type: String, default: "" },
    admin: { type: Schema.Types.ObjectId, ref: User, require: true },
    members: [
        { type: Schema.Types.ObjectId, ref: User }
    ]
},
    {
        timestamps: true
    }
);

const Group = mongoose.model("Group", groupSchema);
export default Group;