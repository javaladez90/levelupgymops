const Booking = require("../models/Booking");
const { validateBookingCapacity } = require("../utils/bookingValidation");

/**
 * Create a new booking after validating scheduling rules.
 */

async function createBooking(req, res) {
    try {
        const { trainerName, bookingType, title, clientName, start, end, notes } = req.body;

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

        //Capacity validation
        const validation = await validateBookingCapacity({
            bookingType,
            start: startDate,
            end: endDate,
        });

        if (!validation.allowed) {
            return res.status(409).json({
                message: validation.message,
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
        console.error("Create booking error:", error);
        return res.status(500).json({
            message: "Server error while creating booking.",
        });
    }
}

/**
 * Return all bookings.
 */

async function getBookings(req, res) {
    try {
        const bookings = await Booking.find().sort({ start: 1 });
        return res.status(200).json(bookings);
    } catch (error) {
        console.error("Get bookings error:", error);
        return res.status(500).json({
            message: "Server error while fetching bookings.",
        });
    }
}

module.exports = {
    createBooking,
    getBookings,
};