import { useParams } from "react-router-dom";
import { products } from "../../data/products";
import ProductCard from "../../components/product/ProductCard/ProductCard";
import "./ProductListing.css";
import Header from "../../components/common/Header/Header";

export default function ProductListing() {
  const { category } = useParams();

  const filtered = products.filter(
    (p) => p.category === category
  );

  return (
    <>
      <Header />
      <main className="listing-page">
        <section className="listing-hero">
          <span>Collection 04</span>
          <h1>{category}</h1>
          <p>Uncompromising Utility & Form</p>
        </section>

        <section className="listing-grid">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      </main>
    </>
  );
}
