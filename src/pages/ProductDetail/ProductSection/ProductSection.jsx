import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductSection.css";
import { useCart } from "../../../context/CartContext";

export default function ProductSection({ products = [] }) {
  const ITEMS_PER_PAGE = 6;
  const [page, setPage] = useState(1);

  const { addToCart } = useCart();
  const navigate = useNavigate();

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const visibleProducts = products.slice(start, start + ITEMS_PER_PAGE);

  return (
    <div className="product-section">

      <div className="product-section-header">
        <p>Showing {products.length} Artifacts</p>
      </div>

      {products.length === 0 ? (
        <p className="empty-text">No products found</p>
      ) : (
        <>
          <div className="product-grid">
            {visibleProducts.map(product => (
              <div key={product.id} className="product-card" onClick={() => navigate(`/product/${product.slug}`)}>

                <div className="product-image-wrap">
                  <img
                    src={product.images?.[0]}
                    alt={product.title}

                  />

                  <div className="quick-add-btn">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product, { size: "M" });
                      }}
                    >
                      Quick Add +
                    </button>
                  </div>
                </div>

                <div className="product-info">
                  <div className="product-title-row">
                    <h3>{product.title}</h3>
                    <span>${product.price}</span>
                  </div>
                  <p>{product.category?.name}</p>
                </div>

              </div>
            ))}
          </div>

          {/* Pagination stays SAME */}
        </>
      )}
    </div>
  );
}
