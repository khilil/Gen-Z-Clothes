import React from 'react';

/**
 * AdminProducts Component
 * Refined React version of the Product Catalog Management page.
 */
export default function AdminProducts() {
    const products = [
        {
            id: "PRD-00124",
            name: "Classic Essential Tee",
            category: "Essentials",
            price: "$24.00",
            variants: "12 Variants",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbNT9Q-dUlmE4cAgM793DFOVVzPEL9f-gQEdlEevGvzaWmpyw9kpnJefiW6FfrEQx29IJHEsLrEEqOjcwtKg1fqpTgF8Yn-zjtIxkdph0AjCOg1oBJ3p9phdYCiBsvuTr2wOOsX7hZxh-29DhGpNAeT2ycQGQINDiiqGU4a5P2aAJmlc6XDn7jf_DEsryvGObUXVC9WfPW-VzED2eWutEliEiRRckT6zcGruMh2jSk5GVrYtRhb0fESStDjXA074UZ2G15z5HOgYU",
            badgeClass: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900/30"
        },
        {
            id: "PRD-00125",
            name: "Vintage Graphic Print",
            category: "Graphic Tees",
            price: "$38.00",
            variants: "8 Variants",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZNjT90sQtQRxJxo0mL4hCxAOLW6GtW92A9_wS4j49KRwjEEf4UwdnSboPFYG1ikpUGcUltV0k7_nqKQQlrFXaYXw4HQFH1kSoL9qVRHCchE5wRw_oE2HIzQsLgPVfEm-gE_FZoJj6v4HNOugVdXOxK3_F8GP8j23gWJ644VPPS6fDMw-kHV4wwM5EzU99DEY0ImU2HBa9CJoPxN5Oqxu6WCsKFp1Y0mXV95FoxZjr7GLWePGRTMJOKFuS28tbtPx7LWjqI__lbpo",
            badgeClass: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-900/30"
        },
        {
            id: "PRD-00126",
            name: "Organic Cotton V-Neck",
            category: "Premium",
            price: "$32.00",
            variants: "15 Variants",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAKYweAUzoJKMv6pK5J7ScTKIHFv7dUTd3nyXJqdfUlYO1V__jYj5Upv3pEXXE2HLGxkE22IRv8v4ZLl_K2hLV2bvz1B5tGHdz1SPCFCZAFsMmirE1vdlrBu9PRrpe1F7cvNHlHJv1HESCKZYh7E2XSivt95WxvU1cEQT9QIWlUK7KrzC5_floLhsfBPxAIdmTIFtlXbNHRxZmnn7rKswcdcJ0f6Qcs0ff74KA_EyhQTeJlQnDeFQeBCBsk2YqObkXqmcM__TBCQz8",
            badgeClass: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/30"
        },
        {
            id: "PRD-00127",
            name: "Signature Embroidered Polo",
            category: "Limited Edition",
            price: "$45.00",
            variants: "6 Variants",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA4FSSnluNoWvqdimFA20cQZRn9P0Tn2EnxSAeTnYhihjuacfZ8JWnBP7xHLsuPv_HwkLPuSCPQqVb9ihsLSyKFcYA4ktnuL_uYBoRF5JvwvnljBWVYkSWRk8vo81R0hjrJnh-IgJRaHplyOsqJaLRqtVz99ekqQRx17jcBZpRENgj-DOw-V0iJZ-t6W4C1vn-daikAoJ0y_97-fsbr7RdOO0Ptt-cOMWwITb27NbnULVvs4X47QB67NrkYiiY8S9FxRvuGqq7rIl0",
            badgeClass: "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900/30"
        }
    ];

    return (
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden font-display text-slate-900 dark:text-slate-100">



            {/* Page Content Scrollable Area */}
            <div className="flex-1 overflow-y-auto p-8">

                {/* 2) Filter Bar Section */}
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div className="flex flex-1 items-center gap-4 min-w-[300px]">
                        <div className="relative flex-1 max-w-md">
                            <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                search
                            </span>
                            <input
                                className="w-full pl-10 pr-4 py-2 bg-background-light dark:bg-slate-900 border-none rounded-lg focus:ring-2 focus:ring-primary text-sm dark:text-slate-200"
                                placeholder="Search catalog..."
                                type="text"
                            />
                        </div>

                        <div className="relative">
                            <select className="pl-4 pr-10 py-2 bg-background-light dark:bg-slate-900 border-none rounded-lg focus:ring-2 focus:ring-primary text-sm appearance-none cursor-pointer dark:text-slate-300">
                                <option>All Categories</option>
                                <option>Essentials</option>
                                <option>Graphic Tees</option>
                                <option>Premium</option>
                                <option>Limited Edition</option>
                            </select>
                            <span className="material-icons absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                                expand_more
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-background-light dark:hover:bg-slate-800 rounded-lg transition-colors border border-slate-200">
                            <span className="material-icons text-sm">filter_list</span>
                            More Filters
                        </button>

                        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-background-light dark:hover:bg-slate-800 rounded-lg transition-colors border border-slate-200">
                            <span className="material-icons text-sm">download</span>
                            Export
                        </button>
                    </div>
                </div>

                {/* 3) Products Table Section */}
                <div className="bg-white dark:bg-slate-900
 rounded-xl border border-slate-200 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800
 text-slate-500 text-xs font-bold uppercase tracking-wider">
                                <th className="px-6 py-4 font-bold">Product</th>
                                <th className="px-6 py-4 font-bold">Category</th>
                                <th className="px-6 py-4 font-bold">Base Price</th>
                                <th className="px-6 py-4 font-bold">Variants</th>
                                <th className="px-6 py-4 text-right font-bold">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                            {products.map((product) => (
                                <ProductRow key={product.id} {...product} />
                            ))}
                        </tbody>
                    </table>

                    {/* 4) Pagination Section */}
                    <div className="px-6 py-4 bg-background-light/30 dark:bg-slate-800/20 border-t border-primary/5 flex items-center justify-between">
                        <p className="text-sm text-slate-500">
                            Showing <span className="font-semibold text-slate-900 dark:text-white">1</span> to{" "}
                            <span className="font-semibold text-slate-900 dark:text-white">10</span> of{" "}
                            <span className="font-semibold text-slate-900 dark:text-white">124</span> products
                        </p>

                        <div className="flex items-center gap-2">
                            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-white dark:hover:bg-slate-700 disabled:opacity-50" disabled>
                                <span className="material-icons text-sm">chevron_left</span>
                            </button>

                            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white font-bold text-xs shadow-sm shadow-primary/20">
                                1
                            </button>

                            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-white dark:hover:bg-slate-700 font-medium text-xs dark:text-slate-300">
                                2
                            </button>

                            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-white dark:hover:bg-slate-700 font-medium text-xs dark:text-slate-300">
                                3
                            </button>

                            <span className="text-slate-400 px-1">...</span>

                            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-white dark:hover:bg-slate-700 font-medium text-xs dark:text-slate-300">
                                13
                            </button>

                            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-white dark:hover:bg-slate-700 transition-colors">
                                <span className="material-icons text-sm">chevron_right</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* 5) Empty State Section (Hidden by default) */}
                <div className="hidden flex flex-col items-center justify-center py-24 text-center">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <span className="material-icons text-4xl text-primary">search_off</span>
                    </div>
                    <h3 className="text-lg font-bold dark:text-white">No products found</h3>
                    <p className="text-slate-500 max-w-xs mt-1">Try adjusting your filters or search terms to find what you're looking for.</p>
                    <button className="mt-6 text-primary font-bold text-sm hover:underline">Clear all filters</button>
                </div>

            </div>
        </div>
    );
}

