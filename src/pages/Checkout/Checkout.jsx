import { useState } from "react";
import { useCart } from "../../context/CartContext";
import "./Checkout.css";

export default function Checkout() {
  const { cart } = useCart();
  const [payment, setPayment] = useState("card");

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const tax = +(subtotal * 0.0825).toFixed(2);
  const total = +(subtotal + tax).toFixed(2);

  return (
    <>
      <div className="checkout-page">

        {/* HEADER */}
        <header className="checkout-header">
          <div className="checkout-header-inner">
            <h1 className="brand">MODERN MEN</h1>
            <div className="secure">
              <span className="material-symbols-outlined">lock</span>
              100% Secure Checkout
            </div>
          </div>
        </header>

        <main className="checkout-container">

          {/* PROGRESS */}
          <div className="checkout-progress">
            <div className="step active">
              <span>Cart</span>
              <div className="progress-line active"></div>
            </div>

            <div className="step">
              <span>Shipping</span>
              <div className="progress-line"></div>
            </div>

            <div className="step muted">
              <span>Payment</span>
              <div className="progress-line"></div>
            </div>

            <div className="step muted">
              <span>Done</span>
            </div>
          </div>

          <div className="checkout-grid">

            {/* LEFT */}
            <section className="checkout-form">
              <h2>Shipping Address</h2>

              <div className="form-grid">

                <div className="form-field">
                  <label>First Name</label>
                  <input placeholder="James" />
                </div>

                <div className="form-field">
                  <label>Last Name</label>
                  <input placeholder="Stirling" />
                </div>

                <div className="form-field full">
                  <label>Street Address</label>
                  <input placeholder="245 Fifth Avenue" />
                </div>

                <div className="form-field">
                  <label>City</label>
                  <input placeholder="New York" />
                </div>

                <div className="form-field">
                  <label>Zip Code</label>
                  <input placeholder="10016" />
                </div>

              </div>

              <h2 className="mt">Payment Method</h2>

              <label className="payment-box active">
                <input type="radio" name="payment" defaultChecked />
                <div>
                  <p>Credit / Debit Card</p>
                  <span>Visa, Mastercard, Amex</span>
                </div>
              </label>

              <label className="payment-box">
                <input type="radio" name="payment" />
                <div>
                  <p>UPI / Net Banking</p>
                  <span>Instant digital payment</span>
                </div>
              </label>

              <label className="payment-box">
                <input type="radio" name="payment" />
                <div>
                  <p>Cash on Delivery</p>
                  <span>Pay when you receive</span>
                </div>
              </label>
            </section>

            {/* RIGHT */}
            <aside className="checkout-summary">
              <h3>ORDER SUMMARY</h3>

              <div className="summary-items">
                {cart.map(item => (
                  <div key={item.id} className="summary-item">
                    <img src={item.image} alt={item.title} />
                    <div>
                      <p>{item.title}</p>
                      <span>Size: {item.size}</span>
                      <strong>
                        ${item.price} × {item.qty}
                      </strong>
                    </div>
                  </div>
                ))}
              </div>

              <div className="summary-totals">
                <div><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                <div><span>Shipping</span><span className="free">Free</span></div>
                <div><span>Tax</span><span>${tax}</span></div>
                <div className="total">
                  <span>Total</span>
                  <strong>${total}</strong>
                </div>
              </div>

              <button className="place-order">
                Place Order
              </button>

              <div className="trust-grid">
                <div>
                  <span className="material-symbols-outlined">verified_user</span>
                  <span>Secure SSL</span>
                </div>
                <div>
                  <span className="material-symbols-outlined">package_2</span>
                  <span>Global Shipping</span>
                </div>
              </div>
            </aside>

          </div>
        </main>

        <footer className="checkout-footer">
          <p>© 2024 MODERN MEN. All Rights Reserved.</p>
          <div>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms</a>
            <a href="#">Returns</a>
          </div>
        </footer>
      </div>
    </>
  );
}
