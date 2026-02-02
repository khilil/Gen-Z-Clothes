import { useEffect, useState, useRef } from "react";
import {
  FiSearch,
  FiUser,
  FiShoppingBag,
  FiMenu,
  FiChevronDown,
  FiChevronUp,
  FiHelpCircle,
  FiX
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { fetchCategories } from "../../../api/categories.api";
import "./Header.css";
import { useCart } from "../../../context/CartContext";
import MiniCart from "../../../pages/Cart/MiniCart";


export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collectionOpen, setCollectionOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  /* inside Header */
  const { cart } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  return (
    <>
      {/* HEADER */}
      <header className="header">
        <div className="header-inner">
          <Link to="/" className="logo">
            <div className="logo" >MODERN MEN</div>
          </Link>
          {/* DESKTOP NAV */}
          <nav className="nav-desktop">
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

            <a className="nav-anchor" href="#">ABOUT</a>
          </nav>

          {/* ACTIONS */}
          <div className="header-actions">
            <button className="icon-btn"><FiSearch /></button>
            <button className="icon-btn desktop-only"><FiUser /></button>

            {  /* button Cart*/}
            <button
              className="icon-btn cart-btn"
              onClick={() => setCartOpen(true)}
            >
              <FiShoppingBag />
              {cart.length > 0 && (
                <span className="cart-count">{cart.length}</span>
              )}
            </button>

            <button
              className="icon-btn hamburger"
              onClick={() => setMobileOpen(true)}
            >
              <FiMenu />
            </button>
          </div>
        </div>
        {/* ✅ MINI CART — HEADER NI BAHAR, BUT JSX MA */}
        <MiniCart
          open={cartOpen}
          onClose={() => setCartOpen(false)}
        />
      </header>

      {/* OVERLAY */}
      {mobileOpen && (
        <div className="mobile-overlay" onClick={() => setMobileOpen(false)} />
      )}

      {/* MOBILE DRAWER */}
      <aside className={`mobile-drawer ${mobileOpen ? "open" : ""}`}>
        <button
          className="mobile-close-btn"
          onClick={() => setMobileOpen(false)}
        >
          <FiX />
        </button>

        <nav className="mobile-nav">
          <button
            className="accordion-btn"
            onClick={() => setCollectionOpen(!collectionOpen)}
          >
            Categories {collectionOpen ? <FiChevronUp /> : <FiChevronDown />}
          </button>

          {collectionOpen && (
            <div className="accordion-content">
              {categories.map(cat => (
                <Link
                  key={cat.id}
                  to={`/category/${cat.slug}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          )}

          <a className="nav-anchor" href="#">ABOUT</a>

          <div className="mobile-footer">
            <a className="mobile-footer-link" href="#"><FiUser /> Account</a>
            <a className="mobile-footer-link" href="#"><FiHelpCircle /> Support</a>
          </div>
        </nav>
      </aside>
    </>
  );
}
