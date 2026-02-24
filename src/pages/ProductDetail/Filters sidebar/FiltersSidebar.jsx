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
  return (
    <div className={`${isMobile ? "space-y-10" : "p-5 space-y-10"}`}>
      {!isMobile && (
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <h4 className="text-[11px] font-black uppercase tracking-[0.3em]">Refine By</h4>
          <button
            onClick={onClear}
            className="text-[9px] font-bold text-white/40 uppercase tracking-widest hover:text-white transition-colors"
          >
            Reset
          </button>
        </div>
      )}

      {/* SIZE FILTER */}
      <div className="space-y-6">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">Size</span>
        <div className="grid grid-cols-3 gap-px bg-white/5 border border-white/5">
          {(availableSizes.length > 0 ? availableSizes : ["S", "M", "L", "XL"]).map(size => (
            <button
              key={size}
              onClick={() => onSizeChange(size)}
              className={`py-4 text-[10px] font-bold transition-all ${filters.size === size ? "bg-accent text-black" : "bg-black hover:bg-white/10"
                }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* FIT/TYPE FILTER */}
      <div className="space-y-6">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">Product Type</span>
        <div className="space-y-4">
          {(availableFits.length > 0 ? availableFits : ["tshirt", "jeans"]).map(fit => (
            <label key={fit} className="flex items-center group cursor-pointer">
              <input
                type="checkbox"
                className="hidden"
                checked={filters.fit.includes(fit)}
                onChange={() => onFitChange(fit)}
              />
              <div
                className={`w-3 h-3 border border-white/20 mr-4 flex items-center justify-center transition-all ${filters.fit.includes(fit) ? "bg-accent border-accent" : ""
                  }`}
              >
                {filters.fit.includes(fit) && (
                  <span className="material-symbols-outlined text-[10px] text-black">check</span>
                )}
              </div>
              <span
                className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${filters.fit.includes(fit) ? "text-accent" : "text-white/40 group-hover:text-white"
                  }`}
              >
                {fit}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* PRICE RANGE */}
      <div className="space-y-6">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">Price Range</span>
        <div className="mt-8 px-1">
          <input
            type="range"
            min="0"
            max={maxPrice}
            value={filters.price}
            onChange={(e) => onPriceChange(Number(e.target.value))}
            className="w-full h-px bg-white/10 appearance-none cursor-pointer accent-accent"
          />
          <div className="flex justify-between mt-6">
            <div className="flex flex-col">
              <span className="text-[8px] text-white/30 uppercase font-black">Min</span>
              <span className="text-[11px] font-impact mt-1">₹0</span>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-[8px] text-white/30 uppercase font-black">Max</span>
              <span className="text-[11px] font-impact mt-1">₹{filters.price}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
