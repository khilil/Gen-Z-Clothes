import "./ProductCard.css";

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-image-wrap">
        <img src={product.image} alt={product.title} />
        <div className="quick-add">
          <button>Quick Add +</button>
        </div>
      </div>

      <div className="product-info">
        <div className="product-title-row">
          <h3>{product.title}</h3>
          <span>${product.price}</span>
        </div>
        <p>{product.subtitle}</p>
      </div>
    </div>
  );
}
