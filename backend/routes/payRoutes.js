import Razorpay from "razorpay";
import express from "express";

// Razorpay Setup

const payRouter = express.Router();

payRouter.post("/", async (req, res) => {
//   console.log('hello from backend');
// console.log(req.body);
  try {
    // console.log('hello from try');
    const instance = new Razorpay({
      key_id: process.env.REACT_APP_RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    // console.log('instance');

    const { booking_id, charge, payment_capture, currency } = req.body;
    // console.log(amount);
    // console.log(amount*100);

    const options = {
      amount: charge * 100,
      currency: currency,
      receipt: booking_id,
      payment_capture: payment_capture,
    };

    const order = await instance.orders.create(options);
    if (!order) {
      return res.status(500).send("Something occured");
    }

    res.status(200).json({ success: true, data: order });
    // console.log(req.body);
  } catch (error) {
    console.log(error);
  }
});

export default payRouter;