import mongoose from "mongoose";

const counsellorSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },
        bio: {type: String, required: true,},
        rating: {type: Number, required: true,},   
        charge: {type: Number, required: true,},   
       
    },
    {
        timestamps: true,
    }
)

const Counsellor = mongoose.model('Counsellor', counsellorSchema);
export default Counsellor;