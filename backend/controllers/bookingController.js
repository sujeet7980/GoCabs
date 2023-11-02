const Sib = require("sib-api-v3-sdk");
const Booking = require("../models/bookingModel.js");
const Cab = require("../models/cabModel.js");

function sendEmail(email, htmlContent, subject) {
  var defaultClient = Sib.ApiClient.instance;
  var apiKey = defaultClient.authentications["api-key"];
  apiKey.apiKey =
    process.env.API_KEY;

  const tranEmailApi = new Sib.TransactionalEmailsApi();
  const sender = {
    email: "sujeetk1282@gmail.com",
    name: "GoCabs",
  };

  const receivers = [
    {
      email: email,
    },
  ];
  tranEmailApi
    .sendTransacEmail({
      sender,
      to: receivers,
      subject: subject,
      htmlContent: htmlContent,
    })
    .then(console.log)
    .catch(console.log);
}

const createBooking = async (req, res, next) => {
  const {source, destination,estimatedTime,estimatedCost,cabId}   = req.body;
  const currentDate = new Date();
  const newBooking = new Booking({
    userEmail: req.body.email,
    source,
    destination,
    estimatedTime,
    estimatedCost,
    cabId,
    startTime: currentDate,
    isCompleted: false,
  });

  try {
    const savedBooking = await newBooking.save();
    const cab = await Cab.findById(savedBooking.cabId);
    await Cab.findByIdAndUpdate(savedBooking.cabId, {
      $set: { isActive: false },
    });
    const estimatedCompletionTime = new Date(
      currentDate.getTime() + newBooking.estimatedTime * 60 * 1000
    );
    setTimeout(async () => {
      await Booking.findByIdAndUpdate(savedBooking._id, {
        $set: { isCompleted: true },
      });
      await Cab.findByIdAndUpdate(savedBooking.cabId, {
        $set: { isActive: true },
      });
    }, estimatedCompletionTime - currentDate);

    let htmlContent = `Thank you for booking with GoCabs. Your booking has been confirmed. The details are as follows:<br>
    Source: ${req.body.source}<br>
    Destination: ${req.body.destination}<br>
    Estimated Cost: ${req.body.estimatedCost}<br>
    Vehicle Number: ${cab.vehicleNumber}<br>
    Driver Name: ${cab.driverName}<br>
    Driver Contact Number: ${cab.contactNo}<br>
    Have a safe journey. Enjoy your ride with GoCabs.
    `;
    sendEmail(req.body.email, htmlContent, "Booking Confirmation");
    res.status(201).send(savedBooking);
  } catch (err) {
    next(err);
  }
};

const getBooking = async (req, res, next) => {
  try {
    const bookings = await Booking.find().populate("cabId");

    if (bookings.length === 0) {
      return res.status(404).json({ error: "No bookings found" });
    }

    res.status(200).json(bookings);
  } catch (err) {
    next(err);
  }
};

module.exports = { createBooking, getBooking };
