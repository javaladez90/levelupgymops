function bookingsOverlap(startA, endA, startB, endB) {
    return new Date(startA) < new Date(endB) && new Date(endA) > new Date(startB);
}

export function validateBooking(newBooking, existingBooking) {
    const overlappingBookings = existingBooking.filter((booking) =>
        bookingsOverlap(newBooking.start, newBooking.end, booking.start, booking.end)
);

const sameTrainerConflict = overlappingBookings.find(
    (booking) =>
        booking.trainerName.trim().toLowerCase() ===
        newBooking.trainerName.trim().toLowerCase()
);

if (sameTrainerConflict) {
    return {
        isValid: false,
        message: "This trainer already has a booking during that time.",
    };
}

const overlappingClientSessions = overlappingBookings.filter(
    (booking) => booking.bookingType === "client_session"
);

const overlappingClasses = overlappingBookings.filter(
    (booking) => booking.bookingType === "class"
);

if (
    newBooking.bookingType === "client_session" && 
    overlappingClientSessions.length >= 3
) {
    return {
        isValid: false,
        message: "only 3 trainers can train clients at the same time.",
    };
}

if (newBooking.bookingType === "class" && overlappingClasses.length >= 2) {
    return {
        isValid: false,
        message: "Only 2 classes can run at the same time.",
    };
}

return {
    isValid: true,
    message: "Booking is valid",
};
}