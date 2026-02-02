import Header from "./components/common/Header/Header";
import { CartProvider } from "./context/CartContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <CartProvider>
        {/* <Header /> */}
        <AppRoutes />
      </CartProvider>
    </>
  );
}

export default App;
