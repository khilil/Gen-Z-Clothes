import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../../api/products.api";

import FiltersSidebar from "../../pages/ProductDetail/Filters sidebar/FiltersSidebar";
import ProductSection from "../../pages/ProductDetail/ProductSection/ProductSection";
import CategoryHero from "./CategoryHero"

import './CategoryPage.css'
import CollectiveFooter from "../../components/common/CollectiveFooter/CollectiveFooter";

export default function CategoryPage() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);

  const [allProducts, setAllProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [filters, setFilters] = useState({
    size: null,
    fit: [],
    price: 1000
  });

  const availableSizes = [
    ...new Set(products.flatMap(p => p.size || []))
  ];

  const availableFits = [
    ...new Set(products.map(p => p.fit).filter(Boolean))
  ];

  const maxPrice = Math.max(...products.map(p => p.price), 1000);

  const handleSizeChange = size => {
    setFilters(prev => ({ ...prev, size }));
  };

  const handleFitChange = fit => {
    setFilters(prev => ({
      ...prev,
      fit: prev.fit.includes(fit)
        ? prev.fit.filter(f => f !== fit)
        : [...prev.fit, fit]
    }));
  };

  const handlePriceChange = price => {
    setFilters(prev => ({ ...prev, price }));
  };

  const handleClear = () => {
    setFilters({
      size: "",
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
    let result = allProducts.filter(
      p => p.category?.slug === slug
    );

    // PRICE
    result = result.filter(p => p.price <= filters.price);

    setFiltered(result);
  }, [allProducts, slug, filters]);

  return (
    <>
      <CategoryHero />
      <div className="category-layout">
        <div className="sidebar">
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

        </div>
        <div className="products">
          <ProductSection products={filtered} />
        </div>
      </div>
        <CollectiveFooter/>
    </>
  );
}
