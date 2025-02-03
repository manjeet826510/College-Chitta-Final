import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        name: {type: String, required: true,},
        email: {type: String, required: true, unique: true},   
        password: {type: String, required: true,},   
        image: {type: String, required: true,}, 
        pdf: {type: String, required: true,}, 
        appliedRole: {type: String, required: true,},  
        role: {type: String, required: true,},  
        isCounsellor: {type: Boolean, default: false, required: true},
        isAdmin: {type: Boolean, default: false, required: true}
    },
    {
        timestamps: true,
    }
)

const User = mongoose.model('User', userSchema);
export default User;