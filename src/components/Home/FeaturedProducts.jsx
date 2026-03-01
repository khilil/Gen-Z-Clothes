import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../services/productService";
import { useCart } from "../../context/CartContext";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { ShoppingBag } from "lucide-react";
import "./FeaturedProducts.css";

function FeaturedProducts() {
    const [activeTab, setActiveTab] = useState("NEW ARRIVALS");
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                const response = await getProducts();
                setProducts(response.data || []);
            } catch (error) {
                console.error("Error fetching featured products:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const filteredProducts = products.filter(product => {
        if (activeTab === "NEW ARRIVALS") return product.isNewArrival;
        if (activeTab === "BEST SELLERS") return product.isBestSeller;
        if (activeTab === "TRENDING") return product.isTrending;
        return true;
    }).slice(0, 8); // Limits to 8 products for the home page

    const handleQuickAdd = (e, product) => {
        e.stopPropagation();
        addToCart(product, 1);
        // Add toast or feedback if needed
    };

    return (
        <section className="featured-products">
            <div className="section-header">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-tag"
                >
                    CURATED SELECTION
                </motion.span>
                <div className="header-flex">
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="section-title"
                    >
                        THE EDIT
                    </motion.h2>

                    <div className="product-tabs">
                        {["NEW ARRIVALS", "BEST SELLERS", "TRENDING"].map((tab) => (
                            <button
                                key={tab}
                                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="products-grid-scroll">
                {isLoading ? (
                    Array(4).fill(0).map((_, i) => (
                        <div key={i} className="product-skeleton">
                            <div className="skeleton-visual"></div>
                            <div className="skeleton-text"></div>
                            <div className="skeleton-text short"></div>
                        </div>
                    ))
                ) : filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => (
                        <motion.div
                            key={product._id}
                            className="product-card-premium"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => navigate(`/product/${product.slug}`)}
                        >
                            <div className="product-visual">
                                <img src={product.images?.[0]?.url || product.image || 'https://placehold.co/600x800?text=No+Image'} alt={product.name} className="main-img" />
                                {product.images?.[1] && (
                                    <img src={product.images?.[1]?.url} alt={product.name} className="hover-img" />
                                )}

                                <div className="product-badges">
                                    {product.isNewArrival && <span className="badge new">NEW</span>}
                                    {product.isTrending && <span className="badge hot">HOT</span>}
                                </div>

                                <motion.button
                                    className="add-to-cart-quick"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={(e) => handleQuickAdd(e, product)}
                                >
                                    <ShoppingBag size={16} />
                                    <span>QUICK ADD</span>
                                </motion.button>
                            </div>

                            <div className="product-details">
                                <div className="details-top">
                                    <span className="p-category">{product.category?.name || "ARCHIVE"}</span>
                                    <span className="p-price">₹{product.price}</span>
                                </div>
                                <h3 className="p-name">{product.name}</h3>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="no-products-msg">NO ARCHIVES FOUND IN THIS COLLECTION.</div>
                )}
            </div>

            <motion.div
                className="explore-more"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                <button onClick={() => navigate("/category/all")} className="view-all-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    VIEW ALL PRODUCTS
                    <div className="link-line"></div>
                </button>
            </motion.div>
        </section>
    );
}

export default FeaturedProducts;
