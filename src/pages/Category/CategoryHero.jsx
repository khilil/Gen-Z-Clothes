import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCategories } from "../../api/categories.api";
import "./CategoryHero.css";

export default function CategoryHero() {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    fetchCategories().then((cats) => {
      const matched = cats.find(c => c.slug === slug);
      setCategory(matched);
    });
  }, [slug]);

  if (!category) return null; // or loader

  return (
    <section className="category-hero">
      <div
        className="hero-bg"
        style={{
          backgroundImage: `url(${category.image})`
        }}
      >
        <div className="cinematic-overlay"></div>
      </div>

      <div className="hero-content">
        <span className="hero-eyebrow">
          Collection 04
        </span>

        <h1 className="hero-title">
          {category.name}
        </h1>

        <p className="hero-subtitle">
          {getCategorySubtitle(category.slug)}
        </p>
      </div>
    </section>
  );
}

/* 🔥 subtitle logic */
function getCategorySubtitle(slug) {
  switch (slug) {
    case "clothes":
      return "Modern Essentials & Daily Wear";
    case "electronics":
      return "Smart Tech & Innovation";
    case "shoes":
      return "Designed for Motion & Style";
    case "furniture":
      return "Crafted Comfort & Design";
    case "miscellaneous":
      return "Curated Lifestyle Objects";
    default:
      return "Uncompromising Utility & Form";
  }
}
