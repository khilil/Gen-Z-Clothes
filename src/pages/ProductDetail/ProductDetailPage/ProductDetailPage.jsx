import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductSuggestions } from "./ProductSuggestions";
import Reviews from "./Reviews";
import CollectiveFooter from "../../../components/common/CollectiveFooter/CollectiveFooter";
import { useCart } from "../../../context/CartContext";
import { useNavigate } from "react-router-dom";

/**
 * ProductDetailPage
 * -----------------
 * Pixel-perfect Tailwind conversion of the luxury product page.
 * UI matches original HTML exactly.
 * Tailwind is treated as the design system.
 */
export default function ProductDetailPage() {
    const { slug } = useParams();

    const [product, setProduct] = useState(null);
    const [activeImage, setActiveImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState("M");
    const [openAccordion, setOpenAccordion] = useState(null);
    const navigate = useNavigate();

    const { addToCart } = useCart();

    useEffect(() => {
        fetch(`https://api.escuelajs.co/api/v1/products/slug/${slug}`)
            .then(res => res.json())
            .then(setProduct);
    }, [slug]);

    if (!product) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">
                Loading…
            </div>
        );
    }

    const images = product.images?.length
        ? product.images
        : [product.images?.[0]];

    return (
        <main className="pt-20 bg-[#0a0a0a] text-white selection:bg-[#d4c4b1] selection:text-black">
            <div className="max-w-[1920px] mx-auto px-8 md:px-12 py-12">
                <div className="flex flex-row lg:flex-row gap-16">


                    {/* =========================
              GALLERY
          ========================= */}
                    <section className="lg:w-3/5 space-y-6">
                        <div className="relative group">
                            <div className="zoom-container relative aspect-[4/5] overflow-hidden bg-[#121212] border border-white/5">
                                <img
                                    src={images[activeImage]}
                                    alt={product.title}
                                    className="zoom-image w-full h-full object-cover transition-transform duration-1000"
                                />
                            </div>

                            {/* Prev / Next */}
                            <button
                                onClick={() =>
                                    setActiveImage(i => (i === 0 ? images.length - 1 : i - 1))
                                }
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                            >
                                <span className="material-symbols-outlined">west</span>
                            </button>

                            <button
                                onClick={() =>
                                    setActiveImage(i => (i === images.length - 1 ? 0 : i + 1))
                                }
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                            >
                                <span className="material-symbols-outlined">east</span>
                            </button>
                        </div>

                        {/* Thumbnails */}
                        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                            {images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveImage(i)}
                                    className={`flex-shrink-0 w-24 md:w-32 aspect-[4/5] overflow-hidden cursor-pointer transition-colors
                    ${i === activeImage ? "border-2 border-white" : "border border-white/10 hover:border-white/40"}
                  `}
                                >
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* =========================
              INFO PANEL
          ========================= */}
                    <aside className="lg:w-2/5 relative">
                        <div className="sticky top-[120px] space-y-10">

                            {/* Breadcrumb + Title */}
                            <div>
                                <nav className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.2em] text-white/40 mb-8">
                                    <span>Home</span>
                                    <span className="material-symbols-outlined text-[10px]">chevron_right</span>
                                    <span>{product.category?.name}</span>
                                </nav>

                                <h1 className="text-5xl md:text-7xl font-[Oswald] tracking-tighter leading-none mb-4 uppercase">
                                    {product.title}
                                </h1>

                                {/* Reviews */}
                                <div className="flex items-center gap-6 mb-6">
                                    <div className="flex gap-1 text-[#d4c4b1]">
                                        {[1, 2, 3, 4].map(n => (
                                            <span key={n} className="material-symbols-outlined text-sm fill-star">
                                                star
                                            </span>
                                        ))}
                                        <span className="material-symbols-outlined text-sm">star_half</span>
                                    </div>
                                    <span className="text-[10px] font-bold tracking-widest text-white/40">
                                        (48 REVIEWS)
                                    </span>
                                </div>

                                {/* Price */}
                                <div className="flex items-baseline gap-4">
                                    <span className="text-3xl font-[Oswald] tracking-tight text-[#d4c4b1]">
                                        ${product.price}.00
                                    </span>
                                    <span className="text-lg font-[Oswald] tracking-tight text-white/20 line-through">
                                        ${product.price + 40}.00
                                    </span>
                                </div>
                            </div>

                            {/* Palette */}
                            <div className="space-y-4">
                                <h4 className="text-[11px] font-black uppercase tracking-[0.3em]">
                                    Palette:
                                    <span className="text-white/40 ml-2">Optic White</span>
                                </h4>
                                <div className="flex gap-4">
                                    <span className="w-8 h-8 bg-white ring-2 ring-white ring-offset-4 ring-offset-black rounded-full" />
                                    <span className="w-8 h-8 bg-[#121212] border border-white/20 rounded-full hover:scale-110 transition-transform" />
                                    <span className="w-8 h-8 bg-[#d4c4b1] border border-white/20 rounded-full hover:scale-110 transition-transform" />
                                    <span className="w-8 h-8 bg-[#2d3a3a] border border-white/20 rounded-full hover:scale-110 transition-transform" />
                                </div>
                            </div>

                            {/* Sizes */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h4 className="text-[11px] font-black uppercase tracking-[0.3em]">
                                        Select Size
                                    </h4>
                                    <button className="text-[9px] font-bold uppercase tracking-widest text-[#d4c4b1] border-b border-[#d4c4b1]/30">
                                        Size Guide
                                    </button>
                                </div>

                                <div className="grid grid-cols-5 gap-3">
                                    {["XS", "S", "M", "L", "XL"].map(size => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`h-12 text-[10px] font-bold uppercase tracking-widest transition-colors
                        ${selectedSize === size
                                                    ? "bg-white text-black border border-white"
                                                    : "border border-white/10 hover:border-white"}
                      `}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="space-y-4 pt-4">
                                <button className="w-full h-16 bg-white text-black text-[11px] font-black uppercase tracking-[0.3em] hover:bg-[#d4c4b1] transition-colors flex items-center justify-center gap-3"
                                    onClick={() => addToCart(product, { size: selectedSize })}>
                                    Add to Bag
                                    <span className="material-symbols-outlined">shopping_bag</span>
                                </button>

                                <button className="w-full h-16 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] text-white text-[11px] font-black uppercase tracking-[0.3em] border border-white/10 hover:border-white/40 transition-colors">
                                    Buy it Now
                                </button>

                                <div className="pt-6">
                                    <button
                                        className="w-full h-16 border border-white/40 text-white text-[11px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3"
                                        onClick={() =>
                                            navigate(`/customize/${product.slug}`, {
                                                state: {
                                                    productId: product.id,
                                                    title: product.title,
                                                    image: product.images?.[0],
                                                    price: product.price,
                                                },
                                            })
                                        }
                                    >
                                        Customize Your Own
                                        <span className="material-symbols-outlined text-lg">brush</span>
                                    </button>

                                    <p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-white/40 text-center">
                                        Create a unique piece with our template-based design studio.
                                    </p>
                                </div>
                            </div>

                            {/* =========================
    DELIVERY OPTIONS
========================= */}
                            <div className="pt-8 border-t border-white/5">
                                <h4 className="text-[11px] font-black uppercase tracking-[0.3em] mb-4">
                                    Delivery Options
                                </h4>

                                <div className="flex border-b border-white/20 focus-within:border-white transition-colors">
                                    <input
                                        type="text"
                                        placeholder="Enter Pincode"
                                        className="bg-transparent border-none text-[11px] font-bold tracking-widest placeholder:text-white/10 focus:ring-0 flex-1 py-3 px-0"
                                    />
                                    <button className="text-[10px] font-black uppercase tracking-widest text-[#d4c4b1]">
                                        Check
                                    </button>
                                </div>
                            </div>

                            {/* =========================
    ACCORDIONS
========================= */}
                            <div className="divide-y divide-white/5 border-t border-b border-white/5">

                                {/* Fabric & Care */}
                                <div className="py-6">
                                    <button
                                        onClick={() =>
                                            setOpenAccordion(openAccordion === "fabric" ? null : "fabric")
                                        }
                                        className="w-full flex justify-between items-center group"
                                    >
                                        <span className="text-[11px] font-black uppercase tracking-[0.3em]">
                                            Fabric & Care
                                        </span>
                                        <span className="material-symbols-outlined text-white/40 group-hover:text-white">
                                            {openAccordion === "fabric" ? "remove" : "add"}
                                        </span>
                                    </button>

                                    {openAccordion === "fabric" && (
                                        <p className="mt-4 text-[11px] text-white/60 leading-relaxed tracking-wide">
                                            Crafted from premium long-staple cotton. Machine wash cold. Do not
                                            bleach. Iron at medium temperature. Designed to retain structure and
                                            softness over time.
                                        </p>
                                    )}
                                </div>

                                {/* Shipping & Returns */}
                                <div className="py-6">
                                    <button
                                        onClick={() =>
                                            setOpenAccordion(openAccordion === "shipping" ? null : "shipping")
                                        }
                                        className="w-full flex justify-between items-center group"
                                    >
                                        <span className="text-[11px] font-black uppercase tracking-[0.3em]">
                                            Shipping & Returns
                                        </span>
                                        <span className="material-symbols-outlined text-white/40 group-hover:text-white">
                                            {openAccordion === "shipping" ? "remove" : "add"}
                                        </span>
                                    </button>

                                    {openAccordion === "shipping" && (
                                        <p className="mt-4 text-[11px] text-white/60 leading-relaxed tracking-wide">
                                            Free standard shipping on orders above $150. Easy returns within 14
                                            days of delivery. Items must be unused and in original condition.
                                        </p>
                                    )}
                                </div>

                            </div>


                        </div>

                    </aside>

                </div>
            </div>
            <ProductSuggestions product={product} />
            <Reviews />
            <CollectiveFooter />
        </main>
    );
}
