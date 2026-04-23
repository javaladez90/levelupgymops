const Booking = require("../models/Booking");

/*
  TIME OVERLAP LOGIC

  Two bookings overlap when:
  newStart < existingEnd AND newEnd > existingStart

  Example:
  Existing: 5:00 - 6:00
  New:      5:30 - 6:30
  Overlap?  Yes
*/

/**
 * Checks whether the same trainer is already booked during the requested time.
 */
async function hasTrainerConflict(trainerName, start, end) {
  const existingBooking = await Booking.findOne({
    trainerName,
    start: { $lt: end },
    end: { $gt: start },
  });

  return !!existingBooking;
}

/**
 * Checks facility-wide capacity rules:
 * - max 3 overlapping client_session bookings
 * - max 2 overlapping class bookings
 */
async function validateFacilityCapacity(bookingType, start, end) {
  const overlappingBookings = await Booking.find({
    bookingType,
    start: { $lt: end },
    end: { $gt: start },
  });

  if (bookingType === "client_session" && overlappingBookings.length >= 3) {
    return {
      allowed: false,
      message:
        "Facility limit reached: only 3 trainers can train clients at the same time.",
    };
  }

  if (bookingType === "class" && overlappingBookings.length >= 2) {
    return {
      allowed: false,
      message:
        "Facility limit reached: only 2 classes can run at the same time.",
    };
  }

  return {
    allowed: true,
    message: "Booking is allowed.",
  };
}

module.exports = {
  hasTrainerConflict,
  validateFacilityCapacity,
};