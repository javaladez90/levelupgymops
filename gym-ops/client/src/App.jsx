import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import CreateBooking from "./pages/CreateBooking";
import Trainers from "./pages/Trainers";
import Calendar from "./pages/Calendar";
import { mockTrainers } from "./data/mockTrainers";
import { fetchBookings, createBooking } from "./services/bookingService";

function App() {
  const [bookings, setBookings] = useState([]);
  const [trainers, setTrainers] = useState(mockTrainers);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBookings() {
      try {
        const data = await fetchBookings();
        setBookings(data);
      } catch (error) {
        console.error("Error loading bookings:", error.message);
      } finally {
        setLoading(false);
      }
    }

    loadBookings();
  }, []);

  function addTrainer(newTrainer) {
    setTrainers((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...newTrainer,
      },
    ]);
  }

  async function addBooking(newBooking) {
    try {
      const createdBooking = await createBooking(newBooking);

      setBookings((prevBookings) => [...prevBookings, createdBooking]);

      return {
        isValid: true,
        message: "Booking added successfully.",
      };
    } catch (error) {
      return {
        isValid: false,
        message: error.message,
      };
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route
            path="bookings"
            element={<Bookings bookings={bookings} loading={loading} />}
          />
          <Route
            path="bookings/new"
            element={<CreateBooking addBooking={addBooking} trainers={trainers} />}
          />
          <Route
            path="trainers"
            element={<Trainers trainers={trainers} addTrainer={addTrainer} />}
          />
          <Route
            path="calendar"
            element={<Calendar bookings={bookings} loading={loading} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;