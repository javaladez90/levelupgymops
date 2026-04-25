const API_BASE_URL = "http://localhost:5000/api/bookings";

export async function fetchBookings() {
    const response = await fetch(API_BASE_URL);

    if (!response.ok) {
        throw new Error("Failed to fetch bookings.");
    }

    return await response.json();
}

export async function createBooking(bookingData) {
    const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || `Failed to create booking: ${response.status}`);
    }

    return data;
}