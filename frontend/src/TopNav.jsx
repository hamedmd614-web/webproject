import { NavLink } from "react-router-dom";
import { useCart } from "./CartContext";

export default function TopNav() {
  const { totalItems } = useCart();

  return (
    <nav className="top-nav">
      <NavLink to="/" className="nav-logo">
        <span className="logo-icon">🛍️</span>
        <span className="logo-text">SmartZone</span>
      </NavLink>

      <div className="nav-links">
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>

        <NavLink to="/cart" className="nav-link">
          🛒 Cart {totalItems > 0 && `(${totalItems})`}
        </NavLink>

        <NavLink to="/contact" className="nav-link">
          Contact Us
        </NavLink>
      </div>
    </nav>
  );
}
