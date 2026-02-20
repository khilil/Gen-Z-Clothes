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

    return (
        <aside className={`sidebar ${isOpen ? "open" : ""}`}>
            <div className="sidebar-inner">

                <h1 className="sidebar-title">My Account</h1>

                <nav className="sidebar-nav">
                    <NavLink to="/account/dashboard" className="nav-item" onClick={onClose}>
                        <span className="material-symbols-outlined">grid_view</span>
                        Dashboard
                    </NavLink>

                    <NavLink to="/account/orders" className="nav-item" onClick={onClose}>
                        <span className="material-symbols-outlined">package_2</span>
                        Order History
                    </NavLink>

                    <NavLink to="/account/wishlist" className="nav-item" onClick={onClose}>
                        <span className="material-symbols-outlined">favorite</span>
                        Wishlist
                    </NavLink>

                    <NavLink to="/account/addresses" className="nav-item" onClick={onClose}>
                        <span className="material-symbols-outlined">location_on</span>
                        Addresses
                    </NavLink>

                    <NavLink to="/account/profile" className="nav-item" onClick={onClose}>
                        <span className="material-symbols-outlined">person</span>
                        Profile Settings
                    </NavLink>

                    <div className="sidebar-divider" />

                    <button className="nav-item logout" onClick={handleLogout}>
                        <span className="material-symbols-outlined">logout</span>
                        Sign Out
                    </button>
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;