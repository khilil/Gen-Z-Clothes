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
  const [collectionExpanded, setCollectionExpanded] = useState(false);

  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  return (
    <>
      <header className="header fixed top-0 left-0 right-0 z-50">
        <div className="header-inner px-6 md:px-12 flex items-center justify-between">

          {/* LEFT / LOGO */}
          <Link to="/" className="logo">MODERN MEN</Link>

          {/* CENTER - DESKTOP NAV */}
          {!isAccountPage && (
            <nav className="nav-desktop hidden lg:flex items-center gap-8">
              <Link className="nav-anchor" to="/new-arrivals">New Arrivals</Link>

              <div className="nav-dropdown relative group h-full flex items-center">
                <span className="nav-link nav-link-icon cursor-pointer flex items-center gap-1">
                  Shop <FiChevronDown size={14} />
                </span>

                <div className="dropdown-menu absolute top-full left-0 bg-black border border-white/10 py-4 min-w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  {categories.map(cat => (
                    <Link
                      key={cat.id}
                      className="nav-anchor block px-6 py-2 hover:bg-white/5"
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

          {/* RIGHT ACTIONS */}
          <div className="header-actions flex items-center gap-4">
            <button className="icon-btn">
              <FiSearch />
            </button>

            {!isAccountPage && (
              <Link to="/login" className="icon-btn hidden md:block">
                <FiUser />
              </Link>
            )}


            {!isAccountPage && (
              <button
                className="icon-btn cart-btn relative"
                onClick={() => setCartOpen(true)}
              >
                <FiShoppingBag />
                {cart.length > 0 && (
                  <span className="cart-count">{cart.length}</span>
                )}
              </button>
            )}

            {isAccountPage && (
              <div className="account-avatar-wrapper">
                <div className="account-avatar">
                  <span>JD</span>
                </div>
              </div>
            )}

            {/* MOBILE MENU BUTTON */}
            <button
              className="icon-btn lg:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <FiMenu size={24} />
            </button>
          </div>
        </div>
      </header>

      <MiniCart open={cartOpen} onClose={() => setCartOpen(false)} />

      {/* MOBILE DRAWER OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] transition-opacity duration-300 lg:hidden ${mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* MOBILE DRAWER */}
      <aside className={`fixed top-0 right-0 h-screen w-[80vw] max-w-sm bg-black z-[70] border-l border-white/10 transform transition-transform duration-500 ease-in-out lg:hidden ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-6 flex justify-end">
          <button className="icon-btn" onClick={() => setMobileOpen(false)}>
            <FiX size={28} />
          </button>
        </div>

        <nav className="mobile-nav px-8 flex flex-col gap-6">
          <Link className="mobile-anchor text-lg uppercase tracking-widest border-b border-white/5 pb-4" to="/new-arrivals" onClick={() => setMobileOpen(false)}>
            New Arrivals
          </Link>

          <div className="border-b border-white/5 pb-4">
            <button
              className="mobile-anchor text-lg uppercase tracking-widest w-full flex justify-between items-center"
              onClick={() => setCollectionExpanded(!collectionExpanded)}
            >
              Shop <FiChevronDown className={`transition-transform ${collectionExpanded ? 'rotate-180' : ''}`} />
            </button>

            <div className={`overflow-hidden transition-all duration-300 ${collectionExpanded ? 'max-h-[500px] mt-4' : 'max-h-0'}`}>
              <div className="flex flex-col gap-4 pl-4">
                {categories.map(cat => (
                  <Link
                    key={cat.id}
                    className="text-sm text-gray-400 uppercase tracking-wider"
                    to={`/category/${cat.slug}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link className="mobile-anchor text-lg uppercase tracking-widest border-b border-white/5 pb-4" to="/about" onClick={() => setMobileOpen(false)}>
            About
          </Link>

          <Link className="mobile-anchor text-lg uppercase tracking-widest border-b border-white/5 pb-4 md:hidden" to="/account/dashboard" onClick={() => setMobileOpen(false)}>
            Account
          </Link>
        </nav>
      </aside>
    </>
  );
}