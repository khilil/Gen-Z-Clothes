import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import CategoryPage from "../pages/Category/CategoryPage";
import ProductListing from "../pages/ProductDetail/ProductListing";
import ProductDetailPage from "../pages/ProductDetail/ProductDetailPage";
import Checkout from "../pages/Checkout/Checkout";
import CheckoutDetails from "../pages/Checkout/CheckoutDetails";

import AccountLayout from "../pages/Account/AccountLayout/AccountLayout";
import Orders from "../pages/Account/Orders";
import Dashboard from "../pages/Account/Dashboard/Dashboard";
import Wishlist from "../pages/Account/Wishlist/Wishlist";
import Addresses from "../pages/Account/Addresses/Addresses";
import Profile from "../pages/Account/Profile/Profile";
import About from "../pages/About";

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


            {/* ✅ ACCOUNT PARENT ROUTE */}
            <Route path="/account" element={<AccountLayout />}>

                {/* DEFAULT PAGE */}
                <Route index element={<Navigate to="orders" replace />} />

                {/* CHILD ROUTES (OUTLET) */}
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="orders" element={<Orders />} />
                <Route path="wishlist" element={<Wishlist />} />
                <Route path="addresses" element={<Addresses />} />
                <Route path="profile" element={<Profile />} />

            </Route>
        </Routes>
    );
}
