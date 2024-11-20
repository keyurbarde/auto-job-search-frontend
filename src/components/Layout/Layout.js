import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./Layout.css";

export default function Layout() {
  return (
    <div>
      <Navbar />
      <div className="outlet-container">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
