import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h2>GymOps</h2>
        <p>Level Up Fitness</p>
      </div>

      <nav className="sidebar-nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/bookings"
          end
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Bookings
        </NavLink>

        <NavLink
          to="/bookings/new"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Create Booking
        </NavLink>

        <NavLink
          to="/trainers"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Trainers
        </NavLink>

        <NavLink
          to="/calendar"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Calendar
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;