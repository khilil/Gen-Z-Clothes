import "./Checkout.css";

export default function CheckoutProgress({ step = 1 }) {
  const steps = ["Cart", "Shipping", "Payment", "Done"];

  return (
    <div className="checkout-progress">
      {steps.map((label, i) => {
        const index = i + 1;
        return (
          <div
            key={label}
            className={`step 
              ${index < step ? "done" : ""}
              ${index === step ? "active" : ""}
              ${index > step ? "muted" : ""}
            `}
          >
            <span>{label}</span>
            {index !== steps.length && (
              <div className={`progress-line ${index < step ? "active" : ""}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
