function formatDateLabel(dateString) {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatTimeLabel(dateString) {
  const date = new Date(dateString);

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function groupBookingsByDate(bookings) {
  const grouped = {};

  bookings.forEach((booking) => {
    const dateKey = new Date(booking.start).toDateString();

    if (!grouped[dateKey]) {
      grouped[dateKey] = [];
    }

    grouped[dateKey].push(booking);
  });

  Object.keys(grouped).forEach((dateKey) => {
    grouped[dateKey].sort(
      (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
    );
  });

  return grouped;
}

function Calendar({ bookings }) {
  const groupedBookings = groupBookingsByDate(bookings);
  const sortedDates = Object.keys(groupedBookings).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  return (
    <div>
      <h2>Facility Calendar</h2>
      <p className="calendar-subtitle">
        View trainer sessions and classes grouped by day.
      </p>

      {sortedDates.length === 0 ? (
        <div className="card">
          <p>No bookings scheduled yet.</p>
        </div>
      ) : (
        <div className="calendar-day-list">
          {sortedDates.map((dateKey) => (
            <section className="calendar-day-card" key={dateKey}>
              <div className="calendar-day-header">
                <h3>{formatDateLabel(groupedBookings[dateKey][0].start)}</h3>
                <span>{groupedBookings[dateKey].length} bookings</span>
              </div>

              <div className="calendar-booking-list">
                {groupedBookings[dateKey].map((booking) => (
                  <div className="calendar-booking-item" key={booking.id}>
                    <div className="calendar-time">
                      <strong>{formatTimeLabel(booking.start)}</strong>
                      <span>to {formatTimeLabel(booking.end)}</span>
                    </div>

                    <div className="calendar-details">
                      <div className="calendar-title-row">
                        <h4>{booking.title}</h4>
                        <span
                          className={`booking-badge ${
                            booking.bookingType === "class"
                              ? "badge-class"
                              : "badge-session"
                          }`}
                        >
                          {booking.bookingType === "class"
                            ? "Class"
                            : "Client Session"}
                        </span>
                      </div>

                      <p>
                        <strong>Trainer:</strong> {booking.trainerName}
                      </p>

                      {booking.clientName && (
                        <p>
                          <strong>Client:</strong> {booking.clientName}
                        </p>
                      )}

                      {booking.notes && (
                        <p>
                          <strong>Notes:</strong> {booking.notes}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

export default Calendar;