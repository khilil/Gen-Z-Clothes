import React from 'react';
import {
    ChevronDown,
    ChevronUp,
    Trash2,
    Plus,
    AlertCircle,
    CheckCircle2,
    XCircle,
    RotateCcw
} from 'lucide-react';

const Variants = ({ variants, onAdd, onDelete, onChange, onResetSku, onToggleExpand }) => {
    const getStockStatus = (stock, reserved, threshold) => {
        const available = stock - reserved;
        if (available <= 0) return { label: 'Out of Stock', color: 'text-red-600 bg-red-50 border-red-100', icon: <XCircle size={14} /> };
        if (available <= threshold) return { label: 'Low Stock', color: 'text-amber-600 bg-amber-50 border-amber-100', icon: <AlertCircle size={14} /> };
        return { label: 'In Stock', color: 'text-emerald-600 bg-emerald-50 border-emerald-100', icon: <CheckCircle2 size={14} /> };
    };

    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
                <h2 className="text-lg font-bold text-slate-900">Variants & Inventory</h2>
                <button
                    className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-100 transition-all hover:bg-indigo-700 hover:shadow-indigo-200"
                    onClick={onAdd}
                >
                    <Plus size={16} /> Add Variant
                </button>
            </div>
            <div className="p-6">
                {variants.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 p-12 text-center text-slate-500">
                        <p className="mb-2 text-sm font-medium">No variants added yet</p>
                        <p className="text-xs">Click "Add Variant" to create sizes or colors for this product.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {variants.map((v, index) => {
                            const status = getStockStatus(v.stock, v.reservedStock, v.lowStockThreshold);
                            const available = v.stock - v.reservedStock;

                            return (
                                <div key={v.id} className={`overflow-hidden rounded-xl border transition-all ${v.isExpanded ? 'border-indigo-500 ring-1 ring-indigo-500 shadow-lg shadow-indigo-50' : 'border-slate-200'}`}>
                                    <div
                                        className="flex cursor-pointer items-center justify-between bg-white px-5 py-4 transition-colors hover:bg-slate-50/50"
                                        onClick={() => onToggleExpand(v.id)}
                                    >
                                        <div className="flex flex-1 items-center gap-4">
                                            <div className="flex items-center gap-2">
                                                <span className="flex h-7 items-center rounded-lg bg-slate-100 px-3 text-xs font-bold text-slate-700">{v.size || 'Size'}</span>
                                                <span className="flex h-7 items-center gap-2 rounded-lg bg-slate-100 px-3 text-xs font-bold text-slate-700">
                                                    <span className="h-2 w-2 rounded-full border border-slate-300" style={{ backgroundColor: v.colorCode || '#ccc' }}></span>
                                                    {v.color || 'Color'}
                                                </span>
                                            </div>
                                            <span className="hidden text-xs font-medium text-slate-400 sm:block">{v.sku || 'No SKU'}</span>
                                            <div className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${status.color}`}>
                                                {status.icon}
                                                {status.label}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500"
                                                onClick={(e) => { e.stopPropagation(); onDelete(v.id); }}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                            <div className="text-slate-400">
                                                {v.isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                            </div>
                                        </div>
                                    </div>

                                    {v.isExpanded && (
                                        <div className="border-t border-slate-100 bg-slate-50/30 p-5">
                                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-semibold text-slate-600">Size</label>
                                                    <select
                                                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.1rem_1.1rem] bg-[right_0.5rem_center] bg-no-repeat"
                                                        value={v.size}
                                                        onChange={(e) => onChange(v.id, 'size', e.target.value)}
                                                    >
                                                        <option value="">Select Size</option>
                                                        <option value="XS">Extra Small</option>
                                                        <option value="S">Small</option>
                                                        <option value="M">Medium</option>
                                                        <option value="L">Large</option>
                                                        <option value="XL">Extra Large</option>
                                                    </select>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-semibold text-slate-600">Color</label>
                                                    <select
                                                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.1rem_1.1rem] bg-[right_0.5rem_center] bg-no-repeat"
                                                        value={v.color}
                                                        onChange={(e) => onChange(v.id, 'color', e.target.value)}
                                                    >
                                                        <option value="">Select Color</option>
                                                        <option value="Black">Black</option>
                                                        <option value="White">White</option>
                                                        <option value="Navy">Navy</option>
                                                        <option value="Red">Red</option>
                                                        <option value="Forest">Forest Green</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <label className="text-xs font-semibold text-slate-600">SKU</label>
                                                        {v.isSkuManual && (
                                                            <button
                                                                className="flex items-center gap-1 text-[10px] font-bold text-indigo-600 transition-colors hover:text-indigo-700"
                                                                onClick={() => onResetSku(v.id)}
                                                            >
                                                                <RotateCcw size={10} /> Reset
                                                            </button>
                                                        )}
                                                    </div>
                                                    <input
                                                        type="text"
                                                        placeholder="e.g. TSH-BLK-M"
                                                        className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition-all focus:ring-4 focus:ring-indigo-50 ${v.isSkuManual ? 'border-indigo-300 bg-indigo-50/30' : 'border-slate-200 bg-white focus:border-indigo-500'}`}
                                                        value={v.sku}
                                                        onChange={(e) => onChange(v.id, 'sku', e.target.value)}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-semibold text-slate-600">Stock</label>
                                                    <input
                                                        type="number"
                                                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                                                        value={v.stock}
                                                        onChange={(e) => onChange(v.id, 'stock', parseInt(e.target.value) || 0)}
                                                    />
                                                </div>
                                            </div>

                                            <div className="mt-5 flex items-center gap-6 rounded-lg bg-slate-100/50 p-4">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Reserved</span>
                                                    <span className="text-sm font-bold text-slate-600">{v.reservedStock}</span>
                                                </div>
                                                <div className="h-8 w-px bg-slate-200"></div>
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Available</span>
                                                    <span className={`text-sm font-black ${available <= v.lowStockThreshold ? 'text-amber-600' : 'text-slate-900'}`}>
                                                        {available}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-semibold text-slate-600">Low Stock Threshold</label>
                                                    <input
                                                        type="number"
                                                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                                                        value={v.lowStockThreshold}
                                                        onChange={(e) => onChange(v.id, 'lowStockThreshold', parseInt(e.target.value) || 0)}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-semibold text-slate-600">Backorder</label>
                                                    <div className="flex items-center gap-3">
                                                        <button
                                                            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ${v.allowBackorder ? 'bg-indigo-600' : 'bg-slate-200'}`}
                                                            onClick={() => onChange(v.id, 'allowBackorder', !v.allowBackorder)}
                                                        >
                                                            <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${v.allowBackorder ? 'translate-x-5' : 'translate-x-0'}`}></span>
                                                        </button>
                                                        <span className="text-sm font-medium text-slate-600">Allow backorder</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Variants;
