import { NavLink } from "react-router-dom";

function Menu(): JSX.Element {
    return (
        <div className="Menu">
			<NavLink to="/home">Home</NavLink>
            <span> | </span>
			<NavLink to="/list">Appointments</NavLink>
            <span> | </span>
			<NavLink to="/insert">Add Appointment</NavLink>
        </div>
    );
}

export default Menu;
