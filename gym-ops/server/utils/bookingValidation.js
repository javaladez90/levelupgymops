const Booking = require("../models/Booking");

/**
 * Checks whether a proposed booking violates facility rules.
 * 
 * Business rules:
 * - max 3 overlapping client_session bookings
 * - max 2 overlapping class bookings
 * 
 * @param {object} bookingData
 * @param {string} bookingData
 * @param {Date} bookingData.start
 * @param {Date} bookingData.end
 * @param {Object} validation result
 */

async function validateBookingCapacity({ bookingType, start, end }) {
    //Find all existing bookings of the same type that overlap the requested time
    const overlappingBookings = await Booking.find({
        bookingType,
        start: { $lt: end },
        end: { $gt: start },
    });

    let maxAllowed = 0;

    if (bookingType === "client_session") {
        maxAllowed = 3;
    } else if (bookingType === "class") {
        maxAllowed = 2;
    } else {
        return {
            allowed: false,
            message: "Invalid booking type.",
        };
    }

    if (overlappingBookings.length >= maxAllowed) {
        return {
            allowed: false,
            message:
                bookingType === "client_session"
                ? "Trainer limit reached: Only 3 trainers can train clients at the same time"
                : "Class limit reached: Only 2 classes can run at the same time.",
        };
    }

    return {
        allowed: true,
        message: "Booking is allowed.",
    };
}

module.exports = {
    validateBookingCapacity,
};