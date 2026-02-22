import React from 'react';

const Pricing = ({ data, onChange }) => {
    return (
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-sm">
            <div className="border-b border-slate-800 px-6 py-5">
                <h2 className="text-lg font-bold text-white">Pricing Strategy</h2>
            </div>
            <div className="space-y-6 p-6">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Base Price</label>
                        <div className="relative">
                            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-600">₹   </span>
                            <input
                                type="number"
                                className="w-full rounded-xl border border-slate-800 bg-slate-950 pl-8 pr-4 py-2.5 text-sm font-bold text-slate-200 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                                placeholder="0.00"
                                value={data.price}
                                onChange={(e) => onChange('price', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Compare at Price</label>
                        <div className="relative">
                            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-600">₹</span>
                            <input
                                type="number"
                                className="w-full rounded-xl border border-slate-800 bg-slate-950 pl-8 pr-4 py-2.5 text-sm font-bold text-slate-500 line-through outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                                placeholder="0.00"
                                value={data.compareAtPrice}
                                onChange={(e) => onChange('compareAtPrice', e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {data.price && data.compareAtPrice && parseFloat(data.compareAtPrice) > parseFloat(data.price) && (
                    <div className="flex items-center gap-3 rounded-xl bg-emerald-500/10 p-4 ring-1 ring-emerald-500/20">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                            <span className="text-xs font-black">%</span>
                        </div>
                        <p className="text-xs font-bold text-emerald-300">
                            Your customers will save <span className="text-sm font-black text-emerald-400">₹{(parseFloat(data.compareAtPrice) - parseFloat(data.price)).toFixed(2)}</span> ({Math.round(((parseFloat(data.compareAtPrice) - parseFloat(data.price)) / parseFloat(data.compareAtPrice)) * 100)}%)
                        </p>
                    </div>
                )}

                <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4 text-[11px] leading-relaxed text-slate-500">
                    <p>Prices include tax by default. Changes to pricing will be reflected across all storefronts instantly upon publishing.</p>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
