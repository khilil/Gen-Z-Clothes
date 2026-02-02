export default function CheckoutProgress({ step = 1  }) {
  return (
    <div className="checkout-progress">
      
      <div className={`step ${step >= 1 ? "" : "muted"}`}>
        <span>Cart</span>
        <div className={`progress-line ${step > 1 ? "active animate" : ""}`}></div>
      </div>

      <div className={`step ${step >= 2 ? "" : "muted"}`}>
        <span>Shipping</span>
        <div className={`progress-line ${step > 2 ? "active animate" : ""}`}></div>
      </div>

      <div className={`step ${step >= 3 ? "" : "muted"}`}>
        <span>Payment</span>
        <div className={`progress-line ${step > 3 ? "active animate" : ""}`}></div>
      </div>

      <div className={`step ${step >= 4 ? "" : "muted"}`}>
        <span>Done</span>
      </div>

    </div>
  );
} 
