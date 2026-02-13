import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import CategoryPage from "../pages/Category/CategoryPage";
import ProductListing from "../pages/ProductDetail/ProductListing";
import Checkout from "../pages/Checkout/Checkout";
import CheckoutDetails from "../pages/Checkout/CheckoutDetails";

import AccountLayout from "../pages/Account/AccountLayout/AccountLayout";
import Orders from "../pages/Account/Orders";
import Dashboard from "../pages/Account/Dashboard/Dashboard";
import Wishlist from "../pages/Account/Wishlist/Wishlist";
import Addresses from "../pages/Account/Addresses/Addresses";
import Profile from "../pages/Account/Profile/Profile";
import About from "../pages/About";
import ProductDetailPage from "../pages/ProductDetail/ProductDetailPage/ProductDetailPage";
import CustomizePage from "../pages/CustomizeShopPage/CustomizePage";
import TextEditorPage from "../pages/CustomizeShopPage/TextEditorPage";
import ShapeEditorPage from "../pages/CustomizeShopPage/ShapeEditorPage";
import CustomizeEditorLayout from "../pages/CustomizeShopPage/layouts/CustomizeEditorLayout";
import GraphicsEditorPage from "../pages/CustomizeShopPage/GraphicsEditorPage";
import PreviewPage from "../pages/CustomizeShopPage/components/Preview/PreviewPage";

export default function AppRoutes() {
    return (
        <Routes>

            {/* NORMAL ROUTES */}
            <Route path="/" element={<Home />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/shop/:category" element={<ProductListing />} />
            <Route path="/product/:slug" element={<ProductDetailPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout/details" element={<CheckoutDetails />} />
            <Route path="/about" element={<About />} />

            {/* <Route path="/customize/:slug" element={<CustomizePage />} /> */}
            <Route path="/customize/:slug" element={<CustomizeEditorLayout />}>
                <Route index element={<CustomizePage />} />
                <Route path="text" element={<TextEditorPage />} />
                <Route path="shapes" element={<ShapeEditorPage />} />
                <Route path="graphics" element={<GraphicsEditorPage />} />
                <Route path="preview" element={<PreviewPage />} />
            </Route>

            {/* ACCOUNT */}
            <Route path="/account" element={<AccountLayout />}>
                <Route index element={<Navigate to="orders" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="orders" element={<Orders />} />
                <Route path="wishlist" element={<Wishlist />} />
                <Route path="addresses" element={<Addresses />} />
                <Route path="profile" element={<Profile />} />
            </Route>

        </Routes>
    );
}
