import { useEffect, useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllCategories } from "../../../services/categoryService";
import { useCart } from "../../../context/CartContext";
import MiniCart from "../../../pages/Cart/MiniCart";
import { motion, AnimatePresence } from "framer-motion";
import "./Header.css";

export default function Header({ forceSolid = false }) {
  const location = useLocation();
  const isAccountPage = location.pathname.startsWith("/account");

  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { cart } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Generate initials
  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0]?.toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  useEffect(() => {
    setIsLoading(true);
    getAllCategories().then((res) => {
      setCategories(res.data || []);
    }).catch(err => console.error("Header fetch error:", err))
      .finally(() => setIsLoading(false));
  }, []);

  // Dynamic Grouping Logic
  const menuGroups = useMemo(() => {
    if (!categories.length) return [];
    const roots = categories.filter(c => !c.parentCategory);
    return roots.map(root => ({
      ...root,
      children: categories.filter(c =>
        (typeof c.parentCategory === 'string' ? c.parentCategory === root._id : c.parentCategory?._id === root._id)
      )
    })).slice(0, 4);
  }, [categories]);

  const headerBgClass = isMobileMenuOpen
    ? 'bg-black'
    : (scrolled || forceSolid)
      ? 'bg-black/80 backdrop-blur-3xl h-16 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
      : 'bg-transparent h-24';

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${headerBgClass} border-b border-white/[0.03]`}>
        <div className="max-w-[1920px] mx-auto h-full px-6 md:px-12 flex items-center justify-between relative">

          {/* MOBILE BURGER */}
          <div className="lg:hidden z-[110]">
            <button
              className={`menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              <div className="burger-icon">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
          </div>

          {/* LOGO */}
          <div className={`z-[110] transition-all duration-500`}>
            <Link className="text-xl md:text-2xl font-impact tracking-tighter text-white hover:text-accent transition-all hover:scale-105 active:scale-95" to="/" onClick={() => setIsMobileMenuOpen(false)}>FENRIR</Link>
          </div>

          {/* DESKTOP NAV */}
          {!isAccountPage && (
            <nav className="hidden lg:flex items-center gap-10 h-full">
              <Link className="nav-link text-[10px] font-black uppercase tracking-[0.3em] opacity-70 hover:opacity-100 transition-opacity" to="/new-arrivals">
                New Arrivals
              </Link>

              <div className="mega-menu-trigger group h-full flex items-center">
                <span className="nav-link text-[10px] font-black uppercase tracking-[0.3em] cursor-default opacity-70 group-hover:opacity-100 transition-opacity">
                  Clothing
                </span>

                {/* MEGA MENU */}
                <div className="mega-menu">
                  <div className="max-w-[1920px] mx-auto grid grid-cols-5 gap-0 min-h-[500px] border-t border-white/[0.03]">
                    {isLoading ? (
                      Array(4).fill(0).map((_, i) => (
                        <div key={i} className="p-12 border-r border-white/5 animate-pulse">
                          <div className="h-4 w-24 bg-white/10 mb-8 rounded"></div>
                          <div className="space-y-4">
                            <div className="h-3 w-32 bg-white/5 rounded"></div>
                            <div className="h-3 w-28 bg-white/5 rounded"></div>
                          </div>
                        </div>
                      ))
                    ) : (
                      menuGroups.map(group => (
                        <div key={group._id} className="p-12 border-r border-white/5 flex flex-col hover:bg-white/[0.02] transition-colors group/col">
                          <h4 className="text-accent text-[11px] font-black uppercase tracking-[0.4em] mb-8 group-hover/col:translate-x-1 transition-transform">
                            <Link to={`/category/${group.slug}`} className="hover:text-white transition-colors">
                              {group.name}
                            </Link>
                          </h4>
                          <ul className="space-y-4">
                            {group.children.map(child => (
                              <li key={child._id}>
                                <Link className="text-[13px] text-white/40 hover:text-white hover:translate-x-1 inline-block transition-all" to={`/category/${child.slug}`}>
                                  {child.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))
                    )}

                    {/* PROMO BOX */}
                    <div className="relative overflow-hidden group/promo">
                      <img alt="Model in Atelier" className="w-full h-full object-cover grayscale brightness-50 group-hover/promo:scale-110 group-hover/promo:grayscale-0 group-hover/promo:brightness-100 transition-all duration-[2s] ease-out" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxCDaHXAgfnZZMJ5PJyJlJu2htQPWM6diBOxWwEZCVgRqK2NioQJtdBpkA898DJ8jaVUX8zXqiqMulmIS-p9A6Vvw60YVvk7uOoV_7doTOJ1sNlbE0RcmuvhwJ2LrbI9PBFadnFpLV-RUa4tq9StHqLjSSOJHeeWnbhzilO_f0RDPVlLJFH-Gjgj2ltfyvxQ9Enril9a9C-hcpECVdFnYR7c4QcBOmkqdxTf4IDpIVmtgWbA9rPF_OT7g9mJuNlKudYCzeL9_ieJpz" />
                      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-8 backdrop-blur-[2px] group-hover/promo:backdrop-blur-0 transition-all duration-1000">
                        <p className="text-[9px] font-black uppercase tracking-[0.5em] mb-4 text-white/60">The Atelier Series</p>
                        <h5 className="text-3xl font-impact tracking-tighter mb-8 text-white scale-90 group-hover/promo:scale-100 transition-transform duration-1000">SS24<br />EDITORIAL</h5>
                        <Link className="px-10 py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-accent transition-all hover:px-12" to="/shop">Explore</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Link className="nav-link text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2 group/studio" to="/customize">
                <span className="w-1 h-1 bg-accent rounded-full group-hover/studio:animate-ping"></span>
                <span className="text-accent underline underline-offset-[6px] decoration-accent/30 group-hover:decoration-accent transition-all">Studio</span>
              </Link>

              <Link className="nav-link text-[10px] font-black uppercase tracking-[0.3em] text-white/70 hover:text-white" to="/sale">Sale</Link>
            </nav>
          )}

          {/* ACTIONS */}
          <div className="flex items-center gap-2 md:gap-4 z-50">
            <button className="w-10 h-10 flex items-center justify-center hover:bg-white/5 rounded-full transition-colors group">
              <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">search</span>
            </button>

            {user ? (
              <Link to="/account/dashboard" className="hidden md:flex w-10 h-10 items-center justify-center hover:bg-white/5 rounded-full transition-colors">
                <div className="account-avatar scale-90">
                  <span className="text-[10px]">{getInitials(user.name)}</span>
                </div>
              </Link>
            ) : (
              <Link to="/login" className="hidden md:flex w-10 h-10 items-center justify-center hover:bg-white/5 rounded-full transition-colors group">
                <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">person</span>
              </Link>
            )}

            <button
              className="relative w-10 h-10 flex items-center justify-center hover:bg-white/5 rounded-full transition-colors group"
              onClick={() => setCartOpen(true)}
            >
              <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">shopping_cart</span>
              {cart.length > 0 && (
                <span id="cart-count" className="absolute top-2 right-2 bg-accent text-black text-[7px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(197,160,89,0.5)]">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <MiniCart open={cartOpen} onClose={() => setCartOpen(false)} />

      {/* MOBILE MENU DRAWER (Framer Motion) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[101] lg:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 w-full max-w-[320px] h-full bg-[#0a0a0a] z-[105] shadow-2xl lg:hidden flex flex-col border-r border-white/5"
            >
              <div className="drawer-inner p-8 pt-24 space-y-10 h-full overflow-y-auto custom-scrollbar">

                {/* SEARCH BAR */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="relative"
                >
                  <input
                    type="text"
                    placeholder="SEARCH COLLECTION"
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-[10px] font-black tracking-widest text-white focus:border-accent outline-none"
                  />
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-[18px]">search</span>
                </motion.div>

                {/* NAV LINKS */}
                <nav className="flex flex-col gap-6">
                  {['New Arrivals', 'Collections', 'Studio', 'Sale'].map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                    >
                      <Link
                        className={`text-2xl font-impact uppercase tracking-wider transition-colors hover:text-accent ${item === 'Sale' || item === 'Studio' ? 'text-accent' : 'text-white'}`}
                        to={item === 'Studio' ? '/customize' : `/${item.toLowerCase().replace(' ', '-')}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item}
                      </Link>
                    </motion.div>
                  ))}

                  {/* MOBILE ACCORDION (Clothing) */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-4 pt-4 border-t border-white/5"
                  >
                    <span className="text-accent text-[11px] font-black uppercase tracking-[0.4em] block">Clothing</span>
                    <ul className="grid grid-cols-2 gap-x-4 gap-y-4">
                      {isLoading ? (
                        Array(4).fill(0).map((_, i) => (
                          <div key={i} className="h-4 w-20 bg-white/5 rounded animate-pulse"></div>
                        ))
                      ) : categories.filter(c => !c.parentCategory).map(root => (
                        <li key={root._id}>
                          <Link
                            className="text-[13px] text-white/50 hover:text-white uppercase tracking-widest font-black"
                            to={`/category/${root.slug}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {root.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </nav>

                {/* USER ACTIONS */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="pt-8 mt-auto border-t border-white/5"
                >
                  {user ? (
                    <Link to="/account/dashboard" className="flex items-center gap-4 group" onClick={() => setIsMobileMenuOpen(false)}>
                      <div className="account-avatar">
                        <span>{getInitials(user.name)}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Logged In As</span>
                        <span className="text-[14px] text-white font-bold group-hover:text-accent transition-colors">{user.name}</span>
                      </div>
                    </Link>
                  ) : (
                    <Link to="/login" className="flex items-center gap-4 group" onClick={() => setIsMobileMenuOpen(false)}>
                      <span className="material-symbols-outlined text-[32px]">person</span>
                      <span className="text-[14px] font-black text-white uppercase tracking-[0.2em] group-hover:text-accent transition-colors">Sign In</span>
                    </Link>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
