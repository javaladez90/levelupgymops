import { useState } from "react";

function CreateBooking() {
    const [formData, setFormData] = useState({
        trainerName: "",
        bookingType: "client_session",
        title: "",
        clientName: "",
        start: "",
        end: "",
        notes: "",
    });

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();

        console.log("Booking submitted:", formData);
        alert("Booking saved locally for now. Backend connection will come later.")
    }

    return (
        <div>
            <h2>Create Booking</h2>

            <form className="booking-form" onSubmit={handleSubmit}>
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
                        type="datatime-local"
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