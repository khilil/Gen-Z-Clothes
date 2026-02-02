import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Category from "../pages/Category/CategoryPage";
import ProductListing from "../pages/ProductDetail/ProductListing";
import CategoryPage from "../pages/Category/CategoryPage";
import ProductDetailPage from "../pages/ProductDetail/ProductDetailPage";
import Checkout from "../pages/Checkout/Checkout";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/shop/:category" element={<ProductListing />} />   
            <Route path="/product/:slug" element={<ProductDetailPage />} />
            <Route path="/checkout" element={<Checkout />} />
        </Routes>
    );
}
