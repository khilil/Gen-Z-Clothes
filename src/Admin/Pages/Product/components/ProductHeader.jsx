import { useNavigate } from "react-router-dom";

export default function ProductHeader({ title }) {
    const navigate = useNavigate();

    // પાછા જવા માટેનું ફંક્શન
    const handleBack = () => {
        navigate("/admin/products"); // તમારા પ્રોડક્ટ લિસ્ટિંગ પેજનો સાચો પાથ અહીં લખો
    };

    return (
        <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-primary/10 px-6 py-4 transition-colors">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <nav className="flex text-xs font-medium text-primary/60 dark:text-primary/70 mb-1">
                        <ol className="inline-flex items-center space-x-1">
                            {/* Products પર ક્લિક કરવાથી પાછા જશે */}
                            <li
                                onClick={handleBack}
                                className="hover:text-primary cursor-pointer transition-colors"
                            >
                                Products
                            </li>
                            <li><span className="mx-2 text-slate-400">/</span></li>
                            <li className="text-primary font-semibold">Edit Product</li>
                        </ol>
                    </nav>
                    <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">{title}</h1>
                </div>

                <div className="flex items-center gap-3">
                    {/* Discard બટન પર ક્લિક કરવાથી પાછા જશે */}
                    <button
                        onClick={handleBack}
                        className="px-4 py-2 text-sm font-medium border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors active:scale-95"
                    >
                        Discard
                    </button>

                    <button className="px-5 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all active:scale-95">
                        Save Changes
                    </button>
                </div>
            </div>
        </nav>
    );
}