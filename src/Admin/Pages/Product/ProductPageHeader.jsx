import { Bell, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function ProductPageHeader() {
    const navigate = useNavigate(); // Initialize the navigate function

    return (

        <div className="border-b border-slate-800 bg-slate-900/50 px-8 py-6 backdrop-blur-md">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black tracking-tight text-white">Product Catalog</h1>
                    <p className="mt-1 text-sm font-medium text-slate-500">Manage and track your inventory across all categories</p>
                </div>
                <button
                    onClick={() => navigate('/admin/products/new')}
                    className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-700 hover:shadow-indigo-600/40 active:scale-95"
                >
                    <Plus size={18} />
                    Add New Product
                </button>
            </div>
        </div>
    );
}