import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { useNavigate } from "react-router-dom";
import "./Categories.css";

const categoryItems = [
  {
    title: "SHIRTS",
    slug: "shirts",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1976&auto=format&fit=crop",
    size: "large"
  },
  {
    title: "T-SHIRTS",
    slug: "t-shirt",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1974&auto=format&fit=crop",
    size: "small"
  },
  {
    title: "JEANS",
    slug: "jeans",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1926&auto=format&fit=crop",
    size: "small"
  },
  {
    title: "JACKETS",
    slug: "jacket",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1935&auto=format&fit=crop",
    size: "medium"
  },
  {
    title: "HOODIES",
    slug: "hoodie",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1974&auto=format&fit=crop",
    size: "medium"
  }
];

function Categories() {
  const navigate = useNavigate();

  return (
    <section className="categories-section">
      <div className="section-header">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-tag"
        >
          COLLECTIONS
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="section-title"
        >
          SHOP BY CATEGORY
        </motion.h2>
      </div>

      <div className="categories-grid">
        {categoryItems.map((item, index) => (
          <motion.div
            key={index}
            className={`category-card ${item.size}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            onClick={() => navigate(`/category/${item.slug}`)}
          >
            <img src={item.image} alt={item.title} />
            <div className="category-overlay"></div>
            <div className="category-content">
              <h3>{item.title}</h3>
              <span className="shop-link">EXPLORE NOW</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Categories;
