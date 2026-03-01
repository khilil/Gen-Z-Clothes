import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getProducts } from "../../services/productService";
import ProductSection from "../ProductDetail/ProductSection/ProductSection";
import Header from "../../components/common/Header/Header";
import CollectiveFooter from "../../components/common/CollectiveFooter/CollectiveFooter";
import "./SalePage.css";

function SalePage() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSaleProducts = async () => {
            setIsLoading(true);
            try {
                const response = await getProducts();
                // Filter for products on sale
                const saleProducts = (response.data || []).filter(p => p.isOnSale);
                setProducts(saleProducts);
            } catch (error) {
                console.error("Error fetching sale products:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSaleProducts();
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="sale-page">
            <Header />

            <section className="sale-hero">
                <motion.div
                    className="sale-hero-bg"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 10 }}
                />
                <div className="sale-hero-overlay"></div>

                <div className="sale-hero-content">
                    <motion.span
                        className="sale-tag"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        LIMITED TIME OFFER
                    </motion.span>
                    <motion.h1
                        className="sale-title"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        SEASONAL <br /> SALE
                    </motion.h1>
                    <motion.p
                        className="sale-subtitle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                    >
                        UP TO 50% OFF ON SELECTED ARCHIVES / MODERN ESSENTIALS
                    </motion.p>
                </div>
            </section>

            <div className="sale-container">
                <div className="sale-header-info">
                    <motion.span
                        className="products-count"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        {isLoading ? "LOADING..." : `${products.length} ITEMS ON SALE`}
                    </motion.span>

                    {!isLoading && products.length === 0 && (
                        <div className="no-sale-products">
                            <p>No products are currently on sale. Check back soon!</p>
                        </div>
                    )}
                </div>

                <ProductSection products={products} />
            </div>

            <CollectiveFooter />
        </div>
    );
}

export default SalePage;
