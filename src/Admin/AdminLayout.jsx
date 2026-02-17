import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./components/AdminSidebar";
import ProductPageHeader from "./Pages/Product/ProductPageHeader";
import Header from "./components/AdminHeader";


export default function AdminLayout() {
    const location = useLocation();

    const isProductPage = location.pathname === "/admin/products";

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
            <Sidebar />

            <main className="ml-64 min-h-screen flex flex-col">

                {/* 🔥 Dynamic Header Switch */}
                {isProductPage ? <ProductPageHeader /> : <Header />}

                <div className="p-8 flex-1">
                    <Outlet />
                </div>

            </main>
        </div>
    );
}
