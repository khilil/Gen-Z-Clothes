import { useEffect, useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllCategories } from "../../../services/categoryService";
import { useCart } from "../../../context/CartContext";
import MiniCart from "../../../pages/Cart/MiniCart";
import "./Header.css";

export default function Header() {
  const location = useLocation();
  const isAccountPage = location.pathname.startsWith("/account");

  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { cart } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  // Get current user from Redux
  const { user } = useSelector((state) => state.auth);

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

    // 1. Get Root Categories (Headings)
    const roots = categories.filter(c => !c.parentCategory);

    // 2. Map children to each root
    return roots.map(root => ({
      ...root,
      children: categories.filter(c =>
        (typeof c.parentCategory === 'string' ? c.parentCategory === root._id : c.parentCategory?._id === root._id)
      )
    })).slice(0, 4); // Show max 4 columns to leave room for Promo
  }, [categories]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[100] bg-black/90 backdrop-blur-2xl border-b border-white/5 h-20">
        <div className="max-w-[1920px] mx-auto h-full px-6 md:px-12 flex items-center justify-between relative">

          {/* LOGO */}
          <div className="z-50 shrink-0">
            <Link className="text-xl md:text-2xl font-impact tracking-tighter text-white hover:text-accent transition-colors" to="/">MODERN MEN</Link>
          </div>

          {/* DESKTOP NAV */}
          {!isAccountPage && (
            <nav className="hidden lg:flex items-center gap-10 h-full">
              <Link className="nav-link text-[10px] font-black uppercase tracking-[0.3em]" to="/new-arrivals">
                New Arrivals
              </Link>

              <div className="mega-menu-trigger group h-full flex items-center">
                <span className="nav-link text-[10px] font-black uppercase tracking-[0.3em] cursor-default">
                  Clothing
                </span>

                {/* MEGA MENU */}
                <div className="mega-menu">
                  <div className="max-w-[1920px] mx-auto grid grid-cols-5 gap-0 min-h-[500px]">

                    {isLoading ? (
                      // Skeleton Loading
                      Array(4).fill(0).map((_, i) => (
                        <div key={i} className="p-12 border-r border-white/5 animate-pulse">
                          <div className="h-4 w-24 bg-white/10 mb-8 rounded"></div>
                          <div className="space-y-4">
                            <div className="h-3 w-32 bg-white/5 rounded"></div>
                            <div className="h-3 w-28 bg-white/5 rounded"></div>
                            <div className="h-3 w-36 bg-white/5 rounded"></div>
                          </div>
                        </div>
                      ))
                    ) : menuGroups.length > 0 ? (
                      // Dynamic Columns
                      menuGroups.map(group => (
                        <div key={group._id} className="p-12 border-r border-white/5 flex flex-col">
                          <h4 className="text-accent text-[11px] font-black uppercase tracking-[0.4em] mb-8">
                            <Link to={`/category/${group.slug}`} className="hover:text-white transition-colors">
                              {group.name}
                            </Link>
                          </h4>
                          <ul className="space-y-4">
                            {group.children.map(child => (
                              <li key={child._id}>
                                <Link className="text-[14px] text-white-80 hover:text-accent transition-colors" to={`/category/${child.slug}`}>
                                  {child.name}
                                </Link>
                              </li>
                            ))}
                            {group.children.length === 0 && (
                              <li className="text-[13px] text-white/30 italic">No sub-items</li>
                            )}
                          </ul>
                        </div>
                      ))
                    ) : (
                      // Ultimate Fallback if DB is empty
                      <>
                        <div className="p-12 border-r border-white/5 flex flex-col">
                          <h4 className="text-accent text-[11px] font-black uppercase tracking-[0.4em] mb-8">Topwear</h4>
                          <ul className="space-y-4">
                            <li><Link className="text-[14px] text-white-80 hover:text-accent transition-colors" to="/category/t-shirts">T-Shirts</Link></li>
                            <li><Link className="text-[14px] text-white-80 hover:text-accent transition-colors" to="/category/shirts">Shirts</Link></li>
                          </ul>
                        </div>
                        <div className="p-12 border-r border-white/5 flex flex-col" />
                        <div className="p-12 border-r border-white/5 flex flex-col" />
                        <div className="p-12 border-r border-white/5 flex flex-col" />
                      </>
                    )}

                    {/* PROMO BOX (ALWAYS COLUMN 5) */}
                    <div className="relative overflow-hidden group/promo">
                      <img alt="Model in Atelier" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxCDaHXAgfnZZMJ5PJyJlJu2htQPWM6diBOxWwEZCVgRqK2NioQJtdBpkA898DJ8jaVUX8zXqiqMulmIS-p9A6Vvw60YVvk7uOoV_7doTOJ1sNlbE0RcmuvhwJ2LrbI9PBFadnFpLV-RUa4tq9StHqLjSSOJHeeWnbhzilO_f0RDPVlLJFH-Gjgj2ltfyvxQ9Enril9a9C-hcpECVdFnYR7c4QcBOmkqdxTf4IDpIVmtgWbA9rPF_OT7g9mJuNlKudYCzeL9_ieJpz" />
                      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-8">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-white">The Atelier Series</p>
                        <h5 className="text-2xl font-impact tracking-tight mb-6 text-white">SS24 EDITORIAL</h5>
                        <Link className="px-8 py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-accent transition-colors" to="/shop">Shop Now</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Link className="nav-link text-[10px] font-black uppercase tracking-[0.3em]" to="/shoes">Shoes</Link>
              <Link className="nav-link text-[10px] font-black uppercase tracking-[0.3em]" to="/accessories">Accessories</Link>
              <Link className="nav-link text-[10px] font-black uppercase tracking-[0.3em]" to="/collections">Collections</Link>
              <Link className="nav-link text-[10px] font-black uppercase tracking-[0.3em] text-accent" to="/sale">Sale</Link>
            </nav>
          )}

          {/* ACTIONS */}
          <div className="flex items-center gap-4 md:gap-6 z-50">
            <button className="flex items-center">
              <span className="material-symbols-outlined text-[24px]">search</span>
            </button>

            {user ? (
              <Link to="/account/dashboard" className="hidden md:block">
                <div className="account-avatar">
                  <span>{getInitials(user.name)}</span>
                </div>
              </Link>
            ) : (
              <Link to="/login" className="hidden md:block flex items-center">
                <span className="material-symbols-outlined text-[24px]">person</span>
              </Link>
            )}

            <button
              className="relative flex items-center"
              onClick={() => setCartOpen(true)}
            >
              <span className="material-symbols-outlined text-[24px]">shopping_cart</span>
              <span className="absolute -top-1 -right-1 bg-white text-black text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            </button>
          </div>
        </div>
      </header>

      <MiniCart open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
