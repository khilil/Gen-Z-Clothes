import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiSearch,
  FiUser,
  FiShoppingBag,
  FiMenu,
  FiChevronDown,
  FiX
} from "react-icons/fi";
import { fetchCategories } from "../../../api/categories.api";
import { useCart } from "../../../context/CartContext";
import MiniCart from "../../../pages/Cart/MiniCart";
import "./Header.css";

export default function Header() {
  const location = useLocation();
  const isAccountPage = location.pathname.startsWith("/account");

  const [mobileOpen, setMobileOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const { cart } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  return (
    <>
      <header className="header">
        <div className="header-inner">

          {/* LEFT */}
            <Link to="/" className="logo">MODERN MEN</Link>
          <div className="header-left">

            {!isAccountPage && (
              <nav className="nav-desktop">
                <Link className="nav-anchor">New Arrivals</Link>
                <div className="nav-dropdown">
                  <span className="nav-link nav-link-icon">
                    Shop <FiChevronDown size={14} />
                  </span>

                  <div className="dropdown-menu">
                    {categories.map(cat => (
                      <Link
                        key={cat.id}
                        className="nav-anchor"
                        to={`/category/${cat.slug}`}
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <Link className="nav-anchor" to="/about">ABOUT</Link>
              </nav>
            )}
          </div>

          {/* RIGHT */}
          <div className="header-actions">
            <button className="icon-btn">
              <FiSearch />
            </button>

            {!isAccountPage && (
              <Link to="/account/dashboard" className="icon-btn desktop-only">
                <FiUser />
              </Link>
            )}

            {!isAccountPage && (
              <button
                className="icon-btn cart-btn"
                onClick={() => setCartOpen(true)}
              >
                <FiShoppingBag />
                {cart.length > 0 && (
                  <span className="cart-count">{cart.length}</span>
                )}
              </button>
            )}

            {isAccountPage && (
              <div
                className="account-avatar-wrapper"
              // onClick={() => setSidebarOpen(true)}
              >
                <div className="account-avatar">
                  <span>JD</span>
                </div>
              </div>
            )}


            <button
              className="icon-btn hamburger"
              onClick={() => setMobileOpen(true)}
            >
              <FiMenu />
            </button>
          </div>
        </div>
      </header>

      <MiniCart open={cartOpen} onClose={() => setCartOpen(false)} />

      {mobileOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside className={`mobile-drawer ${mobileOpen ? "open" : ""}`}>
        <button
          className="mobile-close-btn"
          onClick={() => setMobileOpen(false)}
        >
          <FiX />
        </button>

        <nav className="mobile-nav">
          {categories.map(cat => (
            <Link
              key={cat.id}
              className="mobile-anchor"
              to={`/category/${cat.slug}`}
              onClick={() => setMobileOpen(false)}
            >
              {cat.name}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
