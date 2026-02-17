import { useMemo } from "react";

export default function PricingCard({ pricing, setPricing }) {
  const profitMargin = useMemo(() => {
    if (!pricing.base || pricing.base <= 0) return 0;
    return Math.round(((pricing.base - pricing.cost) / pricing.base) * 100);
  }, [pricing.base, pricing.cost]);

  return (
    <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-primary/5 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">Pricing</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">Base Price</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
            <input 
              type="number" 
              value={pricing.base}
              onChange={(e) => setPricing({...pricing, base: parseFloat(e.target.value) || 0})}
              className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg focus:ring-2 focus:ring-primary/40 p-2.5 pl-8 text-sm dark:text-slate-200" 
            />
          </div>
        </div>
        <div className="pt-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Profit Margin</span>
            <span className={`${profitMargin > 0 ? 'text-emerald-500' : 'text-red-500'} font-semibold`}>
              {profitMargin}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mt-2 overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${profitMargin > 30 ? 'bg-emerald-500' : 'bg-amber-500'}`} 
              style={{ width: `${Math.min(Math.max(profitMargin, 0), 100)}%` }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}