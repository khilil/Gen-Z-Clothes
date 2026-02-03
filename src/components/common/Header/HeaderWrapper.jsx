import { useLocation } from "react-router-dom";
import Header from "./Header";
import CheckoutHeader from "./CheckoutHeader";

export default function HeaderWrapper() {
  const location = useLocation();

  // 👉 Checkout page detect
  const isCheckout = location.pathname === "/checkout" || location.pathname === "/checkout/details";

  return (
    <>
      {isCheckout ? <CheckoutHeader /> : <Header />}
    </>
  );
}
