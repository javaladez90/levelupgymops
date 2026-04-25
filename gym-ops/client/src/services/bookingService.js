const API_BASE_URL = "http://localhost:5000/api/bookings";

export async function fetchBookings() {
    const response = await fetch(API_BASE_URL);

    if (!response.ok) {
        
    }
}