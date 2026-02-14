import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";



import "./MiniCart.css";
import SaveYourBagModal from "../../components/SaveYourBagModal/SaveYourBagModal";
import AccessCollectiveModal from "../Account/AccessCollectiveModal/AccessCollectiveModal";

export default function MiniCart({ open, onClose }) {
  const navigate = useNavigate();
  const { cart, updateQty, removeItem } = useCart();

  const [showSaveBag, setShowSaveBag] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const increaseQty = (id) => updateQty(id, 1);
  const decreaseQty = (id) => updateQty(id, -1);

  // 🔥 IMPORTANT CHANGE
  const handleCheckout = () => {
    onClose();            // close mini cart
    setShowSaveBag(true); // open Save Your Bag modal
  };

  return (
    <>
      {/* MINI CART */}
      {open && (
      <div
        className="mini-cart-overlay is-open"
        onClick={onClose}
      >
        <aside
          className="mini-cart"
          onClick={(e) => e.stopPropagation()}
        >
          {/* HEADER */}
          <div className="mini-cart__header">
            <h2 className="mini-cart__title">
              MINI BAG ({cart.length})
            </h2>

            <button className="mini-cart__close" onClick={onClose}>
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* BODY */}
          <div className="mini-cart__body custom-scrollbar">
            {cart.length === 0 && (
              <p className="mini-cart__empty">Your bag is empty</p>
            )}

            {cart.map((item) => (
              <div className="mini-item" key={item.id}>
                <div className="mini-item__thumb">
                  <img src={item.image} alt={item.title} />
                </div>

                <div className="mini-item__info">
                  <div className="mini-item__row">
                    <h4 className="mini-item__title">{item.title}</h4>
                    <span className="mini-item__price">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>

                  <p className="mini-item__meta">
                    Size: {item.size}
                  </p>

                  <div className="mini-item__actions">
                    <div className="qty-control">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        disabled={item.qty === 1}
                      >
                        <span className="material-symbols-outlined">
                          remove
                        </span>
                      </button>

                      <span className="qty-control__value">
                        {String(item.qty).padStart(2, "0")}
                      </span>

                      <button onClick={() => increaseQty(item.id)}>
                        <span className="material-symbols-outlined">
                          add
                        </span>
                      </button>
                    </div>

                    <button
                      className="mini-item__remove"
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
          {cart.length > 0 && (
            <div className="mini-cart__footer">
              <div className="mini-cart__subtotal">
                <span>Subtotal</span>
                <span className="mini-cart__subtotal-price">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              <button
                className="mini-cart__checkout"
                onClick={handleCheckout}
              >
                View Bag &amp; Checkout
              </button>

              <p className="mini-cart__note">
                Shipping &amp; taxes calculated at checkout
              </p>
            </div>
          )}
        </aside>
      </div>
      )}


      {/* SAVE YOUR BAG MODAL */}
      <SaveYourBagModal
        isOpen={showSaveBag}
        onClose={() => setShowSaveBag(false)}
        onGuestContinue={() => {
          setShowSaveBag(false);
          navigate("/checkout");
        }}
        onSignIn={() => {
          setShowSaveBag(false);
          setShowAuth(true);
        }}
      />
      
      {/* ACCESS COLLECTIVE MODAL */}
      <AccessCollectiveModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        onEmailSubmit={(email) => {
          console.log("Email login:", email);
          setShowAuth(false);
          navigate("/checkout");
        }}
        onGoogleSignIn={() => {
          console.log("Google login");
          setShowAuth(false);
          navigate("/checkout");
        }}
        onOtpLogin={() => {
          console.log("OTP login");
        }}
      />
    </>
  );
}
