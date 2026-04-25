

function Bookings({ bookings }) {
    return (
        <div>
            <h2>Bookings</h2>

            <div className="table-card">
                <table className="bookings-table">
                    <thead>
                        <tr>
                            <th>Trainer</th>
                            <th>Type</th>
                            <th>Title</th>
                            <th>Client</th>
                            <th>Start</th>
                            <th>End</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking.id}>
                                <td>{booking.trainerName}</td>
                                <td>{booking.bookingType}</td>
                                <td>{booking.title}</td>
                                <td>{booking.clientName || "-"}</td>
                                <td>{booking.start}</td>
                                <td>{booking.end}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Bookings;