import mongoose, { Schema } from "mongoose";

const userSchema = Schema({
    name: { type: String, require: true},
    email: { type: String, require: true, unique: true},
    password: { type: String, require: true},
    confirmPassword: { type: String },
    // confirmPassword: { type: String, require: true},
    about: {type: String, default: "Hello there! I am using Social Media"},
    phone: {type: String, default: ""},
    groups: [
        { type: Schema.Types.ObjectId, ref: "Group", default: [] }
    ]
},
{
    timestamps: true //createdAt and UpdatedAt
}
);

const User = mongoose.model("User", userSchema);
export default User;