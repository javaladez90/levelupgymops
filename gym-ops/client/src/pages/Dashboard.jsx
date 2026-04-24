function Dashboard() {
    return (
        <div>
            <h2>Dashboard</h2>
            <div className="card-grid">
                <div className="card">
                    <h3>Facility Rules</h3>
                    <p>Maximum 3 trainers training clients at one time</p>
                    <p>Maximum 2 classes at one time.</p>
                </div>

                <div className="card">
                    <h3>Today's Focus</h3>
                    <p>Monitor bookings, trainer activity, and class capacity.</p>
                </div>

                <div className="card">
                    <h3>Status</h3>
                    <p>Frontend setup in progress for gymops.</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;