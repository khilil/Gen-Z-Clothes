import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useCart } from "../../../context/CartContext";

const ProductCard = ({ product, addToCart }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const cardRef = useRef(null);

  // 3D TILT LOGIC
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const primaryVariant = product.variants?.find(v => v.images && v.images.length > 0) || product.variants?.[0];
  const primaryImage = primaryVariant?.images?.find(img => img.isPrimary)?.url || primaryVariant?.images?.[0]?.url;

  const handleAdd = async (e) => {
    e.preventDefault();
    if (isAdding) return;

    setIsAdding(true);
    try {
      await addToCart(product, { variantId: primaryVariant?.sku });
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 2000);
    } catch (error) {
      console.error("Add failed:", error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="group relative bg-[#121212] border border-white/5 overflow-hidden perspective-1000"
    >
      <Link to={`/product/${product.slug}`}>
        <div className="relative aspect-[3/4] overflow-hidden" style={{ transform: "translateZ(50px)" }}>
          <motion.img
            alt={product.title}
            animate={{ scale: isSuccess ? 1.1 : 1 }}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            src={primaryImage || "https://via.placeholder.com/400x500"}
          />

          {/* Holographic Shimmer on Success */}
          <AnimatePresence>
            {isSuccess && (
              <motion.div
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: "100%", opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 pointer-events-none z-10"
              />
            )}
          </AnimatePresence>

          {/* Quick Add Overlay (Desktop) */}
          <div className="hidden lg:block absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 bg-gradient-to-t from-black/90 to-transparent z-20">
            <button
              onClick={handleAdd}
              disabled={isAdding}
              className={`w-full h-12 flex items-center justify-center text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${isSuccess ? "bg-accent text-black" : "bg-white text-black hover:bg-accent"
                }`}
            >
              <AnimatePresence mode="wait">
                {isAdding ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin"
                  />
                ) : isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    SUCCESS
                  </motion.div>
                ) : (
                  <motion.span
                    key="default"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    Quick Add +
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* Quick Add Trigger (Mobile) */}
          <div className="lg:hidden absolute bottom-3 left-1/2 -translate-x-1/2 z-20 w-[85%]">
            <button
              onClick={handleAdd}
              disabled={isAdding}
              className={`w-full h-10 rounded-full flex items-center justify-center gap-2 shadow-2xl active:scale-95 transition-all duration-300 backdrop-blur-md border border-white/10 ${isSuccess ? "bg-accent text-black" : "bg-black/60 text-white"
                }`}
            >
              <AnimatePresence mode="wait">
                {isAdding ? (
                  <motion.div
                    key="m-loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"
                  />
                ) : isSuccess ? (
                  <motion.div
                    key="m-success"
                    initial={{ scale: 0, y: 10 }}
                    animate={{ scale: 1, y: 0 }}
                    className="flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[18px]">done_all</span>
                    <span className="text-[9px] font-black uppercase tracking-widest">Added</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="m-default"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[18px]">add</span>
                    <span className="text-[9px] font-black uppercase tracking-widest">Quick Add</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4 lg:p-6" style={{ transform: "translateZ(30px)" }}>
        <div className="flex justify-between items-start mb-2 gap-2">
          <h3 className="text-[10px] lg:text-[12px] font-black uppercase tracking-[0.2em] leading-tight line-clamp-2">
            {product.title}
          </h3>
          <span className="text-[12px] font-[Oswald] tracking-tight text-accent">
            ₹{product.price}
          </span>
        </div>

        <p className="text-white/40 text-[8px] lg:text-[9px] font-bold uppercase tracking-[0.3em] mb-2">
          {product.brand || product.material}
        </p>

        <p className="text-white/30 text-[10px] lg:text-[11px] font-medium leading-relaxed line-clamp-2">
          {product.shortDescription || product.fullDescription?.substring(0, 60)}
        </p>
      </div>
    </motion.div>
  );
};

export default function ProductSection({ products = [] }) {
  const { addToCart } = useCart();

  return (
    <div className="max-w-[1440px] mx-auto px-4 lg:px-12 py-8 lg:py-12">
      <div className="flex justify-between items-center mb-8 lg:mb-12">
        <p className="text-[9px] lg:text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">
          {products.length} artifacts in collection
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-8">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
}
