import React, { useContext, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaInstagram, FaFacebook, FaPhoneAlt, FaSearch, FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../contexts/CartContext.jsx";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { toast } from "react-toastify";

export default function Header({ onSearch }) {
  const { items } = useContext(CartContext);
  const { logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [q, setQ] = useState("");

  const cartCount = useMemo(() => items.reduce((s, x) => s + x.qty, 0), [items]);

  const doLogout = () => {
    logout();
    toast.warning("You have logged out.");
    navigate("/login");
  };

  // Don't show header on login page (cleaner look)
  if (location.pathname === "/login") return null;

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top">
      <div className="container py-1">
        <Link className="navbar-brand fw-bold" to="/">
          Travel<span className="text-primary">DZ</span>
        </Link>

        <div className="d-flex align-items-center gap-3">
          <a className="text-dark" href="#" title="Instagram" onClick={(e) => e.preventDefault()}>
            <FaInstagram size={18} />
          </a>
          <a className="text-dark" href="#" title="Facebook" onClick={(e) => e.preventDefault()}>
            <FaFacebook size={18} />
          </a>
          <a className="text-dark" href="#" title="Phone" onClick={(e) => e.preventDefault()}>
            <FaPhoneAlt size={16} />
          </a>

          <div className="input-group input-group-sm d-none d-md-flex" style={{ width: 260 }}>
            <span className="input-group-text bg-white">
              <FaSearch />
            </span>
            <input
              className="form-control"
              placeholder="Find tour..."
              value={q}
              onChange={(e) => {
                const v = e.target.value;
                setQ(v);
                onSearch?.(v);
              }}
            />
          </div>

          <Link className="btn btn-outline-primary position-relative" to="/cart" title="Cart">
            <FaShoppingCart />
            {cartCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartCount}
              </span>
            )}
          </Link>

          <button className="btn btn-sm btn-outline-secondary" onClick={doLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
