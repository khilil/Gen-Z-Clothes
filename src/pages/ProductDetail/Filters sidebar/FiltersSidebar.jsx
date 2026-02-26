import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./FiltersSidebar.css";

export default function FiltersSidebar({
  filters,
  onSizeChange,
  onFitChange,
  onPriceChange,
  onClear,
  availableSizes = [],
  availableFits = [],
  maxPrice = 1000,
  isMobile = false
}) {
  const [activeSections, setActiveSections] = useState({
    size: true,
    fit: true,
    price: true
  });

  const toggleSection = (section) => {
    setActiveSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  return (
    <div className={`${isMobile ? "space-y-10" : "p-5 space-y-10"}`}>
      {!isMobile && (
        <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8">
          <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-white">Filters</h4>
          <button
            onClick={onClear}
            className="text-[9px] font-black text-accent uppercase tracking-widest hover:text-white transition-all flex items-center gap-2 group"
          >
            <span className="w-1 h-1 bg-accent rounded-full group-hover:bg-white transition-colors"></span>
            Reset
          </button>
        </div>
      )}

      {/* SIZE FILTER */}
      <div className="filter-section border-b border-white/5 pb-8">
        <button
          onClick={() => toggleSection('size')}
          className="w-full flex items-center justify-between mb-6 group"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/90 group-hover:text-accent transition-colors">Size</span>
          <span className={`material-symbols-outlined text-[18px] transition-transform duration-300 ${activeSections.size ? 'rotate-180' : ''}`}>
            expand_more
          </span>
        </button>

        <div className={`grid grid-cols-4 gap-2 transition-all duration-300 overflow-hidden ${activeSections.size ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
          {(availableSizes.length > 0 ? availableSizes : ["S", "M", "L", "XL", "2XL"]).map(size => (
            <button
              key={size}
              onClick={() => onSizeChange(size)}
              className={`h-12 flex items-center justify-center text-[10px] font-black transition-all border ${filters.size === size
                ? "bg-accent border-accent text-black shadow-[0_0_20px_rgba(197,160,89,0.3)]"
                : "bg-white/5 border-white/5 text-white/60 hover:border-white/20 hover:text-white"
                }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* FIT/TYPE FILTER */}
      <div className="filter-section border-b border-white/5 pb-8">
        <button
          onClick={() => toggleSection('fit')}
          className="w-full flex items-center justify-between mb-6 group"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/90 group-hover:text-accent transition-colors">Product Type</span>
          <span className={`material-symbols-outlined text-[18px] transition-transform duration-300 ${activeSections.fit ? 'rotate-180' : ''}`}>
            expand_more
          </span>
        </button>

        <div className={`space-y-3 transition-all duration-300 overflow-hidden ${activeSections.fit ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
          {(availableFits.length > 0 ? availableFits : ["tshirt", "jeans", "hoodie", "outerwear"]).map(fit => (
            <label key={fit} className="flex items-center group cursor-pointer py-1">
              <input
                type="checkbox"
                className="hidden"
                checked={filters.fit.includes(fit)}
                onChange={() => onFitChange(fit)}
              />
              <div
                className={`w-4 h-4 border transition-all flex items-center justify-center mr-4 ${filters.fit.includes(fit)
                  ? "bg-accent border-accent"
                  : "bg-white/5 border-white/20 group-hover:border-white/40"
                  }`}
              >
                {filters.fit.includes(fit) && (
                  <span className="material-symbols-outlined text-[12px] text-black font-black">check</span>
                )}
              </div>
              <span
                className={`text-[10px] font-black uppercase tracking-widest transition-colors ${filters.fit.includes(fit) ? "text-white" : "text-white/40 group-hover:text-white/80"
                  }`}
              >
                {fit}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* PRICE RANGE */}
      <div className="filter-section">
        <button
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between mb-8 group"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/90 group-hover:text-accent transition-colors">Price Range</span>
          <motion.span
            animate={{ rotate: activeSections.price ? 180 : 0 }}
            className="material-symbols-outlined text-[18px]"
          >
            expand_more
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {activeSections.price && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="relative h-1 bg-white/10 rounded-full mb-8">
                <div
                  className="absolute top-0 left-0 h-full bg-accent"
                  style={{ width: `${(filters.price / maxPrice) * 100}%` }}
                ></div>
                <input
                  type="range"
                  min="0"
                  max={maxPrice}
                  value={filters.price}
                  onChange={(e) => onPriceChange(Number(e.target.value))}
                  className="absolute top-0 left-0 w-full h-1 bg-transparent appearance-none cursor-pointer range-accent"
                />
              </div>

              <div className="flex justify-between">
                <div className="flex flex-col">
                  <span className="text-[8px] text-white/20 uppercase font-black tracking-widest mb-1">Min</span>
                  <span className="text-[13px] font-impact text-white/60">₹0</span>
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-[8px] text-white/20 uppercase font-black tracking-widest mb-1">Max</span>
                  <span className="text-[13px] font-impact text-accent">₹{filters.price}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {isMobile && (
        <div className="pt-10">
          <button
            onClick={onClear}
            className="w-full py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] hover:bg-accent transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
