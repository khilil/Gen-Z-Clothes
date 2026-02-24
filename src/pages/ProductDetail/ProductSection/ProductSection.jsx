import { Link } from "react-router-dom";
import { useCart } from "../../../context/CartContext";

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
        {products.map((product) => {
          // Find the first variant that has images, or just take the first variant
          const primaryVariant = product.variants?.find(v => v.images && v.images.length > 0) || product.variants?.[0];
          const primaryImage = primaryVariant?.images?.find(img => img.isPrimary)?.url || primaryVariant?.images?.[0]?.url;

          return (
            <div
              key={product._id}
              className="group relative bg-[#121212] border border-white/5 overflow-hidden"
            >
              <Link to={`/product/${product.slug}`}>
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    src={primaryImage || "https://via.placeholder.com/400x500"}
                  />

                  {/* Quick Add Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-2 lg:p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 bg-gradient-to-t from-black/90 to-transparent">
                    <button
                      onClick={(e) => {
                        e.preventDefault(); // prevents navigation
                        addToCart(product);
                      }}
                      className="w-full h-10 lg:h-12 bg-white text-black text-[8px] lg:text-[10px] font-black uppercase tracking-widest hover:bg-accent transition-colors"
                    >
                      Quick Add +
                    </button>
                  </div>
                </div>
              </Link>

              {/* Product Info */}
              <div className="p-4 lg:p-6">
                <div className="flex justify-between items-start mb-2 gap-2">
                  <h3 className="text-[10px] lg:text-[12px] font-black uppercase tracking-widest leading-tight line-clamp-2">
                    {product.title}
                  </h3>
                  <span className="text-[12px] font-[Oswald] tracking-tight">
                    ₹{product.price}
                  </span>
                </div>

                {/* Material or Brand */}
                <p className="text-white/40 text-[8px] lg:text-[9px] font-bold uppercase tracking-widest mb-2">
                  {product.brand || product.material}
                </p>

                {/* Short Description */}
                <p className="text-white/30 text-[10px] lg:text-[11px] leading-relaxed line-clamp-2">
                  {product.shortDescription || product.fullDescription?.substring(0, 60)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
