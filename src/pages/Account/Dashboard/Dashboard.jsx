import "./Dashboard.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as orderService from "../../../services/orderService";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [stats, setStats] = useState({
    totalOrders: 0,
    activeOrders: 0,
    wishlistItems: 0,
  });
  const [recentOrder, setRecentOrder] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      const res = await orderService.getMyOrders();
      const orders = res.data || [];

      setStats({
        totalOrders: orders.length,
        activeOrders: orders.filter(o => o.orderStatus !== 'delivered' && o.orderStatus !== 'cancelled').length,
        wishlistItems: 5, // Placeholder
      });

      if (orders.length > 0) {
        setRecentOrder(orders[0]);
      }
    } catch (error) {
      console.error("Dashboard data fetch failed:", error);
    }
  };

  return (
    <div className="dashboard">
      {/* 🏛️ WELCOME HEADER */}
      <header className="dashboard-header">
        <h1 className="dashboard-title">
          Greeting, {user?.fullName?.split(" ")[0] || "Patron"}
        </h1>
        <p className="dashboard-subtitle">
          Account Status: Active // Protocol: Authorized
        </p>
      </header>

      {/* 📊 STATS GRID */}
      <section className="dashboard-stats">
        <div className="stat-card">
          <span className="stat-meta">Lifetime Activity</span>
          <span className="material-symbols-outlined stat-icon">database</span>
          <h3 className="stat-value">{stats.totalOrders}</h3>
          <p className="stat-label">Total Archives</p>
        </div>

        <div className="stat-card">
          <span className="stat-meta">In-Transit</span>
          <span className="material-symbols-outlined stat-icon">sensors</span>
          <h3 className="stat-value">{stats.activeOrders}</h3>
          <p className="stat-label">Active Signals</p>
        </div>

        <div className="stat-card">
          <span className="stat-meta">Curation</span>
          <span className="material-symbols-outlined stat-icon">token</span>
          <h3 className="stat-value">{stats.wishlistItems}</h3>
          <p className="stat-label">Wishlist Nodes</p>
        </div>
      </section>

      {/* 📦 RECENT ORDER */}
      <section className="dashboard-section">
        <div className="section-head">
          <h2>Latest Protocol</h2>
          <Link to="/account/orders">Access All Archives</Link>
        </div>

        {recentOrder ? (
          <div className="order-row">
            <div className="order-left">
              <img
                src={recentOrder.items?.[0]?.imageURL || "https://placeholder.com/100"}
                alt="Product"
              />
              <div className="order-content-main">
                <p className="order-id-small">Archive #{recentOrder._id.slice(-8).toUpperCase()}</p>
                <h4>{recentOrder.items?.[0]?.title} {recentOrder.items?.length > 1 && `& ${recentOrder.items.length - 1} More`}</h4>
                <p className="order-date-small font-mono">Timestamp: {new Date(recentOrder.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="order-right">
              <span className="badge-shipped">{recentOrder.orderStatus}</span>
              <Link to="/account/orders" className="track-btn-premium">Trace Package</Link>
            </div>
          </div>
        ) : (
          <p className="text-white/20 text-[10px] uppercase tracking-widest font-black py-10">No recent protocol detected.</p>
        )}
      </section>

      {/* 🖼️ CURATED GRID (Recently Viewed Placeholder) */}
      <section className="dashboard-section">
        <div className="section-head">
          <h2>Identity Context</h2>
          <p className="text-white/10 text-[8px] uppercase tracking-widest font-black self-end mb-1">Recently Synchronized</p>
        </div>

        <div className="recent-grid">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="recent-card">
              <div className="recent-image-wrapper">
                <img src={`https://picsum.photos/seed/${i + 42}/400/600`} alt="Recent" />
              </div>
              <p className="recent-name">Item Node 00{i}</p>
              <p className="recent-price">₹X,XXX</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;