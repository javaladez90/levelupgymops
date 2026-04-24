import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import CreateBooking from "./pages/CreateBooking";
import Trainers from "./pages/Trainers";
import Calendar from "./pages/Calendar";
import "./styles/app.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard/>} />
                    <Route path="bookings" element={<Bookings />} />
                    <Route path="bookings/new" element={<CreateBooking />} />
                    <Route path="trainers" element={<Trainers />} />
                    <Route path="calendar" element={<Calendar />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;