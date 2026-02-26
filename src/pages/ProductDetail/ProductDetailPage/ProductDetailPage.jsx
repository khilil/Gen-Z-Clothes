import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductSuggestions } from "./ProductSuggestions";
import Reviews from "./Reviews";
import CollectiveFooter from "../../../components/common/CollectiveFooter/CollectiveFooter";
import { useCart } from "../../../context/CartContext";
import CustomizationModal from "./CustomizationPop_popModel";
import { getProductBySlug } from "../../../services/productService";
import { Link } from "lucide-react";

export default function ProductDetailPage() {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [activeImage, setActiveImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState("");
    const [openAccordion, setOpenAccordion] = useState('fabric');
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const { addToCart } = useCart();

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleContinueCustomization = () => {
        setIsModalOpen(false);
        navigate(`/customize/${product.slug}`, {
            state: {
                productId: product._id,
                title: product.title,
                frontImage: images[0],
                backImage: images[1] || images[0],
                price: product.price,
            },
        });
    };

    const [selectedVariant, setSelectedVariant] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        getProductBySlug(slug)
            .then(res => {
                const fetchedProduct = res.data;
                setProduct(fetchedProduct);

                if (fetchedProduct.variants?.length > 0) {
                    const firstVariant = fetchedProduct.variants[0];
                    setSelectedVariant(firstVariant);
                    setSelectedSize(firstVariant.size?.name || "");
                    console.log("Initial variant selected:", firstVariant._id || firstVariant.id);
                }
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Fetch product error:", err);
                setIsLoading(false);
            });
    }, [slug]);

    const handleAddToBag = () => {
        if (!selectedVariant) {
            toast.error("Please select a size first");
            return;
        }
        // CRITICAL: We use SKU as the identifier because _ids can be unstable during product updates
        addToCart(product, {
            variantId: selectedVariant.sku,
            size: selectedSize,
            color: selectedVariant.color?.name
        });
    };

    const handleQuickBuy = () => {
        if (!product || !selectedVariant) return;
        navigate("/checkout", {
            state: {
                directBuy: {
                    productId: product._id,
                    variantId: selectedVariant.sku, // Use stable SKU
                    quantity: 1,
                    title: product.title,
                    price: product.price,
                    image: selectedVariant.images?.[0]?.url || product.images?.[0]?.url,
                    size: selectedSize
                }
            }
        });
    };

    const handleSizeSelect = (v) => {
        setSelectedVariant(v);
        setSelectedSize(v.size?.name);
    };

    // Extract all images from all variants
    const images = useMemo(() => {
        if (!product) return [];
        const allImgs = [];
        product.variants?.forEach(v => {
            v.images?.forEach(img => {
                if (img.url && !allImgs.includes(img.url)) {
                    allImgs.push(img.url);
                }
            });
        });
        return allImgs.length > 0 ? allImgs : ["https://placehold.co/600x800/121212/white?text=No+Image"];
    }, [product]);

    // Format sizes specifically from variants
    const variants = product?.variants || [];

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">
                <div className="animate-pulse font-[Oswald] tracking-widest uppercase text-accent">Loading Architecture…</div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">
                <div className="text-center space-y-4">
                    <h2 className="text-4xl font-impact">PRODUCT NOT FOUND</h2>
                    <button onClick={() => navigate('/')} className="text-accent uppercase text-[10px] font-black tracking-widest border-b border-accent/30 p-2">Return Home</button>
                </div>
            </div>
        );
    }

    const isCustomizable = product.isCustomizable;
    const isOutOfStock = selectedVariant ? selectedVariant.stock <= 0 : true;

    return (
        <main className="pt-20 bg-[#0a0a0a] text-white selection:bg-[#d4c4b1] selection:text-black overflow-x-hidden">
            <div className="max-w-[1920px] mx-auto px-4 sm:px-8 md:px-12 py-6 md:py-12">
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
                    <section className="w-full lg:w-[60%] xl:w-[45%] space-y-4 md:space-y-6">
                        <div className="relative group">
                            <div className="zoom-container relative aspect-[3/4] overflow-hidden bg-[#121212] border border-white/5 rounded-sm">
                                <img
                                    src={images[activeImage]}
                                    alt={product.title}
                                    className="zoom-image w-full h-full object-cover transition-transform duration-1000"
                                />
                            </div>
                            <div className="absolute inset-0 flex items-center justify-between px-2 md:px-4 pointer-events-none">
                                <button
                                    onClick={() => setActiveImage(i => (i === 0 ? images.length - 1 : i - 1))}
                                    className="pointer-events-auto w-10 h-10 md:w-12 md:h-12 bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                                >
                                    <span className="material-symbols-outlined !text-xl">west</span>
                                </button>
                                <button
                                    onClick={() => setActiveImage(i => (i === images.length - 1 ? 0 : i + 1))}
                                    className="pointer-events-auto w-10 h-10 md:w-12 md:h-12 bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                                >
                                    <span className="material-symbols-outlined !text-xl">east</span>
                                </button>
                            </div>
                        </div>
                        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 snap-x snap-mandatory">
                            {images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveImage(i)}
                                    className={`flex-shrink-0 w-20 sm:w-24 md:w-32 aspect-[4/5] overflow-hidden cursor-pointer transition-all snap-start
                                        ${i === activeImage ? "ring-2 ring-white ring-offset-2 ring-offset-black" : "opacity-50 hover:opacity-100 border border-white/10"}
                                    `}
                                >
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </section>
                    <aside className="w-full lg:w-[40%]">
                        <div className="lg:sticky lg:top-24 space-y-8">
                            <div className="space-y-4">
                                <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                                    <Link to="/">Home</Link>
                                    <span className="material-symbols-outlined text-[12px]">chevron_right</span>
                                    <span className="text-white/60">COLLECTION</span>
                                </nav>
                                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-[Oswald] tracking-tighter leading-[0.9] uppercase">
                                    {product.title}
                                </h1>
                                <div className="flex flex-wrap items-center gap-4 md:gap-6">
                                    <div className="flex items-baseline gap-3">
                                        <span className="text-2xl sm:text-3xl font-[Oswald] text-accent">₹{product.price}</span>
                                        {product.compareAtPrice > product.price && (
                                            <span className="text-sm sm:text-lg font-[Oswald] text-white/20 line-through">₹{product.compareAtPrice}</span>
                                        )}
                                    </div>
                                    <div className="h-4 w-px bg-white/10 hidden sm:block"></div>
                                    <div className="flex items-center gap-2">
                                        <div className="flex text-[#d4c4b1]">
                                            {[1, 2, 3, 4, 5].map(n => (
                                                <span key={n} className="material-symbols-outlined text-xs fill-star">star</span>
                                            ))}
                                        </div>
                                        <span className="text-[10px] font-bold tracking-widest text-white/40">(48)</span>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h4 className="text-[11px] font-black uppercase tracking-[0.3em]">Select Size</h4>
                                    <button className="text-[10px] font-bold uppercase tracking-widest text-[#d4c4b1] border-b border-[#d4c4b1]/30">Size Guide</button>
                                </div>
                                <div className="grid grid-cols-5 gap-2">
                                    {variants.map(v => (
                                        <button
                                            key={v._id}
                                            onClick={() => handleSizeSelect(v)}
                                            className={`h-12 flex items-center justify-center text-[11px] font-bold tracking-widest transition-all border ${selectedVariant?._id === v._id ? "bg-white text-black border-white" : "border-white/10 hover:border-white/40"} ${v.stock <= 0 ? "opacity-30 cursor-not-allowed" : ""}`}
                                        >
                                            {v.size?.name}
                                        </button>
                                    ))}
                                    {variants.length === 0 && <p className="col-span-5 text-[10px] text-white/30 uppercase italic">No sizes available</p>}
                                </div>
                                {selectedVariant && (
                                    <p className="text-[10px] font-black tracking-widest uppercase">
                                        {selectedVariant.stock > 0
                                            ? <span className="text-green-500">In Stock ({selectedVariant.stock} available)</span>
                                            : <span className="text-red-500">Out of Stock</span>
                                        }
                                    </p>
                                )}
                            </div>
                            <div className="space-y-3 pt-4">
                                <button
                                    onClick={handleAddToBag}
                                    disabled={isOutOfStock}
                                    className="w-full h-16 bg-white text-black text-[11px] font-black uppercase tracking-[0.3em] hover:bg-[#d4c4b1] transition-colors flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isOutOfStock ? "Out of Stock" : "Add to Bag"} <span className="material-symbols-outlined">shopping_bag</span>
                                </button>
                                <button
                                    onClick={() => handleQuickBuy()}
                                    disabled={isOutOfStock}
                                    className="w-full h-16 border border-white/10 bg-zinc-950 text-white text-[11px] font-black uppercase tracking-[0.3em] hover:border-white/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Quick Buy
                                </button>


                                {isCustomizable && (
                                    <button
                                        onClick={handleOpenModal}
                                        className="w-full h-16 border border-[#d4c4b1]/40 text-[#d4c4b1] text-[11px] font-black uppercase tracking-[0.3em] hover:bg-[#d4c4b1] hover:text-black transition-all flex items-center justify-center gap-3"
                                    >
                                        Customize Your Own
                                        <span className="material-symbols-outlined">brush</span>
                                    </button>
                                )}

                            </div>

                            {/* Pincode & Info */}
                            <div className="space-y-6 pt-6 border-t border-white/5">
                                <div className="flex border-b border-white/10 focus-within:border-[#d4c4b1] transition-all">
                                    <input
                                        type="text"
                                        placeholder="CHECK DELIVERY PINCODE"
                                        className="bg-transparent border-none text-[10px] font-bold tracking-[0.2em] w-full py-4 px-0 focus:ring-0 placeholder:text-white/20"
                                    />
                                    <button className="text-[10px] font-black uppercase text-[#d4c4b1] px-4">Check</button>
                                </div>

                                {/* Accordions */}
                                <div className="divide-y divide-white/5">
                                    {['fabric', 'shipping'].map((tab) => (
                                        <div key={tab} className="py-5">
                                            <button
                                                onClick={() => setOpenAccordion(openAccordion === tab ? null : tab)}
                                                className="w-full flex justify-between items-center group"
                                            >
                                                <span className="text-[11px] font-black uppercase tracking-[0.3em] group-hover:text-[#d4c4b1] transition-colors">
                                                    {tab === 'fabric' ? 'Composition & Care' : 'Global Shipping'}
                                                </span>
                                                <span className="material-symbols-outlined text-white/20 group-hover:text-white">
                                                    {openAccordion === tab ? "remove" : "add"}
                                                </span>
                                            </button>
                                            {openAccordion === tab && (
                                                <div className="mt-4 text-[11px] text-white/50 leading-relaxed tracking-wide animate-fadeIn">
                                                    {tab === 'fabric'
                                                        ? "100% Organic Egyptian Cotton. Cold wash only. Do not tumble dry."
                                                        : "Ships within 24-48 hours. Express 3-day delivery available worldwide."}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            {/* Bottom Sections */}
            <div className="mt-12">
                <ProductSuggestions product={product} />
                <Reviews />
                <CollectiveFooter />
            </div>

            <CustomizationModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onContinue={handleContinueCustomization}
            />
        </main>
    );
}