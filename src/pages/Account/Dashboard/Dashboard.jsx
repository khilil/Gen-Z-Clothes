import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">

      {/* WELCOME HEADER */}
      <header className="dashboard-header">
        <h1 className="dashboard-title">Welcome back, Vikram!</h1>
        <p className="dashboard-subtitle">
          Here's an overview of your recent activity and account status.
        </p>
      </header>

      {/* STATS */}
      <section className="dashboard-stats">
        <div className="stat-card">
          <span className="material-symbols-outlined stat-icon">package_2</span>
          <span className="stat-meta">Lifetime</span>
          <h3 className="stat-value">12</h3>
          <p className="stat-label">Total Orders</p>
        </div>

        <div className="stat-card">
          <span className="material-symbols-outlined stat-icon">
            local_shipping
          </span>
          <span className="stat-dot" />
          <h3 className="stat-value">01</h3>
          <p className="stat-label">Active Orders</p>
        </div>

        <div className="stat-card">
          <span className="material-symbols-outlined stat-icon">
            favorite_border
          </span>
          <span className="stat-meta">New</span>
          <h3 className="stat-value">08</h3>
          <p className="stat-label">Wishlist Items</p>
        </div>
      </section>

      {/* RECENT ORDERS */}
      <section className="dashboard-section">
        <div className="section-head">
          <h2>Recent Orders</h2>
          <a href="/account/orders">View All Orders</a>
        </div>

        <div className="order-row">
          <div className="order-left">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwsZp-Pn1cf91xCfR0zKcdmcBt88piN2EqmVP9zCCl3Yx0ESZ63MgKxhyhxaFIQpCOEyIa15Iqm4aMMPB_8her15N4ANWbU2CPwY6ECoCf4-9Rfizxu3FWAeZIISVUbRgKZneU-UZhsbxixrWytLLNqlH7PDRkDdZjtTnkqSUAHbMRkc6Mfb1mfBVAxFYjhUaWAPwRZ0uDBiiVRdLxDrRpJy2pRAAM5QjzAgw1T5zZXk7S8Rc3BUrL9aLhcxVFv3Q9Krw26dUDkay1"
              alt="product"
            />
            <div>
              <p className="order-id">Order #MM-90214</p>
              <h4>Premium Oxford Shirt &amp; 1 more</h4>
              <p className="order-date">Placed on 18 Oct, 2024</p>
            </div>
          </div>

          <div className="order-right">
            <div>
              <span className="badge shipped">Shipped</span>
              <p className="small">Arrival by Thu, 24 Oct</p>
            </div>
            <button className="btn-primary">Track Order</button>
          </div>
        </div>
      </section>

      {/* RECENTLY VIEWED */}
      <section className="dashboard-section">
        <h2>Recently Viewed</h2>

        <div className="recent-grid">
          <div className="recent-card">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwsZp-Pn1cf91xCfR0zKcdmcBt88piN2EqmVP9zCCl3Yx0ESZ63MgKxhyhxaFIQpCOEyIa15Iqm4aMMPB_8her15N4ANWbU2CPwY6ECoCf4-9Rfizxu3FWAeZIISVUbRgKZneU-UZhsbxixrWytLLNqlH7PDRkDdZjtTnkqSUAHbMRkc6Mfb1mfBVAxFYjhUaWAPwRZ0uDBiiVRdLxDrRpJy2pRAAM5QjzAgw1T5zZXk7S8Rc3BUrL9aLhcxVFv3Q9Krw26dUDkay1"
              alt=""
            />
            <p className="recent-name">Linen Blazer</p>
            <p className="recent-price">₹8,990</p>
          </div>

          <div className="recent-card">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuANt1UV_27JxD0QhRvqnX5zP1F_g8Cxd5nKWvbq_eMzCTBPe74Z05DHTqm4ZAPp-_5tFfFAJw6Lrh8GJO5E549XCShDl3DslSyTEZPoZDPcRGWAlBowfgvRG3YDkO2eok1vMlgXmDSbCqSlJ38JDIYMQF06t_zYBRukNZCLnQ0CGuhVBJxQDxdYHC6aObPjqxX_6_PjzdP5yUBt7R7XrICDG9I-1U6wVe95Dd7WM0qnqTBIqwYCx2yQ8SXrH5F7qpNqS_o9IieXa0N2"
              alt=""
            />
            <p className="recent-name">Slim Fit Chinos</p>
            <p className="recent-price">₹3,490</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
