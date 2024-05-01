import mongoose from "mongoose";

const contactSchema = mongoose.Schema(
    {
        name: {type: String, required: true,},
        phone: {type: Number, required: true,},
        email: {type: String, required: true},   
        text: {type: String, required: true,},   
    },
    {
        timestamps: true,
    }
)

const Contact = mongoose.model('Contact', contactSchema);
export default Contact;