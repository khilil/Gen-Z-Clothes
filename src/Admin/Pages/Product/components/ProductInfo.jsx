import React from 'react';

const ProductInfo = ({ data, onChange }) => {
    return (
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-sm transition-all hover:shadow-md">
            <div className="border-b border-slate-800 px-6 py-5">
                <h2 className="text-lg font-bold text-white">Product Information</h2>
            </div>
            <div className="grid gap-6 p-6">
                <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-semibold text-slate-400">Product Title</label>
                    <input
                        type="text"
                        id="title"
                        placeholder="e.g. Premium Cotton Oversized T-shirt"
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-slate-200 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 placeholder:text-slate-600"
                        value={data.title}
                        onChange={(e) => onChange('title', e.target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="slug" className="text-sm font-semibold text-slate-400">Slug (Auto-generated)</label>
                    <div className="flex overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
                        <span className="flex items-center px-4 text-xs font-medium text-slate-500 select-none">myshop.com/products/</span>
                        <input
                            type="text"
                            id="slug"
                            className="flex-1 bg-transparent px-4 py-2.5 text-sm text-slate-200 outline-none transition-all focus:bg-slate-900/50"
                            value={data.slug}
                            onChange={(e) => onChange('slug', e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                        <label htmlFor="brand" className="text-sm font-semibold text-slate-400">Brand</label>
                        <input
                            type="text"
                            id="brand"
                            placeholder="Brand Name"
                            className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-slate-200 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 placeholder:text-slate-600"
                            value={data.brand}
                            onChange={(e) => onChange('brand', e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="category" className="text-sm font-semibold text-slate-400">Category</label>
                        <select
                            id="category"
                            className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-slate-200 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%2364748b%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_0.5rem_center] bg-no-repeat"
                            value={data.category}
                            onChange={(e) => onChange('category', e.target.value)}
                        >
                            <option value="" className="bg-slate-900">Select Category</option>
                            <option value="tops" className="bg-slate-900">Tops</option>
                            <option value="bottoms" className="bg-slate-900">Bottoms</option>
                            <option value="dresses" className="bg-slate-900">Dresses</option>
                            <option value="outerwear" className="bg-slate-900">Outerwear</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                        <label htmlFor="gender" className="text-sm font-semibold text-slate-400">Gender</label>
                        <select
                            id="gender"
                            className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-slate-200 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%2364748b%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_0.5rem_center] bg-no-repeat"
                            value={data.gender}
                            onChange={(e) => onChange('gender', e.target.value)}
                        >
                            <option value="unisex" className="bg-slate-900">Unisex</option>
                            <option value="men" className="bg-slate-900">Men</option>
                            <option value="women" className="bg-slate-900">Women</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="material" className="text-sm font-semibold text-slate-400">Fabric / Material</label>
                        <input
                            type="text"
                            id="material"
                            placeholder="e.g. 100% Organic Cotton"
                            className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-slate-200 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 placeholder:text-slate-600"
                            value={data.material}
                            onChange={(e) => onChange('material', e.target.value)}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="shortDescription" className="text-sm font-semibold text-slate-400">Short Description</label>
                    <textarea
                        id="shortDescription"
                        rows="2"
                        placeholder="A brief summary for product cards..."
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-slate-200 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 resize-none placeholder:text-slate-600"
                        value={data.shortDescription}
                        onChange={(e) => onChange('shortDescription', e.target.value)}
                    ></textarea>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-400">Full Description (Rich Text)</label>
                    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
                        <div className="flex gap-2 border-b border-slate-800 bg-slate-900/50 p-2">
                            <button type="button" className="rounded-md border border-slate-700 bg-slate-800 px-3 py-1 text-xs font-bold text-indigo-400 shadow-sm transition-all hover:bg-indigo-500/10 hover:border-indigo-500/30">B</button>
                            <button type="button" className="rounded-md border border-slate-700 bg-slate-800 px-3 py-1 text-xs italic text-slate-400 shadow-sm transition-all hover:bg-slate-700 hover:text-white">I</button>
                            <button type="button" className="rounded-md border border-slate-700 bg-slate-800 px-3 py-1 text-xs underline text-slate-400 shadow-sm transition-all hover:bg-slate-700 hover:text-white">U</button>
                            <div className="w-px bg-slate-800 mx-1"></div>
                            <button type="button" className="rounded-md border border-slate-700 bg-slate-800 px-3 py-1 text-xs text-slate-400 shadow-sm transition-all hover:bg-slate-700 hover:text-white">List</button>
                            <button type="button" className="rounded-md border border-slate-700 bg-slate-800 px-3 py-1 text-xs text-slate-400 shadow-sm transition-all hover:bg-slate-700 hover:text-white">Link</button>
                        </div>
                        <textarea
                            rows="6"
                            placeholder="Describe your product in detail..."
                            className="w-full bg-transparent px-4 py-3 text-sm text-slate-200 outline-none transition-all resize-none placeholder:text-slate-600"
                            value={data.fullDescription}
                            onChange={(e) => onChange('fullDescription', e.target.value)}
                        ></textarea>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductInfo;
