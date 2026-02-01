import "./FiltersSidebar.css";

export default function FiltersSidebar({
  filters,
  availableSizes = [],
  availableFits = [],
  maxPrice = 1000,
  onSizeChange,
  onFitChange,
  onPriceChange,
  onClear
}) {
  return (
    <aside className="filters-sidebar">
      <div className="filters-inner">

        <h4 className="filters-title">Refine By</h4>

        {/* SIZE */}
        <div className="filter-block">
          <span className="filter-label">Size Selection</span>

          <div className="size-grid">
            {["XS", "S", "M", "L", "XL", "XXL"].map(size => (
              <button
                key={size}
                className={filters.size === size ? "active" : ""}
                onClick={() => onSizeChange(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* FIT */}
        <div className="filter-block">
          <span className="filter-label">Fit Type</span>

          <ul className="checkbox-list">
            {["slim", "regular", "oversized", "relaxed"].map(fit => (
              <li key={fit}>
                <input
                  type="checkbox"
                  checked={filters.fit.includes(fit)}
                  onChange={() => onFitChange(fit)}
                />
                <label>{fit}</label>
              </li>
            ))}
          </ul>
        </div>

        {/* PRICE */}
        <div className="filter-block">
          <span className="filter-label">Price Range</span>

          <input
            type="range"
            min="0"
            max={maxPrice}
            value={filters.price}
            onChange={(e) => onPriceChange(Number(e.target.value))}
          />

          <div className="price-values">
            <span>$0</span>
            <span>${filters.price}</span>
          </div>
        </div>


        <button className="clear-btn" onClick={onClear}>
          Clear Filters
        </button>

      </div>
    </aside>
  );
}
