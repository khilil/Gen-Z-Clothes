import { useEffect, useRef, useState } from "react";

export const ProductSuggestions = ({ product }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!product?.category?.id) return;

    fetch(
      `https://api.escuelajs.co/api/v1/categories/${product.category.id}/products?offset=0&limit=8`
    )
      .then(res => res.json())
      .then(data => {
        const filtered = data
          .filter(p => p.id !== product.id)
          .slice(0, 8);

        setRelatedProducts(filtered);
      });
  }, [product]);

  const scroll = direction => {
    if (!scrollRef.current) return;

    const amount = 350;
    scrollRef.current.scrollBy({
      left: direction === "left" ? amount : -amount,
      behavior: "smooth",
    });
  };

  if (!relatedProducts.length) return null;

  // ... (imports and logic remains same)

  return (
    <section className="py-16 md:py-32 bg-black border-t border-white/5">
      <div className="max-w-[1920px] mx-auto px-4 md:px-12">

        {/* HEADER */}
        <div className="flex justify-between items-end mb-8 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-impact tracking-tighter">
            COMPLETE THE LOOK
          </h2>

          {/* Hidden arrows on small mobile to save space, or kept small */}
          <div className="flex gap-2 md:gap-4">
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 md:w-12 md:h-12 border border-white/10 flex items-center justify-center hover:border-white transition"
            >
              <span className="material-symbols-outlined !text-sm md:!text-base">west</span>
            </button>

            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 md:w-12 md:h-12 border border-white/10 flex items-center justify-center hover:border-white transition"
            >
              <span className="material-symbols-outlined !text-sm md:!text-base">east</span>
            </button>
          </div>
        </div>

        {/* HORIZONTAL SCROLL */}
        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-8 overflow-x-auto scroll-smooth no-scrollbar snap-x snap-mandatory"
        >
          {relatedProducts.map(item => (
            <div
              key={item.id}
              className="min-w-[200px] sm:min-w-[280px] group cursor-pointer snap-start"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-charcoal border border-white/5 mb-4 md:mb-6">
                <img
                  src={item.images?.[0]}
                  alt={item.title}
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>

              <h3 className="text-[9px] md:text-[11px] font-black uppercase tracking-widest mb-1 truncate">
                {item.title}
              </h3>

              <p className="text-base md:text-lg font-impact tracking-tight">
                ${item.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
