import { CartProvider } from "./context/CartContext";
import AppRoutes from "./routes/AppRoutes";
import { store } from "./app/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCurrentUser } from "./features/auth/authSlice";


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <>
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </>
  );
}

export default App;
