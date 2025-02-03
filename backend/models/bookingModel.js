import mongoose from "mongoose";

const bookingSchema = mongoose.Schema(
  {
    
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },
    charge: { type: Number, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    counsellor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Counsellor",
      required: true,
    },

    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isBooked: { type: Boolean, default: true },
    BookedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;