import React, { useState, useMemo, useEffect } from 'react';
import {
    Search,
    Filter,
    Download,
    ChevronLeft,
    ChevronRight,
    MoreVertical,
    Edit3,
    Eye,
    Trash2,
    Layers,
    Plus,
    X,
    CheckCircle2,
    AlertCircle,
    Package,
    ArrowUpDown,
    Loader2
} from 'lucide-react';
import { getProducts, deleteProduct } from '../../../services/productService';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

/**
 * AdminProducts Component
 * Refined React version of the Product Catalog Management page.
 */
export default function AdminProducts() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProducts, setSelectedProducts] = useState(new Set());
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, productId: null, productName: '' });
    const [isDeleting, setIsDeleting] = useState(false);
    const [notification, setNotification] = useState(null);

    const showNotification = (type, message) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 5000);
    };

    useEffect(() => {
        const controller = new AbortController();

        const fetchProductsData = async () => {
            setIsLoading(true);
            try {
                const data = await getProducts(controller.signal);
                console.log("API Raw Response:", data);
                if (data) {
                    // Comprehensive check for the array in the response
                    let list = [];
                    if (Array.isArray(data)) {
                        list = data;
                    } else if (data.data && Array.isArray(data.data)) {
                        list = data.data;
                    } else if (data.products && Array.isArray(data.products)) {
                        list = data.products;
                    } else if (data.allProducts && Array.isArray(data.allProducts)) {
                        list = data.allProducts;
                    }

                    console.log("Parsed Products List:", list);
                    setProducts(list);
                    setError(null);
                }
            } catch (err) {
                console.error("Fetch Products Error:", err);
                setError("Failed to load products. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProductsData();

        return () => controller.abort();
    }, []);

    const filteredProducts = useMemo(() => {
        if (!Array.isArray(products)) return [];
        return products.filter(p => {
            if (!p) return false;

            // Flexible search across multiple fields
            const nameMatch = (p.name || p.title || '').toLowerCase().includes(searchTerm.toLowerCase());
            const idMatch = (p.id || p._id || '').toLowerCase().includes(searchTerm.toLowerCase());
            const matchesSearch = nameMatch || idMatch;

            // Flexible category matching (supports string or object with name property)
            const pCategory = typeof p.category === 'object' ? p.category?.name : p.category;
            const matchesCategory =
                categoryFilter === 'All' ||
                categoryFilter === 'All Categories' ||
                pCategory === categoryFilter;

            return matchesSearch && matchesCategory;
        });
    }, [products, searchTerm, categoryFilter]);

    const toggleSelectProduct = (id) => {
        const next = new Set(selectedProducts);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        setSelectedProducts(next);
    };

    const toggleSelectAll = () => {
        if (selectedProducts.size === filteredProducts.length && filteredProducts.length > 0) {
            setSelectedProducts(new Set());
        } else {
            setSelectedProducts(new Set(filteredProducts.map(p => p.id || p._id)));
        }
    };

    const handleDeleteClick = (product) => {
        setDeleteModal({
            isOpen: true,
            productId: product.id || product._id,
            productName: product.name || product.title || "Untitled Product"
        });
    };

    const handleConfirmDelete = async () => {
        setIsDeleting(true);
        try {
            await deleteProduct(deleteModal.productId);
            setProducts(prev => prev.filter(p => (p.id || p._id) !== deleteModal.productId));
            showNotification('success', `${deleteModal.productName} deleted successfully`);
            setDeleteModal({ isOpen: false, productId: null, productName: '' });
        } catch (err) {
            console.error("Delete Error:", err);
            showNotification('error', err.response?.data?.message || "Failed to delete product");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="flex h-full flex-col bg-slate-950 font-sans text-slate-200">
            {/* Header Area
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
            </div> */}

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-8">
                {/* 2) Filter Bar Section */}
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-4 shadow-sm ring-1 ring-white/5">
                    <div className="flex flex-1 items-center gap-4 min-w-[300px]">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input
                                className="w-full rounded-xl border border-slate-800 bg-slate-950 pl-11 pr-4 py-2.5 text-sm text-slate-200 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 placeholder:text-slate-600"
                                placeholder="Search by name or ID..."
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="relative">
                            <select
                                className="appearance-none rounded-xl border border-slate-800 bg-slate-950 pl-4 pr-10 py-2.5 text-sm text-slate-300 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 cursor-pointer"
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                            >
                                <option>All Categories</option>
                                <option>Essentials</option>
                                <option>Graphic Tees</option>
                                <option>Premium</option>
                                <option>Limited Edition</option>
                            </select>
                            <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-slate-500 pointer-events-none" size={16} />
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 rounded-xl border border-slate-800 px-4 py-2.5 text-sm font-bold text-slate-400 transition-all hover:bg-slate-800 hover:text-white">
                            <Filter size={16} />
                            Filters
                        </button>
                        <button className="flex items-center gap-2 rounded-xl border border-slate-800 px-4 py-2.5 text-sm font-bold text-slate-400 transition-all hover:bg-slate-800 hover:text-white">
                            <Download size={16} />
                            Export
                        </button>
                    </div>
                </div>

                {/* 3) Products Table Section */}
                <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-xl ring-1 ring-white/5">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="border-b border-slate-800 bg-slate-800/50">
                                <tr>
                                    <th className="w-12 px-6 py-4">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-slate-700 bg-slate-950 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-900"
                                            checked={selectedProducts.size === filteredProducts.length && filteredProducts.length > 0}
                                            onChange={toggleSelectAll}
                                        />
                                    </th>
                                    <th className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500">
                                            Product Details
                                            <ArrowUpDown size={12} />
                                        </div>
                                    </th>
                                    <th className="px-6 py-4">
                                        <div className="text-xs font-black uppercase tracking-widest text-slate-500">Category</div>
                                    </th>
                                    <th className="px-6 py-4">
                                        <div className="text-xs font-black uppercase tracking-widest text-slate-500">Base Price</div>
                                    </th>
                                    <th className="px-6 py-4">
                                        <div className="text-xs font-black uppercase tracking-widest text-slate-500">Variants</div>
                                    </th>
                                    <th className="px-6 py-4 text-right">
                                        <div className="text-xs font-black uppercase tracking-widest text-slate-500">Actions</div>
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-800/50">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan="6" className="py-20 text-center">
                                            <div className="flex flex-col items-center">
                                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800/50 text-indigo-500">
                                                    <Loader2 size={32} className="animate-spin" />
                                                </div>
                                                <p className="mt-4 text-sm font-bold text-slate-400">Loading products...</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : error ? (
                                    <tr>
                                        <td colSpan="6" className="py-20 text-center">
                                            <div className="flex flex-col items-center">
                                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-500">
                                                    <AlertCircle size={32} />
                                                </div>
                                                <h3 className="mt-4 text-lg font-bold text-white">Something went wrong</h3>
                                                <p className="mt-1 text-sm text-slate-500">{error}</p>
                                                <button
                                                    className="mt-6 text-sm font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
                                                    onClick={() => window.location.reload()}
                                                >
                                                    Try again
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredProducts.length > 0 ? (
                                    filteredProducts.map((product) => (
                                        <ProductRow
                                            key={product.id || product._id}
                                            product={product}
                                            isSelected={selectedProducts.has(product.id || product._id)}
                                            onToggle={() => toggleSelectProduct(product.id || product._id)}
                                            onView={() => navigate(`/admin/products/view/${product.slug}`)}
                                            onEdit={() => navigate(`/admin/products/edit/${product.slug}`)}
                                            onDelete={() => handleDeleteClick(product)}
                                        />
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="py-20 text-center">
                                            <div className="flex flex-col items-center">
                                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800 text-slate-600">
                                                    <Package size={32} />
                                                </div>
                                                <h3 className="mt-4 text-lg font-bold text-white">No products found</h3>
                                                <p className="mt-1 text-sm text-slate-500">Try adjusting your filters or search terms.</p>
                                                <button
                                                    className="mt-6 text-sm font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
                                                    onClick={() => { setSearchTerm(''); setCategoryFilter('All'); }}
                                                >
                                                    Clear all filters
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* 4) Pagination Section */}
                    <div className="flex items-center justify-between border-t border-slate-800 bg-slate-900/50 px-6 py-4">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                            Showing <span className="text-slate-200">1</span> to{" "}
                            <span className="text-slate-200">{filteredProducts.length}</span> of{" "}
                            <span className="text-slate-200">{filteredProducts.length}</span> results
                        </p>

                        <div className="flex items-center gap-2">
                            <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 text-slate-500 transition-all hover:bg-slate-800 hover:text-white disabled:opacity-30" disabled>
                                <ChevronLeft size={18} />
                            </button>

                            <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-xs font-black text-white shadow-lg shadow-indigo-600/20">
                                1
                            </button>

                            <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 text-xs font-bold text-slate-400 transition-all hover:bg-slate-800 hover:text-white">
                                2
                            </button>

                            <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 text-slate-400 transition-all hover:bg-slate-800 hover:text-white">
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {deleteModal.isOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setDeleteModal({ ...deleteModal, isOpen: false })}
                            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl"
                        >
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-500 mb-6">
                                <Trash2 size={32} />
                            </div>
                            <h2 className="text-xl font-black text-white mb-2 uppercase tracking-tight">Delete Product?</h2>
                            <p className="text-slate-400 mb-8 font-medium">
                                Are you sure you want to delete <span className="text-white font-bold">"{deleteModal.productName}"</span>?
                                This action cannot be undone and will permanently remove it from your catalog.
                            </p>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setDeleteModal({ ...deleteModal, isOpen: false })}
                                    className="flex-1 rounded-xl border border-slate-800 py-3 text-sm font-bold text-slate-400 transition-all hover:bg-slate-800 hover:text-white"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleConfirmDelete}
                                    disabled={isDeleting}
                                    className="flex-1 rounded-xl bg-rose-500 py-3 text-sm font-bold text-white shadow-lg shadow-rose-500/20 transition-all hover:bg-rose-600 hover:shadow-rose-500/40 flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {isDeleting ? (
                                        <Loader2 size={18} className="animate-spin" />
                                    ) : (
                                        'Delete Product'
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Notification Toast */}
            <AnimatePresence>
                {notification && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="fixed bottom-8 right-8 z-[110] flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/95 p-4 pr-6 shadow-2xl backdrop-blur-xl ring-1 ring-white/10"
                    >
                        <div className={`flex h-12 w-12 items-center justify-center rounded-full ${notification.type === 'success' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                            {notification.type === 'success' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-white">
                                {notification.type === 'success' ? 'Success!' : 'Error'}
                            </span>
                            <span className="text-xs text-slate-400">{notification.message}</span>
                        </div>
                        <button
                            onClick={() => setNotification(null)}
                            className="ml-4 text-slate-500 transition-colors hover:text-white"
                        >
                            <X size={16} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

/**
 * Reusable ProductRow Component
 */
function ProductRow({ product, isSelected, onToggle, onView, onEdit, onDelete }) {
    const { name, title, id, _id, category, price, variants, images, image, badgeClass } = product;

    // Normalize data from backend
    const displayName = name || title || "Untitled Product";
    const displayId = id || _id || "N/A";
    const displayImage = image || (images && images[0]?.url) || (images && images[0]) || "https://premium-clothing.com/placeholder.jpg";
    const variantCount = variants?.length || variants || 0;

    return (
        <tr className={`group transition-colors hover:bg-slate-800/30 ${isSelected ? 'bg-indigo-600/5' : ''}`}>
            <td className="px-6 py-4">
                <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-700 bg-slate-950 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-900"
                    checked={isSelected}
                    onChange={onToggle}
                />
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-slate-800 bg-slate-950 p-1">
                        <img
                            className="h-full w-full rounded-lg object-cover"
                            src={displayImage}
                            alt={displayName}
                        />
                    </div>
                    <div>
                        <p className="text-sm font-black text-white group-hover:text-indigo-400 transition-colors uppercase tracking-tight">{displayName}</p>
                        <p className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-tighter">REF: {displayId}</p>
                    </div>
                </div>
            </td>

            <td className="px-6 py-4">
                <span className={`inline-flex items-center rounded-lg border px-3 py-1 text-[10px] font-black uppercase tracking-widest ${badgeClass || 'text-slate-400 bg-slate-500/10 border-slate-500/20'}`}>
                    {category || 'Uncategorized'}
                </span>
            </td>

            <td className="px-6 py-4 font-mono text-sm font-black text-slate-200">
                ${(price || 0).toFixed(2)}
            </td>

            <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800 text-slate-400">
                        <Layers size={14} />
                    </div>
                    <span className="text-xs font-black text-slate-400 uppercase">{variantCount} Variants</span>
                </div>
            </td>

            <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-1">
                    <button
                        onClick={onView}
                        className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition-all hover:bg-slate-800 hover:text-indigo-400"
                        title="View details"
                    >
                        <Eye size={18} />
                    </button>
                    <button
                        onClick={onEdit}
                        className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition-all hover:bg-slate-800 hover:text-indigo-400"
                        title="Edit product"
                    >
                        <Edit3 size={18} />
                    </button>
                    <button
                        onClick={onDelete}
                        className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition-all hover:bg-rose-500/10 hover:text-rose-400"
                        title="Delete"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </td>
        </tr>
    );
}
