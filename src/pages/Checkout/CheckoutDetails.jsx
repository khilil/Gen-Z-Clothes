import { useState } from "react";
import "./CheckoutDetails.css";
import { Link, useLocation } from "react-router-dom";

export default function CheckoutDetails() {
    const [delivery, setDelivery] = useState("standard");
    const [payment, setPayment] = useState("upi");

    const location = useLocation();

    const {
        cart = [],
        subtotal = 0,
        tax = 0,
        total = 0,
        payment: initialPayment = "card"
    } = location.state || {};

    const deliveryCharge =
        delivery === "express" ? 150 : 0;
    const finalTotal = subtotal + tax + deliveryCharge;


    return (
        <div className="checkout">

            {/* PROGRESS */}
            <div className="progress container">
                <Step label="Cart" active />
                <Step label="Shipping" active />
                <Step label="Payment" />
                <Step label="Done" muted />
            </div>

            {/* MAIN */}
            <main className="container main">
                {/* LEFT */}
                <div className="content">
                    <Section step="01" title="Customer Details">
                        <div className="card grid-2">
                            <Field label="Full Name" placeholder="Arjun Kapoor" full />
                            <PhoneField />
                            <Field label="Email Address (Optional)" placeholder="arjun@example.com" />
                        </div>
                    </Section>

                    <Section step="02" title="Shipping Address">
                        <div className="card grid-2">
                            <Field label="Pincode" placeholder="400001" accent />
                            <p className="hint">Automatic City / State detection enabled</p>
                            <Field label="House / Street" placeholder="Flat 402, Worli" full />
                            <Field label="City" placeholder="Mumbai" />
                            <Field label="State" placeholder="Maharashtra" />
                        </div>
                    </Section>

                    <Section step="03" title="Delivery Method">
                        <div className="delivery-grid">
                            <Delivery
                                active={delivery === "standard"}
                                onClick={() => setDelivery("standard")}
                                icon="local_shipping"
                                title="Standard Delivery"
                                subtitle="Estimated: Oct 24 – Oct 26"
                                price="FREE"
                                free
                            />
                            <Delivery
                                active={delivery === "express"}
                                onClick={() => setDelivery("express")}
                                icon="bolt"
                                title="Express Priority"
                                subtitle="Estimated: Oct 21 – Oct 22"
                                price="₹150.00"
                            />
                        </div>
                    </Section>

                    <Section step="04" title="Payment Method">
                        <Payment
                            active={payment === "upi"}
                            onClick={() => setPayment("upi")}
                            title="UPI Payment"
                            subtitle="Google Pay, PhonePe, Paytm"
                        />
                        <Payment
                            active={payment === "card"}
                            onClick={() => setPayment("card")}
                            title="Credit / Debit Card"
                            subtitle="Visa, Mastercard, RuPay"
                            icon="credit_card"
                        />
                        <Payment
                            active={payment === "cod"}
                            onClick={() => setPayment("cod")}
                            title="Cash on Delivery (COD)"
                            subtitle="Pay with cash at your doorstep"
                            badge
                        />
                    </Section>
                </div>

                {/* RIGHT */}
                <aside className="summary">
                    <h3>ORDER SUMMARY</h3>

                    <div className="summary-items">
                        {cart.map(item => (
                            <SummaryItem
                                key={item.id}
                                title={item.title}
                                size={item.size}
                                price={`₹ ${(item.price * item.qty).toFixed(2)}`}
                                image={item.image}   // ✅ ADD THIS
                            />
                        ))}
                    </div>


                    <div className="summary-row">
                        <span>Subtotal</span>
                        <span>₹ {subtotal.toFixed(2)}</span>
                    </div>

                    <div className="summary-row">
                        <span>Shipping</span>
                        <span className={deliveryCharge === 0 ? "free" : ""}>
                            {deliveryCharge === 0 ? "Free" : `₹ ${deliveryCharge.toFixed(2)}`}
                        </span>
                    </div>

                    <div className="summary-row">
                        <span>GST</span>
                        <span>₹ {tax.toFixed(2)}</span>
                    </div>

                    <div className="summary-total">
                        <span>Total</span>
                        <strong>₹ {finalTotal.toFixed(2)}</strong>
                    </div>



                    <button className="place-order">
                        Place Order
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                </aside>
            </main>

            {/* FOOTER */}
            <footer className="checkout-footer">
                © 2024 MODERN MEN. Crafted for the Modern Indian Gentleman.
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

const Section = ({ step, title, children }) => (
    <section>
        <div className="section-title">
            <span>{step}</span>
            <h2>{title}</h2>
        </div>
        {children}
    </section>
);

const Field = ({ label, placeholder, full, accent }) => (
    <div className={full ? "full" : ""}>
        <label>{label}</label>
        <input className={accent ? "accent" : ""} placeholder={placeholder} />
    </div>
);

const PhoneField = () => (
    <div>
        <label>Mobile Number</label>
        <div className="phone">
            <span className="code">+91</span>
            <input placeholder="9876543210" />
            <button>Get OTP</button>
        </div>
    </div>
);

const Delivery = ({ icon, title, subtitle, price, free, active, onClick }) => (
    <label className={`delivery ${active ? "active" : ""}`} onClick={onClick}>
        <span className="material-symbols-outlined">{icon}</span>
        <strong>{title}</strong>
        <p>{subtitle}</p>
        <b className={free ? "free" : ""}>{price}</b>
    </label>
);

const Payment = ({ title, subtitle, icon, badge, active, onClick }) => (
    <label className={`payment ${active ? "active" : ""}`} onClick={onClick}>
        <div>
            <strong>{title}</strong>
            <p>{subtitle}</p>
        </div>
        {icon && <span className="material-symbols-outlined">{icon}</span>}
        {badge && <span className="badge">Verified</span>}
    </label>
);

const SummaryItem = ({ title, size, price, image }) => (
    <div className="summary-item">
        <img src={image} alt={title} className="thumb" />
        <div>
            <p>{title}</p>
            <span>Size: {size} | Qty: 1</span>
            <strong>{price}</strong>
        </div>
    </div>
);

