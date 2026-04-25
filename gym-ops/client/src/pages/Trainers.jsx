import { useState } from "react";
import { mockTrainers } from "../data/mockTrainers";

function Trainers() {
    const [trainers, setTrainers] = useState(mockTrainers);
    const [formData, setFormData] = useState({
        name: "",
        specialty: "",
        status: "Active",
        email: "",
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

        const newTrainer = {
            id: Date.now(),
            ...formData,
        };

        setTrainers((prev) => [...prev, newTrainer]);

        setFormData({
            name: "",
            specialty: "",
            status: "Active",
            email: "",
        });
    }

    return (
        <div>
            <h2>Trainers</h2>

            <form className="booking-form" onSubmit={handleSubmit}>
                <label>
                    Name
                    <input 
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Specialty 
                    <input
                        type="text"
                        name="specialty"
                        value={formData.specialty}
                        onChange={handleChange}
                        required 
                    />
                </label>

                <label>
                    Status 
                    <select 
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </label>

                <label>
                    Email 
                    <input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </label>

                <button type="submit">Add Trainer</button>
            </form>

            <div className="card-grid">
                {trainers.map((trainer) => (
                    <div className="card" key={trainer.id}>
                        <h3>{trainer.name}</h3>
                        <p><strong>Specialty:</strong> {trainer.specialty}</p>
                        <p><strong>Status:</strong> {trainer.status}</p>
                        <p><strong>Email:</strong> {trainer.email}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Trainers;