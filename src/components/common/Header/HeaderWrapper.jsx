import { useLocation, matchPath } from "react-router-dom";
import Header from "./Header";
import CheckoutHeader from "./CheckoutHeader";
import StudioHeader from "./StudioHeader";

export default function HeaderWrapper() {
  const location = useLocation();

  const isCheckout = matchPath(
    { path: "/checkout/*" },
    location.pathname
  );

  const isStudio = matchPath(
    { path: "/customize/:slug/*" },
    location.pathname
  );

  if (isCheckout) return <CheckoutHeader />;
  if (isStudio) return <StudioHeader />;

  return <Header />;
}
