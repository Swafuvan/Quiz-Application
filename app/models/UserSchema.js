import mongoose, { Schema } from "mongoose";

const userScheme = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required:true,
    },
    password: {
        type: String,
        required: true,
    },
    experience: {
        type: Number,
        required: true,
        default: 0,
    },
    isLogged: {
        type: Boolean,
        required: true,
    }
})

const User = mongoose.models.User || mongoose.model("User", userScheme);

export default User;
