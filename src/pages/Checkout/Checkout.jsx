import { useState } from "react";
import "./Checkout.css";
import { useCart } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";




export default function Checkout() {
  const navigate = useNavigate(); // ✅ ADD THIS
  const { cart } = useCart(); // ✅ cart from MiniCart
  const [payment, setPayment] = useState("card");

  const location = useLocation();

  const quickBuyProduct = location.state?.product;
  const isQuickBuy = location.state?.isQuickBuy;

  const products = isQuickBuy ? [quickBuyProduct] : cart;

  const subtotal = products.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const tax = +(subtotal * 0.0825).toFixed(2); // same as earlier
  const total = +(subtotal + tax).toFixed(2);

  return (
    <div className="checkout">

      {/* PROGRESS */}
      <div className="progress">
        <Step label="Cart" active />
        <Step label="Shipping" active />
        <Step label="Payment" muted />
        <Step label="Done" muted />
      </div>

      {/* MAIN */}
      <main className="main">
        {/* LEFT */}
        <section className="left">
          <h2 className="section-title">Shipping Address</h2>

          <div className="form-grid">
            <Field label="First Name" placeholder="James" />
            <Field label="Last Name" placeholder="Stirling" />
            <Field label="Street Address" placeholder="245 Fifth Avenue" full />
            <Field label="City" placeholder="New York" />
            <Field label="Zip Code" placeholder="10016" />
          </div>

          <h2 className="section-title mt">Payment Method</h2>

          <Payment
            active={payment === "card"}
            onClick={() => setPayment("card")}
            title="Credit / Debit Card"
            desc="Visa, Mastercard, Amex"
            icon="credit_card"
          />
          <Payment
            active={payment === "upi"}
            onClick={() => setPayment("upi")}
            title="UPI / Net Banking"
            desc="Instant digital payment"
            icon="account_balance_wallet"
          />
          <Payment
            active={payment === "cod"}
            onClick={() => setPayment("cod")}
            title="Cash on Delivery"
            desc="Pay when you receive"
            icon="payments"
          />
        </section>

        {/* RIGHT */}
        <aside className="summary">
          <h3>ORDER SUMMARY</h3>

          <div className="summary-items">
            {products.map(item => (
              <SummaryItem
                key={item.id}
                image={item.image}
                title={item.title}
                size={item.size}
                price={`$${(item.price * item.qty).toFixed(2)}`}
                qty={item.qty}
              />
            ))}
          </div>

          <div className="totals">
            <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
            <Row label="Shipping" value="Free" green />
            <Row label="Tax" value={`$${tax}`} />
            <Total label="Total" value={`$${total}`} />
          </div>

          <button
            className="cta"
            onClick={() =>
              navigate("/checkout/details", {
                state: {
                  cart,
                  subtotal,
                  tax,
                  total,
                  payment
                }
              })
            }
          >
            Place Order
          </button>

          <div className="trust">
            <Trust icon="verified_user" label="Secure SSL" />
            <Trust icon="package_2" label="Global Shipping" />
          </div>
        </aside>

      </main>

      {/* FOOTER */}
      <footer className="footer">
        © 2024 MODERN MEN. All Rights Reserved.
      </footer>
    </div>
  );
}

/* COMPONENTS */

const Step = ({ label, active, muted }) => (
  <div className={`step ${muted ? "muted" : ""}`}>
    <span>{label}</span>
    {!muted && <div className={`line ${active ? "active" : ""}`} />}
  </div>
);

const Field = ({ label, placeholder, full }) => (
  <div className={`field ${full ? "full" : ""}`}>
    <label>{label}</label>
    <input placeholder={placeholder} />
  </div>
);

const Payment = ({ title, desc, icon, active, onClick }) => (
  <label className={`payment ${active ? "active" : ""}`} onClick={onClick}>
    <div>
      <p>{title}</p>
      <span>{desc}</span>
    </div>
    <span className="material-symbols-outlined">{icon}</span>
  </label>
);

const SummaryItem = ({ image, title, size, price, qty }) => (
  <div className="summary-item">
    <img src={image} alt={title} />
    <div>
      <p>{title}</p>
      <span>Size: {size} | Qty: {qty}</span>
      <strong>{price}</strong>
    </div>
  </div>
);


const Row = ({ label, value, green }) => (
  <div className="row">
    <span>{label}</span>
    <span className={green ? "green" : ""}>{value}</span>
  </div>
);

const Total = ({ label, value }) => (
  <div className="total">
    <span>{label}</span>
    <strong>{value}</strong>
  </div>
);

const Trust = ({ icon, label }) => (
  <div className="trust-item">
    <span className="material-symbols-outlined">{icon}</span>
    <span>{label}</span>
  </div>
);
