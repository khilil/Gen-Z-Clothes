import React, { useState, useMemo } from 'react';
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
    ArrowUpDown
} from 'lucide-react';

/**
 * AdminProducts Component
 * Refined React version of the Product Catalog Management page.
 */
export default function AdminProducts() {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProducts, setSelectedProducts] = useState(new Set());

    const products = useMemo(() => [
        {
            id: "PRD-00124",
            name: "Classic Essential Tee",
            category: "Essentials",
            price: 24.00,
            variants: 12,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbNT9Q-dUlmE4cAgM793DFOVVzPEL9f-gQEdlEevGvzaWmpyw9kpnJefiW6FfrEQx29IJHEsLrEEqOjcwtKg1fqpTgF8Yn-zjtIxkdph0AjCOg1oBJ3p9phdYCiBsvuTr2wOOsX7hZxh-29DhGpNAeT2ycQGQINDiiqGU4a5P2aAJmlc6XDn7jf_DEsryvGObUXVC9WfPW-VzED2eWutEliEiRRckT6zcGruMh2jSk5GVrYtRhb0fESStDjXA074UZ2G15z5HOgYU",
            badgeClass: "text-blue-400 bg-blue-500/10 border-blue-500/20"
        },
        {
            id: "PRD-00125",
            name: "Vintage Graphic Print",
            category: "Graphic Tees",
            price: 38.00,
            variants: 8,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZNjT90sQtQRxJxo0mL4hCxAOLW6GtW92A9_wS4j49KRwjEEf4UwdnSboPFYG1ikpUGcUltV0k7_nqKQQlrFXaYXw4HQFH1kSoL9qVRHCchE5wRw_oE2HIzQsLgPVfEm-gE_FZoJj6v4HNOugVdXOxK3_F8GP8j23gWJ644VPPS6fDMw-kHV4wwM5EzU99DEY0ImU2HBa9CJoPxN5Oqxu6WCsKFp1Y0mXV95FoxZjr7GLWePGRTMJOKFuS28tbtPx7LWjqI__lbpo",
            badgeClass: "text-purple-400 bg-purple-500/10 border-purple-500/20"
        },
        {
            id: "PRD-00126",
            name: "Organic Cotton V-Neck",
            category: "Premium",
            price: 32.00,
            variants: 15,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAKYweAUzoJKMv6pK5J7ScTKIHFv7dUTd3nyXJqdfUlYO1V__jYj5Upv3pEXXE2HLGxkE22IRv8v4ZLl_K2hLV2bvz1B5tGHdz1SPCFCZAFsMmirE1vdlrBu9PRrpe1F7cvNHlHJv1HESCKZYh7E2XSivt95WxvU1cEQT9QIWlUK7KrzC5_floLhsfBPxAIdmTIFtlXbNHRxZmnn7rKswcdcJ0f6Qcs0ff74KA_EyhQTeJlQnDeFQeBCBsk2YqObkXqmcM__TBCQz8",
            badgeClass: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
        },
        {
            id: "PRD-00127",
            name: "Signature Embroidered Polo",
            category: "Limited Edition",
            price: 45.00,
            variants: 6,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA4FSSnluNoWvqdimFA20cQZRn9P0Tn2EnxSAeTnYhihjuacfZ8JWnBP7xHLsuPv_HwkLPuSCPQqVb9ihsLSyKFcYA4ktnuL_uYBoRF5JvwvnljBWVYkSWRk8vo81R0hjrJnh-IgJRaHplyOsqJaLRqtVz99ekqQRx17jcBZpRENgj-DOw-V0iJZ-t6W4C1vn-daikAoJ0y_97-fsbr7RdOO0Ptt-cOMWwITb27NbnULVvs4X47QB67NrkYiiY8S9FxRvuGqq7rIl0",
            badgeClass: "text-amber-400 bg-amber-500/10 border-amber-500/20"
        }
    ], []);

    const filteredProducts = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

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
            setSelectedProducts(new Set(filteredProducts.map(p => p.id)));
        }
    };

    return (
        <div className="flex h-full flex-col bg-slate-950 font-sans text-slate-200">
            {/* Header Area */}
            <div className="border-b border-slate-800 bg-slate-900/50 px-8 py-6 backdrop-blur-md">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-white">Product Catalog</h1>
                        <p className="mt-1 text-sm font-medium text-slate-500">Manage and track your inventory across all categories</p>
                    </div>
                    <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-700 hover:shadow-indigo-600/40 active:scale-95">
                        <Plus size={18} />
                        Add New Product
                    </button>
                </div>
            </div>

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
                                {filteredProducts.length > 0 ? (
                                    filteredProducts.map((product) => (
                                        <ProductRow
                                            key={product.id}
                                            product={product}
                                            isSelected={selectedProducts.has(product.id)}
                                            onToggle={() => toggleSelectProduct(product.id)}
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
        </div>
    );
}

/**
 * Reusable ProductRow Component
 */
function ProductRow({ product, isSelected, onToggle }) {
    const { name, id, category, price, variants, image, badgeClass } = product;
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
                            src={image}
                            alt={name}
                        />
                    </div>
                    <div>
                        <p className="text-sm font-black text-white group-hover:text-indigo-400 transition-colors uppercase tracking-tight">{name}</p>
                        <p className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-tighter">REF: {id}</p>
                    </div>
                </div>
            </td>

            <td className="px-6 py-4">
                <span className={`inline-flex items-center rounded-lg border px-3 py-1 text-[10px] font-black uppercase tracking-widest ${badgeClass}`}>
                    {category}
                </span>
            </td>

            <td className="px-6 py-4 font-mono text-sm font-black text-slate-200">
                ${price.toFixed(2)}
            </td>

            <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800 text-slate-400">
                        <Layers size={14} />
                    </div>
                    <span className="text-xs font-black text-slate-400 uppercase">{variants} Variants</span>
                </div>
            </td>

            <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-1">
                    <button className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition-all hover:bg-slate-800 hover:text-indigo-400" title="View details">
                        <Eye size={18} />
                    </button>
                    <button className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition-all hover:bg-slate-800 hover:text-indigo-400" title="Edit product">
                        <Edit3 size={18} />
                    </button>
                    <button className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition-all hover:bg-rose-500/10 hover:text-rose-400" title="Delete">
                        <Trash2 size={18} />
                    </button>
                </div>
            </td>
        </tr>
    );
}
