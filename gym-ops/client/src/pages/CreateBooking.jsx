import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateBooking({ addBooking }) {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        trainerName: "",
        bookingType: "client_session",
        title: "",
        clientName: "",
        start: "",
        end: "",
        notes: "",
    });

    const [errorMessage, setErrorMessage] = useState("")

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();

        setErrorMessage("");

        if (new Date(formData.start) >= new Date(formData.end)) {
            setErrorMessage("Start time must be before end time.");
            return;
        }

        const result = addBooking(formData);

        if (!result.isValid) {
            setErrorMessage(result.message);
            return;
        }

        setFormData({
            trainerName: "",
            bookingType: "client_session",
            title: "",
            clientName: "",
            start: "",
            end: "",
            notes: "",
        });

        navigate("/bookings");
    }

    return (
        <div>
            <h2>Create Booking</h2>

            <form className="booking-form" onSubmit={handleSubmit}>
                {errorMessage && <p className="form-error">{errorMessage}</p>}

                <label>
                    Trainer Name 
                    <input 
                        type="text"
                        name="trainerName"
                        value={FormData.trainerName}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Booking Type 
                    <select 
                        name="bookingType"
                        value={formData.bookingType} 
                        onChange={handleChange}
                    >
                        <option value="client_session">Client Session</option>
                        <option value="class">Class</option>
                    </select>
                </label>

                <label>
                    Title 
                    <input 
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required 
                    />
                </label>

                <label>
                    Client Name 
                    <input 
                        type="text"
                        name="clientName"
                        value={formData.clientName}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Start Time 
                    <input 
                        type="datetime-local"
                        name="start"
                        value={formData.start}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    End Time 
                    <input 
                        type="datetime-local"
                        name="end"
                        value={formData.end}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Notes 
                    <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows="4"
                    />
                </label>

                <button type="submit">Save Booking</button>
            </form>
        </div>
    );
}

export default CreateBooking;