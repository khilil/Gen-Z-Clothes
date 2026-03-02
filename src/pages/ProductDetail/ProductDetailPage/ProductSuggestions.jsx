import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { fetchProducts } from "../../../api/products.api";

export const ProductSuggestions = ({ product }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef(null);
  const navigate = useNavigate();

  const loadProducts = (pageNum, isInitial = false) => {
    if (!product) return;

    const categorySlug = product.category?.slug || product.category;

    fetchProducts(categorySlug)
      .then(data => {
        const filtered = data.filter(p => p._id !== product._id);

        if (isInitial) {
          setRelatedProducts(filtered.slice(0, 8));
          setHasMore(filtered.length > 8);
        } else {
          setRelatedProducts(prev => {
            const currentIds = new Set(prev.map(p => p._id));
            const newItems = filtered.filter(p => !currentIds.has(p._id)).slice(0, 4);
            if (newItems.length === 0) setHasMore(false);
            return [...prev, ...newItems];
          });
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Suggestions fetch error:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadProducts(1, true);
  }, [product]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage(prev => prev + 1);
          loadProducts(page + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading, page]);

  const handleProductClick = (slug) => {
    navigate(`/product/${slug}`);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  if (!loading && !relatedProducts.length) return null;

  return (
    <section className="py-24 md:py-48 bg-[#0a0a0a] border-t border-white/5 relative overflow-hidden">
      {/* Visual Identity Accents */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>
      <div className="absolute top-20 right-[-10%] w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        <header className="mb-20 md:mb-32 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-center gap-4">
              <span className="w-12 h-[1px] bg-accent"></span>
              <span className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.5em] text-accent">Style Discovery</span>
            </div>
            <h2 className="text-6xl md:text-[8rem] lg:text-[10rem] font-impact tracking-tighter uppercase leading-[0.8] mb-4">
              YOU MAY <br /> <span className="text-white/10" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}>ALSO LIKE</span>
            </h2>
            <p className="text-[11px] md:text-[13px] font-bold uppercase tracking-[0.3em] text-white/40 max-w-xl leading-relaxed">
              Meticulously curated by our creative studio, these selections are engineered to elevate your wardrobe architecture. Explore the discovery feed.
            </p>
          </motion.div>
        </header>

        {/* Vertical Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-10 md:gap-y-24">
          <AnimatePresence>
            {relatedProducts.map((item, idx) => {
              const firstImg = item.variants?.[0]?.images?.[0]?.url || item.images?.[0]?.url || "https://placehold.co/600x800/121212/white?text=No+Image";
              const discount = item.compareAtPrice > item.price
                ? Math.round(((item.compareAtPrice - item.price) / item.compareAtPrice) * 100)
                : 0;

              return (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="group cursor-pointer"
                  onClick={() => handleProductClick(item.slug)}
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#0d0d0d] mb-6 border border-white/5">
                    <img
                      src={firstImg}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110"
                    />

                    {/* Discount Tag */}
                    {discount > 0 && (
                      <div className="absolute top-0 right-0 bg-accent text-black px-3 py-1.5 text-[10px] font-black uppercase tracking-tighter shadow-xl">
                        -{discount}%
                      </div>
                    )}

                    {/* Quick View Interface */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                      <button className="w-full py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        Discover Item
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-[11px] md:text-[13px] font-black uppercase tracking-[0.1em] text-white/90 group-hover:text-accent transition-colors truncate">
                      {item.title}
                    </h3>
                    <div className="flex items-baseline gap-4 pt-1">
                      <span className="text-xl md:text-3xl font-impact tracking-tighter text-white">₹{item.price}</span>
                      {item.compareAtPrice > item.price && (
                        <span className="text-sm md:text-lg font-impact tracking-tight text-white/20 line-through">₹{item.compareAtPrice}</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Infinite Scroll Trigger & Loader */}
        <div ref={observerTarget} className="mt-32 flex flex-col items-center justify-center gap-8 py-20 border-t border-white/5">
          {hasMore ? (
            <>
              <div className="w-12 h-12 border border-accent/20 border-t-accent rounded-full animate-spin"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent/40 animate-pulse">Synchronizing Style Discovery...</span>
            </>
          ) : (
            <div className="text-center space-y-4">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Curated Selections Complete</span>
              <div className="w-24 h-[1px] bg-white/5 mx-auto"></div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

