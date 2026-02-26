import { useEffect, useState } from "react";
import * as orderService from "../../services/orderService";
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await orderService.getMyOrders();
      setOrders(res.data);
    } catch (error) {
      console.error("Fetch orders failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    try {
      await orderService.cancelOrder(orderId);
      fetchOrders(); // refresh
    } catch (error) {
      alert(error.message || "Failed to cancel order");
    }
  };

  if (isLoading) {
    return (
      <div className="orders-page flex items-center justify-center py-20">
        <div className="animate-pulse text-accent uppercase tracking-widest font-black">Loading Archive...</div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <header className="orders-header">
        <div>
          <h2 className="orders-title">My Orders History</h2>
          <p className="orders-subtitle">Review and track your recent purchases</p>
        </div>
      </header>

      {orders.length === 0 ? (
        <div className="py-20 text-center border-t border-white/5">
          <p className="text-white/20 uppercase tracking-[0.3em] text-xs">No orders found in your timeline.</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-card-top">
                <div className="order-meta">
                  <div>
                    <p>Order Date</p>
                    <span>{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </div>
                  <div>
                    <p>Order ID</p>
                    <span>#{order._id.slice(-8).toUpperCase()}</span>
                  </div>
                  <div>
                    <p>Total Amount</p>
                    <strong>₹{order.totalAmount}</strong>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className={`order-status ${order.orderStatus.toLowerCase()}`}>
                    {order.orderStatus.toUpperCase()}
                  </span>
                  {order.orderStatus === "placed" && (
                    <button
                      onClick={() => handleCancelOrder(order._id)}
                      className="text-[10px] text-red-500 font-black uppercase tracking-widest border-b border-red-500/20 pb-1"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>

              <div className="order-card-bottom">
                <div className="order-info">
                  <div className="flex gap-4 overflow-x-auto no-scrollbar py-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex-shrink-0 text-[10px] font-bold uppercase tracking-widest text-white/60 bg-white/5 px-3 py-1 border border-white/5 rounded-full">
                        {item.quantity}x {item.product?.title || "Item"}
                      </div>
                    ))}
                  </div>
                  <p className="mt-2 text-[10px] text-white/30 uppercase tracking-widest">
                    Status updated: {new Date(order.updatedAt).toLocaleTimeString()}
                  </p>
                </div>

                <div className="order-actions">
                  <button className="btn-outline">View Protocol</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
