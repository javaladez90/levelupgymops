const mongoose = require("mongoose");

/*
  This schema represents one scheduled item in the gym.

  bookingType:
  - "client_session" = trainer working with a client
  - "class" = trainer running a class

  We store start and end as Date objects so MongoDB can compare times correctly.
*/

const bookingSchema = new mongoose.Schema(
  {
    trainerName: {
      type: String,
      required: true,
      trim: true,
    },
    bookingType: {
      type: String,
      required: true,
      enum: ["client_session", "class"],
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    clientName: {
      type: String,
      trim: true,
      default: "",
    },
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
    notes: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);