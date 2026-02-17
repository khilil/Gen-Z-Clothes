import { Bell, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function ProductPageHeader() {
    const navigate = useNavigate(); // Initialize the navigate function

    return (
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 transition-colors duration-300">

            <div className="flex items-center gap-4">
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                    Product Catalog
                </h1>

                <span className="px-2 py-0.5 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 text-xs font-bold rounded-full">
                    124 Total
                </span>
            </div>

            <div className="flex items-center gap-4">
                <button className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <Bell size={18} />
                </button>

                {/* Added onClick and used a plus icon for better UX */}
                <button
                    onClick={() => navigate("/admin/products/new")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-semibold text-sm transition-all shadow-md hover:shadow-lg active:scale-95"
                >
                    <Plus size={18} />
                    Add Product
                </button>

            </div>
        </header>
    );
}