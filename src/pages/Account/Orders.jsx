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
      <div className="orders-page flex items-center justify-center py-20 bg-[#101622] min-h-screen">
        <div className="animate-pulse text-accent uppercase tracking-[0.5em] font-black text-xs">Synchronizing Archive...</div>
      </div>
    );
  }

  const getStatusIndex = (status) => {
    const sequence = ['placed', 'processing', 'shipped', 'delivered'];
    return sequence.indexOf(status.toLowerCase());
  };

  return (
    <div className="orders-page bg-[#101622] min-h-screen px-4 md:px-12 py-20">
      <header className="orders-header">
        <div>
          <h2 className="orders-title">Archives</h2>
          <p className="orders-subtitle">Transaction History & Protocol Trace</p>
        </div>
      </header>

      {orders.length === 0 ? (
        <div className="py-40 text-center">
          <p className="text-white/10 uppercase tracking-[0.5em] text-[10px] font-black">Null Void: No Order Records Detected</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => {
            const currentIdx = getStatusIndex(order.orderStatus);

            return (
              <div key={order._id} className="order-card">
                {/* 🏷️ TOP META SECTION */}
                <div className="order-card-top">
                  <div className="order-meta">
                    <div>
                      <p>Protocol Date</p>
                      <span>{new Date(order.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                    </div>
                    <div>
                      <p>Order Identity</p>
                      <span>#{order._id.slice(-8).toUpperCase()}</span>
                    </div>
                    <div>
                      <p>Total Assets</p>
                      <strong>₹{order.totalAmount.toLocaleString()}</strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <span className="badge-payment">
                      {order.paymentMethod}
                    </span>
                    {order.orderStatus === "placed" && (
                      <button
                        onClick={() => handleCancelOrder(order._id)}
                        className="text-[9px] text-red-500 font-black uppercase tracking-widest border-b border-red-500/20 pb-1 hover:text-red-400 transition-colors"
                      >
                        Abort Order
                      </button>
                    )}
                  </div>
                </div>

                {/* 🛤️ STATUS TRACKER */}
                <div className="status-tracker-container">
                  <div className="status-tracker">
                    {['Placed', 'Processing', 'Shipped', 'Delivered'].map((step, idx) => (
                      <div key={step} className={`status-step ${idx <= currentIdx ? 'completed' : ''} ${idx === currentIdx ? 'active' : ''}`}>
                        <div className="status-dot"></div>
                        <span className="status-label">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 📦 CONTENT SECTION */}
                <div className="order-card-middle">
                  {/* PRODUCTS COLUMN */}
                  <div className="products-column">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-8 group">
                        <div className="w-20 h-24 flex-shrink-0 bg-white/5 overflow-hidden border border-white/5">
                          <img
                            src={item.imageURL || item.product?.images?.[0]?.url}
                            alt={item.title}
                            className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-[12px] font-[Oswald] uppercase tracking-widest text-white leading-tight">
                            {item.title || item.product?.title}
                          </h4>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-[9px] font-black tracking-widest text-white/30 uppercase bg-white/5 px-2 py-0.5 border border-white/5">
                              QTY: {item.quantity}
                            </span>
                            {(item.size || item.color) && (
                              <span className="text-[9px] font-black tracking-widest text-accent/50 uppercase italic">
                                {item.size} / {item.color}
                              </span>
                            )}
                          </div>
                          <p className="mt-4 text-[11px] font-[Oswald] tracking-widest text-white/40">
                            Unit: ₹{(item.priceAtPurchase || item.product?.price || 0).toLocaleString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-[14px] font-[Oswald] text-white">
                            ₹{(item.quantity * (item.priceAtPurchase || item.product?.price || 0)).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* INFO & SUMMARY COLUMN */}
                  <div className="info-column">
                    <div className="info-block">
                      <h5>Target Destination</h5>
                      <div className="info-content">
                        {order.shippingAddress?.fullName}<br />
                        {order.shippingAddress?.addressLine}<br />
                        {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}
                      </div>
                    </div>

                    <div className="order-summary-block">
                      <div className="summary-line">
                        <span>Manifest Total</span>
                        <span>₹{order.totalAmount.toLocaleString()}</span>
                      </div>
                      <div className="summary-line">
                        <span>Logistic Fee</span>
                        <span className="text-accent/60 italic">Free Access</span>
                      </div>
                      <div className="summary-line">
                        <span>Taxation</span>
                        <span>Inclusive</span>
                      </div>
                      <div className="summary-line total">
                        <span>Asset Value</span>
                        <span>₹{order.totalAmount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 📜 BOTTOM ACTIONS */}
                <div className="px-10 py-6 border-t border-white/5 flex justify-between items-center bg-white/[0.01]">
                  <p className="text-[8px] text-white/20 uppercase tracking-[0.3em] font-black">
                    Timestamp: {new Date(order.updatedAt).toLocaleString()}
                  </p>
                  <div className="flex gap-4">
                    <button className="text-[9px] font-black uppercase tracking-widest px-6 py-3 border border-white/10 hover:bg-white hover:text-black transition-all">Support</button>
                    <button className="text-[9px] font-black uppercase tracking-widest px-6 py-3 bg-white/5 border border-white/5 transition-all">Invoice</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Orders;
