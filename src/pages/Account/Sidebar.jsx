import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./Sidebar.css";
import { logoutUser } from "../../features/auth/authSlice";

const Sidebar = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await dispatch(logoutUser());
        navigate("/");
        if (onClose) onClose();
    };

    const navLinks = [
        { to: "/account/dashboard", label: "Dashboard", icon: "grid_view" },
        { to: "/account/orders", label: "My Orders", icon: "shopping_cart" },
        { to: "/account/wishlist", label: "Wishlist", icon: "favorite" },
        { to: "/account/addresses", label: "Address Book", icon: "location_on" },
        { to: "/account/profile", label: "Profile Settings", icon: "settings" },
    ];

    return (
        <aside className={`sidebar lg:w-64 flex-shrink-0 ${isOpen ? "open" : ""}`}>
            <div className="sidebar-inner space-y-1 mb-8">
                {navLinks.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        onClick={onClose}
                        className={({ isActive }) =>
                            `sidebar-link flex items-center gap-4 px-6 py-4 rounded-xl transition-all group ${isActive
                                ? "active"
                                : "text-muted hover:bg-gray-50 hover:text-black"
                            }`
                        }
                    >
                        <span className="material-symbols-outlined text-xl">
                            {link.icon}
                        </span>
                        <span className="text-[11px] font-black uppercase tracking-widest">{link.label}</span>
                    </NavLink>
                ))}

                <div className="pt-8 border-t border-gray-100">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-4 px-6 py-4 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    >
                        <span className="material-symbols-outlined text-xl">logout</span>
                        <span className="text-[11px] font-black uppercase tracking-widest">Logout</span>
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;