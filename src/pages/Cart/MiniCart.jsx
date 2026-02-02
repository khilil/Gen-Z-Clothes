import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./MiniCart.css";

export default function MiniCart({ open, onClose }) {
  const { cart, updateQty, removeItem } = useCart();
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const goToCheckout = () => {
    onClose();          // mini cart close
    navigate("/checkout"); // checkout page open
  };

  return (
    <div
      className={`mini-cart-overlay ${open ? "show" : ""}`}
      onClick={onClose}
    >
      <aside
        className="mini-cart"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="mini-cart-header">
          <h2 className="mini-cart-title">
            MINI BAG ({cart.length})
          </h2>

          <button onClick={onClose} className="close-btn">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* ITEMS */}
        <div className="mini-cart-body custom-scrollbar">
          {cart.map(item => (
            <div key={item.id} className="mini-item">
              <div className="mini-thumb">
                <img src={item.image} alt={item.title} />
              </div>

              <div className="mini-info">
                <div className="mini-row">
                  <h4>{item.title}</h4>
                  <span>${item.price}.00</span>
                </div>

                <p className="mini-meta">Size: {item.size}</p>

                <div className="mini-actions">
                  <div className="qty-box">
                    <button onClick={() => updateQty(item.id, -1)}>
                      <span className="material-symbols-outlined">remove</span>
                    </button>

                    <span>{item.qty}</span>

                    <button onClick={() => updateQty(item.id, 1)}>
                      <span className="material-symbols-outlined">add</span>
                    </button>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="mini-cart-footer">
          <div className="subtotal-row">
            <span>Subtotal</span>
            <span className="subtotal-price">
              ${subtotal.toFixed(2)}
            </span>
          </div>

          <button
            className="checkout-btn"
            onClick={goToCheckout}
          >
            View Bag & Checkout
          </button>

          <p className="tax-note">
            Shipping & taxes calculated at checkout
          </p>
        </div>
      </aside>
    </div>
  );
}
