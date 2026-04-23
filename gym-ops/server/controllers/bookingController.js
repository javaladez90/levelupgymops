const Booking = require("../models/Booking");
const {
  hasTrainerConflict,
  validateFacilityCapacity,
} = require("../utils/bookingValidation");

/**
 * Create a new booking.
 *
 * Flow:
 * 1. Validate required fields
 * 2. Convert incoming date strings into Date objects
 * 3. Make sure start < end
 * 4. Check whether the same trainer is already booked
 * 5. Check facility capacity rules
 * 6. Save booking
 */
async function createBooking(req, res) {
  try {
    const { trainerName, bookingType, title, clientName, start, end, notes } =
      req.body;

    if (!trainerName || !bookingType || !title || !start || !end) {
      return res.status(400).json({
        message: "trainerName, bookingType, title, start, and end are required.",
      });
    }

    const startDate = new Date(start);
    const endDate = new Date(end);

    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
      return res.status(400).json({
        message: "Invalid date format.",
      });
    }

    if (startDate >= endDate) {
      return res.status(400).json({
        message: "Start time must be before end time.",
      });
    }

    // Prevent the same trainer from being double-booked
    const trainerConflict = await hasTrainerConflict(
      trainerName,
      startDate,
      endDate
    );

    if (trainerConflict) {
      return res.status(409).json({
        message: "This trainer already has a booking during that time.",
      });
    }

    // Check facility-wide booking limits
    const capacityValidation = await validateFacilityCapacity(
      bookingType,
      startDate,
      endDate
    );

    if (!capacityValidation.allowed) {
      return res.status(409).json({
        message: capacityValidation.message,
      });
    }

    const newBooking = await Booking.create({
      trainerName,
      bookingType,
      title,
      clientName,
      start: startDate,
      end: endDate,
      notes,
    });

    return res.status(201).json(newBooking);
  } catch (error) {
    console.error("Error creating booking:", error);

    return res.status(500).json({
      message: "Server error while creating booking.",
    });
  }
}

/**
 * Fetch all bookings sorted by start time.
 */
async function getBookings(req, res) {
  try {
    const bookings = await Booking.find().sort({ start: 1 });

    return res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);

    return res.status(500).json({
      message: "Server error while fetching bookings.",
    });
  }
}

module.exports = {
  createBooking,
  getBookings,
};