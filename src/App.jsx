import Header from "./components/common/Header/Header";
import HeaderWrapper from "./components/common/Header/HeaderWrapper";
import { CartProvider } from "./context/CartContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <CartProvider>
        {/* <HeaderWrapper /> */}
        <AppRoutes />
      </CartProvider>
    </>
  );
}

export default App;
