const mongoose =  require('mongoose');
const { Schema } = mongoose;

const BookingSchema = new Schema(
  {
    cabId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cab",
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    estimatedTime: {
      type: Number,
      required: true,
    },
    estimatedCost: {
      type: Number,
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const booking = mongoose.model("Booking", BookingSchema);

module.exports = booking;