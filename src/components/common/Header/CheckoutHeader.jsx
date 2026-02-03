import { Link } from "react-router-dom";
import "./Header.css";

export default function CheckoutHeader() {
  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo">
          <div className="brand">MODERN MEN</div>
        </Link>

        <div className="secure">
          <span className="material-symbols-outlined">lock</span>
          100% Secure Checkout
        </div>
      </div>
    </header>
  );
}
