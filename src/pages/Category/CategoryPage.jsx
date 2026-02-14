import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../../api/products.api";

import FiltersSidebar from "../../pages/ProductDetail/Filters sidebar/FiltersSidebar";
import ProductSection from "../../pages/ProductDetail/ProductSection/ProductSection";
import CategoryHero from "./CategoryHero";
import CollectiveFooter from "../../components/common/CollectiveFooter/CollectiveFooter";

export default function CategoryPage() {
  const { slug } = useParams();
  const [allProducts, setAllProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  // મોબાઈલ ડ્રોઅર કંટ્રોલ કરવા માટે
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [filters, setFilters] = useState({
    size: null,
    fit: [],
    price: 1000
  });

  const availableSizes = [...new Set(allProducts.flatMap(p => p.size || []))];
  const availableFits = [...new Set(allProducts.map(p => p.fit).filter(Boolean))];
  const maxPrice = allProducts.length > 0 ? Math.max(...allProducts.map(p => p.price)) : 1000;

  const handleSizeChange = size => setFilters(prev => ({ ...prev, size }));

  const handleFitChange = fit => {
    setFilters(prev => ({
      ...prev,
      fit: prev.fit.includes(fit)
        ? prev.fit.filter(f => f !== fit)
        : [...prev.fit, fit]
    }));
  };

  const handlePriceChange = price => setFilters(prev => ({ ...prev, price }));

  const handleClear = () => {
    setFilters({
      size: null,
      fit: [],
      price: maxPrice
    });
  };

  /* FETCH API */
  useEffect(() => {
    fetchProducts().then(data => {
      setAllProducts(data);
    });
  }, []);

  /* FILTER LOGIC */
  useEffect(() => {
    let result = allProducts.filter(p => p.category?.slug === slug);

    if (filters.size) {
      result = result.filter(p => p.size?.includes(filters.size));
    }
    if (filters.fit.length > 0) {
      result = result.filter(p => p.fit && filters.fit.includes(p.fit.toLowerCase()));
    }
    result = result.filter(p => p.price <= filters.price);

    setFiltered(result);
  }, [allProducts, slug, filters]);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#0a0a0a] text-white">

      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden pt-5 lg:pt-20">

        {/* --- MOBILE FILTER STICKY BAR (ફક્ત મોબાઈલ માટે) --- */}
        <div className="lg:hidden sticky top-0 z-40 bg-black border-b border-white/10 w-full h-14 flex items-center px-4 justify-between shrink-0">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">tune</span>
            <span className="text-[10px] font-black uppercase tracking-widest">Filter</span>
          </button>
          <div className="h-4 w-px bg-white/10"></div>
          <button className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest">Sort: Featured</span>
            <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
          </button>
        </div>

        {/* DESKTOP SIDEBAR - (મોબાઈલમાં છુપાઈ જશે) */}
        <aside className="hidden lg:block w-80 h-full border-r border-white/5 bg-black/20 overflow-y-auto custom-scrollbar">
          <FiltersSidebar
            filters={filters}
            availableSizes={availableSizes}
            availableFits={availableFits}
            maxPrice={maxPrice}
            onSizeChange={handleSizeChange}
            onFitChange={handleFitChange}
            onPriceChange={handlePriceChange}
            onClear={handleClear}
          />
        </aside>

        {/* --- MOBILE DRAWER CONTENT --- */}
        {isDrawerOpen && (
          <div className="fixed inset-0 z-[70] lg:hidden">
            {/* Dark Overlay */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
              onClick={() => setIsDrawerOpen(false)}
            ></div>

            {/* Drawer Body */}
            <div className="absolute bottom-0 left-0 right-0 bg-[#121212] border-t border-white/10 rounded-t-3xl max-h-[85vh] overflow-y-auto transform transition-transform duration-500">
              <div className="p-8">
                <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-8"></div>
                <div className="flex items-center justify-between mb-10">
                  <h4 className="text-[14px] font-black uppercase tracking-[0.3em]">Refine By</h4>
                  <button onClick={() => setIsDrawerOpen(false)}>
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>

                {/* સાઈડબારના જ કોમ્પોનન્ટને આપણે ડ્રોઅરમાં રિયુઝ કરીએ છીએ */}
                <FiltersSidebar
                  filters={filters}
                  availableSizes={availableSizes}
                  availableFits={availableFits}
                  maxPrice={maxPrice}
                  onSizeChange={handleSizeChange}
                  onFitChange={handleFitChange}
                  onPriceChange={handlePriceChange}
                  onClear={handleClear}
                />

                <div className="grid grid-cols-2 gap-4 sticky bottom-0 mt-8 pt-4 bg-[#121212]">
                  <button
                    onClick={() => { handleClear(); setIsDrawerOpen(false); }}
                    className="py-4 text-[10px] font-black uppercase tracking-widest border border-white/10"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="py-4 text-[10px] font-black uppercase tracking-widest bg-white text-black"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 h-full overflow-y-auto custom-scrollbar">
          <CategoryHero />
          <div className="min-h-screen">
            <ProductSection products={filtered} />
          </div>
          {/* <CollectiveFooter /> */}
        </div>

      </main>
    </div>
  );
}