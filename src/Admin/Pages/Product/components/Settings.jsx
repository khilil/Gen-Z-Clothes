import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const InventorySettings = ({ data, onChange, totalStock }) => {
    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-6 py-5">
                <h2 className="text-lg font-bold text-slate-900">Inventory Settings</h2>
            </div>
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-700">Track Inventory</span>
                    <button
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ${data.trackInventory ? 'bg-indigo-600' : 'bg-slate-200'}`}
                        onClick={() => onChange('trackInventory', !data.trackInventory)}
                    >
                        <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${data.trackInventory ? 'translate-x-5' : 'translate-x-0'}`}></span>
                    </button>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Global Low Stock Threshold</label>
                    <input
                        type="number"
                        className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                        value={data.globalThreshold}
                        onChange={(e) => onChange('globalThreshold', parseInt(e.target.value) || 0)}
                    />
                </div>

                <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Total Units</span>
                    <span className="text-xl font-black text-slate-900">{totalStock}</span>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 pt-6">
                    <span className="text-sm font-semibold text-slate-700">Is Product Active</span>
                    <button
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ${data.isActive ? 'bg-emerald-500' : 'bg-slate-200'}`}
                        onClick={() => onChange('isActive', !data.isActive)}
                    >
                        <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${data.isActive ? 'translate-x-5' : 'translate-x-0'}`}></span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export const ProductFlags = ({ data, onChange }) => {
    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-6 py-5">
                <h2 className="text-lg font-bold text-slate-900">Visibility & Status</h2>
            </div>
            <div className="space-y-4 p-6">
                {[
                    { label: 'Featured Product', field: 'isFeatured', color: 'bg-amber-500' },
                    { label: 'New Arrival', field: 'isNewArrival', color: 'bg-blue-500' },
                    { label: 'Best Seller', field: 'isBestSeller', color: 'bg-purple-500' }
                ].map((flag) => (
                    <div key={flag.field} className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-700">{flag.label}</span>
                        <button
                            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ${data[flag.field] ? flag.color : 'bg-slate-200'}`}
                            onClick={() => onChange(flag.field, !data[flag.field])}
                        >
                            <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${data[flag.field] ? 'translate-x-5' : 'translate-x-0'}`}></span>
                        </button>
                    </div>
                ))}

                <div className="mt-6 space-y-3 pt-4 border-t border-slate-100">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Tags</label>
                    <input
                        type="text"
                        placeholder="Add tag..."
                        className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none transition-all focus:border-indigo-500"
                    />
                    <div className="flex flex-wrap gap-2">
                        {['Summer', 'Cotton'].map((tag) => (
                            <span key={tag} className="flex items-center gap-1 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-600 ring-1 ring-indigo-100">
                                {tag}
                                <button className="ml-1 text-indigo-300 hover:text-indigo-600">&times;</button>
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const SEOSettings = ({ data, onChange, isExpanded, onToggle }) => {
    return (
        <div className={`overflow-hidden rounded-2xl border transition-all duration-300 bg-white shadow-sm ${isExpanded ? 'ring-2 ring-indigo-100 border-indigo-200' : 'border-slate-200'}`}>
            <button
                className="flex w-full items-center justify-between px-6 py-5 outline-none transition-colors hover:bg-slate-50"
                onClick={onToggle}
            >
                <h2 className="text-lg font-bold text-slate-900">SEO Optimization</h2>
                <div className={`text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                    <ChevronDown size={20} />
                </div>
            </button>
            {isExpanded && (
                <div className="space-y-6 p-6 pt-0 animate-in fade-in slide-in-from-top-2 duration-300 border-t border-slate-50 mt-4">
                    <div className="space-y-2 mt-4">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Meta Title</label>
                        <input
                            type="text"
                            placeholder="Optimized page title"
                            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition-all focus:border-indigo-500 ring-indigo-50 focus:ring-4"
                            value={data.metaTitle}
                            onChange={(e) => onChange('metaTitle', e.target.value)}
                        />
                        <div className="flex justify-end pr-1 transition-all">
                            <span className={`text-[10px] font-bold ${data.metaTitle.length > 60 ? 'text-red-500' : 'text-slate-400'}`}>
                                {data.metaTitle.length}/60
                            </span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Meta Description</label>
                        <textarea
                            rows="3"
                            placeholder="Brief search engine summary..."
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition-all focus:border-indigo-500 ring-indigo-50 focus:ring-4 resize-none"
                            value={data.metaDescription}
                            onChange={(e) => onChange('metaDescription', e.target.value)}
                        ></textarea>
                        <div className="flex justify-end pr-1">
                            <span className={`text-[10px] font-bold ${data.metaDescription.length > 160 ? 'text-red-500' : 'text-slate-400'}`}>
                                {data.metaDescription.length}/160
                            </span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Keywords</label>
                        <input
                            type="text"
                            placeholder="e.g. fashion, clothes, organic"
                            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition-all focus:border-indigo-500 ring-indigo-50 focus:ring-4"
                            value={data.metaKeywords}
                            onChange={(e) => onChange('metaKeywords', e.target.value)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
