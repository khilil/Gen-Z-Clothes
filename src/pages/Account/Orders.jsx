import "./Orders.css";

const Orders = () => {
  return (
    <div className="orders-page">
      {/* PAGE HEADER */}
      <header className="orders-header">
        <div>
          <h2 className="orders-title">My Orders History</h2>
          <p className="orders-subtitle">
            Review and track your recent purchases
          </p>
        </div>

        <div className="orders-filters">
          <select>
            <option>Sort by: Last 6 Months</option>
            <option>2024</option>
            <option>2023</option>
            <option>2022</option>
          </select>

          <select>
            <option>Status: All Orders</option>
            <option>Delivered</option>
            <option>Shipped</option>
            <option>Processing</option>
            <option>Cancelled</option>
          </select>
        </div>
      </header>

      {/* ORDERS LIST */}
      <div className="orders-list">
        {/* ORDER CARD */}
        <div className="order-card">
          <div className="order-card-top">
            <div className="order-meta">
              <div>
                <p>Order Date</p>
                <span>October 14, 2024</span>
              </div>
              <div>
                <p>Order ID</p>
                <span>#MM-982410-01</span>
              </div>
              <div>
                <p>Total Amount</p>
                <strong>₹13,977.60</strong>
              </div>
            </div>

            <span className="order-status delivered">Delivered</span>
          </div>

          <div className="order-card-bottom">
            <div className="order-info">
              <h4>
                Premium Oxford Shirt, Raw Selvedge Denim, and Italian Silk Tie
              </h4>
              <p>Delivered on Oct 18, 2024</p>
            </div>

            <div className="order-actions">
              <button className="btn-outline">View Details</button>
              <button className="btn-primary">Reorder</button>
            </div>
          </div>
        </div>

        {/* SECOND CARD */}
        <div className="order-card">
          <div className="order-card-top">
            <div className="order-meta">
              <div>
                <p>Order Date</p>
                <span>October 22, 2024</span>
              </div>
              <div>
                <p>Order ID</p>
                <span>#MM-982422-45</span>
              </div>
              <div>
                <p>Total Amount</p>
                <strong>₹8,450.00</strong>
              </div>
            </div>

            <span className="order-status shipped">Shipped</span>
          </div>

          <div className="order-card-bottom">
            <div className="order-info">
              <h4>Hand-Stitched Leather Chelsea Boots</h4>
              <p>Expected Arrival: Thursday, 24 Oct</p>
            </div>

            <div className="order-actions">
              <button className="btn-outline">Track Order</button>
              <button className="btn-outline">View Details</button>
            </div>
          </div>
        </div>
      </div>

      {/* LOAD MORE */}
      <div className="orders-footer">
        <button className="btn-load">Load More Orders</button>
      </div>
    </div>
  );
};

export default Orders;
