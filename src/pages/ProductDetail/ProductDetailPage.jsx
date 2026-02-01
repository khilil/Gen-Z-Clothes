import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetailPage.css";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://api.escuelajs.co/api/v1/products/slug/${slug}`)
      .then(res => res.json())
      .then(setProduct);
  }, [slug]);

  if (!product) return <div className="loader">Loading…</div>;

  return (
    <main className="product-page">

      {/* IMAGE GALLERY */}
      <div className="gallery">
        {product.images.map((img, i) => (
          <div key={i} className="image-wrap">
            <img src={img} alt={product.title} />
          </div>
        ))}
      </div>

      {/* INFO PANEL */}
      <aside className="info-panel">
        <nav className="breadcrumb">
          Home / {product.category?.name} / {product.title}
        </nav>

        <h1 className="title">{product.title}</h1>

        <div className="price">${product.price}</div>

        <p className="description">{product.description}</p>

        {/* SIZE (static UI – later dynamic) */}
        <div className="sizes">
          {["XS","S","M","L","XL"].map(size => (
            <button key={size}>{size}</button>
          ))}
        </div>

        <button className="add-btn">Add to Bag</button>
        <button className="buy-btn">Buy it Now</button>
      </aside>

    </main>
  );
}