/**
 * Reusable ProductRow Component
 */
function ProductRow({ name, id, category, price, variants, image, badgeClass }) {
    return (
        <tr className="hover:bg-primary/5 transition-colors group">
            <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-background-light dark:bg-slate-800 overflow-hidden border border-primary/5 shrink-0">
                        <img
                            className="w-full h-full object-cover"
                            src={image}
                            alt={name}
                        />
                    </div>
                    <div>
                        <p className="font-bold text-sm dark:text-white">{name}</p>
                        <p className="text-xs text-slate-500">ID: {id}</p>
                    </div>
                </div>
            </td>

            <td className="px-6 py-4">
                <span className={`px-3 py-1 text-[10px] font-bold rounded-full border ${badgeClass}`}>
                    {category}
                </span>
            </td>

            <td className="px-6 py-4 text-sm font-semibold dark:text-slate-200">
                {price}
            </td>

            <td className="px-6 py-4">
                <div className="flex items-center gap-1.5">
                    <span className="text-sm font-medium dark:text-slate-300">{variants}</span>
                    <span className="material-icons text-xs text-slate-400">
                        layers
                    </span>
                </div>
            </td>

            <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-slate-400 hover:text-primary transition-colors" title="View">
                        <span className="material-icons text-lg">visibility</span>
                    </button>
                    <button className="p-2 text-slate-400 hover:text-primary transition-colors" title="Edit">
                        <span className="material-icons text-lg">edit</span>
                    </button>
                    <button className="p-2 text-slate-400 hover:text-red-500 transition-colors" title="Delete">
                        <span className="material-icons text-lg">delete</span>
                    </button>
                </div>
            </td>
        </tr>
    );
}