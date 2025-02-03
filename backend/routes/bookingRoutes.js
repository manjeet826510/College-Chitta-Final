import express from "express";
import expressAsyncHandler from "express-async-handler";
import { isAdmin, isAuth } from "../utils.js";
import mongoose from "mongoose";
import User from "../models/userModel.js";
import Booking from "../models/bookingModel.js";
import Counsellor from "../models/counsellorModel.js";

const bookingRouter = express.Router();

const PAGE_SIZE = 3;

bookingRouter.get("/details",
  
  expressAsyncHandler(async (req, res) => {
    console.log("/ hit");
    const bookings = await Booking.find()

    res.send(bookings);
  })
);

bookingRouter.get("/admin/list-bookings", isAuth, isAdmin, async (req, res) => {
//   console.log("hello from backend");
//   console.log(req.query);
//   const pageSize = req.query.pageSize || PAGE_SIZE;
//   const page = req.query.page || 1;

  const bookings = await Booking.find()
   
  // console.log(products);
  // console.log(countProducts);
  // console.log(pageSize);
  res.send({ bookings});
});
bookingRouter.get("/counsellor/list-bookings/:id", isAuth, isAdmin, async (req, res) => {
//   console.log("hello from backend");
//   console.log(req.query);
//   const pageSize = req.query.pageSize || PAGE_SIZE;
//   const page = req.query.page || 1;
// console.log(req.params.id);

  const bookings = await Booking.find({counsellor : req.params.id})
   
  // console.log(products);
  // console.log(countProducts);
  // console.log(pageSize);
  res.send({ bookings});
});



bookingRouter.post("/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    // console.log(req.body);
    const newBooking = new Booking({
      charge: req.body.charge,
      counsellor: req.body.counsellor,
      user: req.user._id,
    });
    const booking = await newBooking.save();
    res.status(201).send({ message: "New Booking Created", booking });
  })
);

// bookingRouter.get("/summary/admin",
//   isAuth,
//   isAdmin,
//   expressAsyncHandler(async (req, res) => {
//     // console.log("this route is hitted");

//     const users = await User.aggregate([
//       {
//         $group: {
//           _id: null,
//           numUsers: { $sum: 1 },
//         },
//       },
//     ]);
//     //By using the $group stage in combination with the $sum operator, you can perform various aggregation calculations on your data, such as counting, summing, averaging, etc.,
//     //User= [
//     //   { _id: 1, name: "John" },
//     //   { _id: 2, name: "Alice" },
//     //   { _id: 3, name: "Bob" },
//     //   { _id: 4, name: "Jane" }
//     // ]
//     //users = [
//     //   {
//     //     _id: null,
//     //     numUsers: 4
//     //   }
//     // ]

//     const orders = await Order.aggregate([
//       {
//         $group: {
//           _id: null,
//           numOrders: { $sum: 1 },
//           totalSales: { $sum: `$totalPrice` },
//         },
//       },
//     ]);

//     const dailyOrders = await Order.aggregate([
//       {
//         $group: {
//           _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
//           orders: { $sum: 1 },
//           sales: { $sum: `$totalPrice` },
//         },
//       },
//       {
//         $sort: { _id: 1 },
//       },
//     ]);

//     const productCategories = await Product.aggregate([
//       {
//         $group: {
//           _id: `$category`,
//           count: { $sum: 1 },
//         },
//       },
//     ]);
//     // productCategories = [ {}, {}] two groups formed

//     res.send({ users, orders, dailyOrders, productCategories });
//     // { "users": users, ...}
//   })
// );

bookingRouter.get('/summary/admin', isAuth, isAdmin, async (req, res) => {
    const dailyOrders = await Booking.aggregate([
      {
        $match: { isPaid: true },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$paidAt' } },
          sales: { $sum: '$charge' },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
  
    res.send({ dailyOrders });
  });

  bookingRouter.get('/summary/counsellor', isAuth, async (req, res) => {
    // console.log('/summary/counsellor');
    // console.log(req.user._id);
  
    try {
      // Find the counsellor document associated with the user
      const counsellor = await Counsellor.findOne({ user: req.user._id });
      if (!counsellor) {
        return res.status(404).send({ message: 'Counsellor not found' });
      }
      const counsellorId = counsellor._id;
  
      const dailyOrders = await Booking.aggregate([
        {
          $match: { isPaid: true, counsellor: counsellorId },
        },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$paidAt' } },
            sales: { $sum: '$charge' },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]);
  
      res.send({ dailyOrders });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Error retrieving counsellor summary' });
    }
  });
  

bookingRouter.get("/mine",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    // console.log('Hello from backend');
    // console.log(req.user);
    const bookings = await Booking.find({ user: req.user._id });
    // if(orders){
    //   console.log(orders);
    // }
    // else{
    //   console.log('order is empty');
    // }
    res.send(bookings);
  })
);

bookingRouter.get("/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
      res.status(404).send({ message: "Booking Not Found" });
      return;
    }
    const booking = await Booking.findById(req.params.id).populate({
        path: 'counsellor',
        populate: {
          path: 'user',
          select: 'name email image' // Specify the fields you want to populate
        }
      }).populate("user", "name email image");
    if (booking) {
      res.send(booking);
    } else {
      res.status(404).send({ message: "Booking Not Found" });
    }
  })
);

bookingRouter.put("/:id/pay",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    // console.log(req.body);
    const booking = await Booking.findById(req.params.id);
    if (booking) {
        booking.isPaid = true;
        booking.paidAt = Date.now();
        booking.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };

      const updatedBooking = await booking.save();
      res.send({ message: "Booking Paid", booking: updatedBooking });
    } else {
      res.status(404).send({ message: "Booking Not Found" });
    }
  })
);

export default bookingRouter;