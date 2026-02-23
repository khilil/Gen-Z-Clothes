import React from 'react';
import {
    ChevronDown,
    ChevronUp,
    Trash2,
    Plus,
    AlertCircle,
    CheckCircle2,
    XCircle,
    RotateCcw,
    Settings2,
    Ruler
} from 'lucide-react';

const Variants = ({ variants, onAdd, onDelete, onChange, onResetSku, onToggleExpand, availableSizes, availableColors, garmentType, onGarmentTypeChange }) => {

    const getStockStatus = (stock, reserved, threshold) => {
        const available = stock - reserved;
        if (available <= 0) return { label: 'Out of Stock', color: 'text-rose-400 bg-rose-500/10 border-rose-500/20', icon: <XCircle size={14} /> };
        if (available <= threshold) return { label: 'Low Stock', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20', icon: <AlertCircle size={14} /> };
        return { label: 'In Stock', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', icon: <CheckCircle2 size={14} /> };
    };

    return (
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-indigo-500/10 p-2 text-indigo-400">
                            <Settings2 size={20} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-white">Variants & Inventory</h2>
                            <p className="text-xs text-slate-500">Manage sizes, colors, and stock</p>
                        </div>
                    </div>
                    <div className="h-10 w-px bg-slate-800"></div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Garment Type</label>
                        <div className="flex gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800">
                            {['top', 'bottom'].map(type => (
                                <button
                                    key={type}
                                    className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${garmentType === type ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900'}`}
                                    onClick={() => onGarmentTypeChange(type)}
                                >
                                    {type === 'top' ? 'Topwear' : 'Bottomwear'}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <button
                    className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-700 hover:shadow-indigo-600/40"
                    onClick={onAdd}
                >
                    <Plus size={16} /> Add Variant
                </button>
            </div>
            <div className="p-6">
                {variants.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-800 p-12 text-center text-slate-500">
                        <p className="mb-2 text-sm font-medium">No variants added yet</p>
                        <p className="text-xs">Click "Add Variant" to create specifications for this product.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {variants.map((v, index) => {
                            const status = getStockStatus(v.stock, v.reservedStock, v.lowStockThreshold);
                            const available = v.stock - v.reservedStock;

                            const sizeObj = availableSizes.find(s => s._id === v.size);
                            const colorObj = availableColors.find(c => c._id === v.color);

                            return (
                                <div key={v.id} className={`overflow-hidden rounded-xl border transition-all ${v.isExpanded ? 'border-indigo-500/50 ring-1 ring-indigo-500/50 shadow-lg shadow-indigo-500/10' : 'border-slate-800'}`}>
                                    <div
                                        className="flex cursor-pointer items-center justify-between bg-slate-900 px-5 py-4 transition-colors hover:bg-slate-800/50"
                                        onClick={() => onToggleExpand(v.id || v._id)}
                                    >
                                        <div className="flex flex-1 items-center gap-4">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="flex h-7 items-center rounded-lg bg-slate-800 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-300 border border-slate-700">
                                                    <span className="text-slate-500 mr-1">Size:</span>
                                                    {sizeObj?.name || 'Select'}
                                                </span>
                                                <span className="flex h-7 items-center rounded-lg bg-slate-800 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-300 border border-slate-700">
                                                    <span className="text-slate-500 mr-1">Color:</span>
                                                    <div className="mr-2 h-3 w-3 rounded-full border border-white/20" style={{ backgroundColor: colorObj?.hexCode || 'transparent' }}></div>
                                                    {colorObj?.name || 'Select'}
                                                </span>
                                            </div>
                                            <span className="hidden text-xs font-medium text-slate-500 sm:block">{v.sku || 'No SKU'}</span>
                                            <div className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${status.color}`}>
                                                {status.icon}
                                                {status.label}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-rose-500/10 hover:text-rose-400"
                                                onClick={(e) => { e.stopPropagation(); onDelete(v.id || v._id); }}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                            <div className="text-slate-500">
                                                {v.isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                            </div>
                                        </div>
                                    </div>

                                    {v.isExpanded && (
                                        <div className="border-t border-slate-800 bg-slate-950 p-5">
                                            {/* Size & Color Selection */}
                                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-semibold text-slate-400">Size</label>
                                                    <select
                                                        className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-200 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                                                        value={v.size}
                                                        onChange={(e) => onChange(v.id, 'size', e.target.value)}
                                                    >
                                                        <option value="">Select Size</option>
                                                        {(availableSizes || []).map(s => (
                                                            <option key={s._id} value={s._id}>{s.name} ({s.categoryType})</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-semibold text-slate-400">Color</label>
                                                    <select
                                                        className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-200 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                                                        value={v.color}
                                                        onChange={(e) => onChange(v.id, 'color', e.target.value)}
                                                    >
                                                        <option value="">Select Color</option>
                                                        {(availableColors || []).map(c => (
                                                            <option key={c._id} value={c._id}>{c.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            {/* Measurements Section */}
                                            <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900/30 p-4">
                                                <div className="mb-4 flex items-center gap-2 text-indigo-400">
                                                    <Ruler size={16} />
                                                    <span className="text-xs font-bold uppercase tracking-wider">Garment Measurements</span>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                                                    {garmentType === 'top' ? (
                                                        <>
                                                            <div className="space-y-1.5">
                                                                <label className="text-[10px] font-bold text-slate-500">Chest (in)</label>
                                                                <input
                                                                    type="number"
                                                                    className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-sm text-slate-200 outline-none focus:border-indigo-500"
                                                                    value={v.measurements?.top?.chest || 0}
                                                                    onChange={(e) => onChange(v.id || v._id, 'meas_top_chest', parseFloat(e.target.value) || 0)}
                                                                />
                                                            </div>
                                                            <div className="space-y-1.5">
                                                                <label className="text-[10px] font-bold text-slate-500">Front Length (in)</label>
                                                                <input
                                                                    type="number"
                                                                    className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-sm text-slate-200 outline-none focus:border-indigo-500"
                                                                    value={v.measurements?.top?.frontLength || 0}
                                                                    onChange={(e) => onChange(v.id || v._id, 'meas_top_frontLength', parseFloat(e.target.value) || 0)}
                                                                />
                                                            </div>
                                                            <div className="space-y-1.5">
                                                                <label className="text-[10px] font-bold text-slate-500">Sleeve Length (in)</label>
                                                                <input
                                                                    type="number"
                                                                    className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-sm text-slate-200 outline-none focus:border-indigo-500"
                                                                    value={v.measurements?.top?.sleeveLength || 0}
                                                                    onChange={(e) => onChange(v.id || v._id, 'meas_top_sleeveLength', parseFloat(e.target.value) || 0)}
                                                                />
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className="space-y-1.5">
                                                                <label className="text-[10px] font-bold text-slate-500">Waist (in)</label>
                                                                <input
                                                                    type="number"
                                                                    className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-sm text-slate-200 outline-none focus:border-indigo-500"
                                                                    value={v.measurements?.bottom?.waist || 0}
                                                                    onChange={(e) => onChange(v.id || v._id, 'meas_bottom_waist', parseFloat(e.target.value) || 0)}
                                                                />
                                                            </div>
                                                            <div className="space-y-1.5">
                                                                <label className="text-[10px] font-bold text-slate-500">Outseam Length (in)</label>
                                                                <input
                                                                    type="number"
                                                                    className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-sm text-slate-200 outline-none focus:border-indigo-500"
                                                                    value={v.measurements?.bottom?.outseamLength || 0}
                                                                    onChange={(e) => onChange(v.id || v._id, 'meas_bottom_outseamLength', parseFloat(e.target.value) || 0)}
                                                                />
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-semibold text-slate-400">Price</label>
                                                    <div className="relative">
                                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">₹</span>
                                                        <input
                                                            type="number"
                                                            className="w-full rounded-lg border border-slate-800 bg-slate-900 pl-7 pr-3 py-2 text-sm text-slate-200 outline-none focus:border-indigo-500"
                                                            value={v.price}
                                                            onChange={(e) => onChange(v.id, 'price', parseFloat(e.target.value) || 0)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-semibold text-slate-400">Stock</label>
                                                    <input
                                                        type="number"
                                                        className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-200 outline-none focus:border-indigo-500"
                                                        value={v.stock}
                                                        onChange={(e) => onChange(v.id, 'stock', parseInt(e.target.value) || 0)}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <label className="text-xs font-semibold text-slate-400">SKU</label>
                                                        {v.isSkuManual && (
                                                            <button
                                                                className="flex items-center gap-1 text-[10px] font-bold text-indigo-400 transition-colors hover:text-indigo-300"
                                                                onClick={() => onResetSku(v.id)}
                                                            >
                                                                <RotateCcw size={10} /> Reset
                                                            </button>
                                                        )}
                                                    </div>
                                                    <input
                                                        type="text"
                                                        placeholder="e.g. TSH-BLK-M"
                                                        className={`w-full rounded-lg border px-3 py-2 text-sm text-slate-200 outline-none transition-all ${v.isSkuManual ? 'border-indigo-500/50 bg-indigo-500/5' : 'border-slate-800 bg-slate-900 focus:border-indigo-500'}`}
                                                        value={v.sku}
                                                        onChange={(e) => onChange(v.id, 'sku', e.target.value)}
                                                    />
                                                </div>
                                            </div>

                                            <div className="mt-5 flex items-center gap-6 rounded-lg bg-slate-900/50 p-4 ring-1 ring-white/5">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Reserved</span>
                                                    <span className="text-sm font-bold text-slate-400">{v.reservedStock}</span>
                                                </div>
                                                <div className="h-8 w-px bg-slate-800"></div>
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Available</span>
                                                    <span className={`text-sm font-black ${available <= v.lowStockThreshold ? 'text-amber-400' : 'text-slate-200'}`}>
                                                        {available}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-semibold text-slate-400">Low Stock Threshold</label>
                                                    <input
                                                        type="number"
                                                        className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-200 outline-none focus:border-indigo-500"
                                                        value={v.lowStockThreshold}
                                                        onChange={(e) => onChange(v.id, 'lowStockThreshold', parseInt(e.target.value) || 0)}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-semibold text-slate-400">Backorder</label>
                                                    <div className="flex items-center gap-3">
                                                        <button
                                                            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ${v.allowBackorder ? 'bg-indigo-600' : 'bg-slate-800'}`}
                                                            onClick={() => onChange(v.id, 'allowBackorder', !v.allowBackorder)}
                                                        >
                                                            <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${v.allowBackorder ? 'translate-x-5' : 'translate-x-0'}`}></span>
                                                        </button>
                                                        <span className="text-sm font-medium text-slate-400">Allow backorder</span>
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
