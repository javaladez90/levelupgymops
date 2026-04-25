function formatDateTime(dateString) {
  const date = new Date(dateString);

  return date.toLocaleString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function Bookings({ bookings, loading }) {
  return (
    <div>
      <h2>Bookings</h2>

      {loading ? (
        <div className="card">
          <p>Loading bookings...</p>
        </div>
      ) : (
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
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan="6">No bookings found.</td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking._id || booking.id}>
                    <td>{booking.trainerName}</td>
                    <td>{booking.bookingType}</td>
                    <td>{booking.title}</td>
                    <td>{booking.clientName || "—"}</td>
                    <td>{formatDateTime(booking.start)}</td>
                    <td>{formatDateTime(booking.end)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Bookings;