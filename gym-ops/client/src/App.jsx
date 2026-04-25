import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import CreateBooking from "./pages/CreateBooking";
import Trainers from "./pages/Trainers";
import Calendar from "./pages/Calendar";
import { mockBookings } from "./data/mockBookings"
import "./styles/app.css";

function App() {
    const [bookings, setBookings] = useState(mockBookings);

    function addBooking(newBooking) {
        setBookings((prevBookings) => [
            ...prevBookings,
            {
                id: Date.now(),
                ...newBooking,
            },
        ]);
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="bookings" element={<Bookings bookings={bookings} />} />
                    <Route
                        path="bookings/new"
                        element={<CreateBooking addBooking={addBooking} />}
                    />
                    <Route path="trainers" element={<Trainers />} />
                    <Route path="calendar" element={<Calendar />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
    export default App;