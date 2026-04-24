import { NavLink } from "react-router-dom";
function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="sidebar-brand">
                <h2>GymOps</h2>
                <p>Level Up Fitness PowerHouse</p>
            </div>

            <nav className="sidebar-nav">
                <NavLink to="/" end className="nav-link">
                    Dashboard
                </NavLink>
                <NavLink to="/bookings" className="nav-link">
                    Bookings
                </NavLink>
                <NavLink to="bookings/new" className="nav-link">
                    Create Booking
                </NavLink>
                <NavLink to="trainers" className="nav-link">
                    Trainers
                </NavLink>
                <NavLink to="/calendar" className="nav-link">
                    Calendar
                </NavLink>
            </nav>
        </aside>
    );
}

export default Sidebar;