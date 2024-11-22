import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/" style={{ textDecoration: "none" }}>
        <h1 className="navbar-title">CV Compass</h1>
      </Link>
    </div>
  );
};

export default Navbar;
