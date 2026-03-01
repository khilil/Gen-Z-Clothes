import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ProductSuggestions } from "./ProductSuggestions";
import Reviews from "./Reviews";
import CollectiveFooter from "../../../components/common/CollectiveFooter/CollectiveFooter";
import { useCart } from "../../../context/CartContext";
import CustomizationModal from "./CustomizationPop_popModel";
import { getProductBySlug } from "../../../services/productService";
// Replacing toast dependency with local notification state

export default function ProductDetailPage() {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [activeImage, setActiveImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState(null);
    const [pincode, setPincode] = useState("");
    const [pincodeStatus, setPincodeStatus] = useState(null);
    const [openAccordion, setOpenAccordion] = useState('fabric');
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [notification, setNotification] = useState(null); // Local notification state
    const [isAdded, setIsAdded] = useState(false);
    const [isQuickBuying, setIsQuickBuying] = useState(false);

    const showNotification = (message, type = "error") => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

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
                if (!res || !res.data) {
                    console.error("Invalid product response:", res);
                    setIsLoading(false);
                    return;
                }
                const fetchedProduct = res.data;
                setProduct(fetchedProduct);

                if (fetchedProduct.variants?.length > 0) {
                    const firstVariant = fetchedProduct.variants[0];
                    setSelectedVariant(firstVariant);
                    setSelectedColor(firstVariant.color);
                    setSelectedSize(firstVariant.size?.name || "");
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
            showNotification("Please select a size first");
            return;
        }
        // CRITICAL: We use SKU as the identifier because _ids can be unstable during product updates
        addToCart(product, {
            variantId: selectedVariant.sku,
            size: selectedSize,
            color: selectedVariant.color?.name
        });

        // Trigger local success animation
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    const handleQuickBuy = () => {
        if (!product || !selectedVariant) {
            showNotification("Please select a size first");
            return;
        }

        setIsQuickBuying(true);

        // Minimal delay for visual feedback before navigation
        setTimeout(() => {
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
            setIsQuickBuying(false);
        }, 800);
    };

    const handleSizeSelect = (v) => {
        setSelectedVariant(v);
        setSelectedSize(v.size?.name);

        // SYNC IMAGE: If this variant has images, show the first one
        if (v.images && v.images.length > 0) {
            // Find the index of this image in the main 'images' array
            const imgUrl = v.images[0].url;
            const fullIndex = images.findIndex(url => url === imgUrl);
            if (fullIndex !== -1) {
                setActiveImage(fullIndex);
            }
        }
    };

    const handlePincodeCheck = () => {
        if (!pincode || pincode.length !== 6 || isNaN(pincode)) {
            showNotification("Please enter a valid 6-digit numeric pincode");
            return;
        }

        setPincodeStatus("checking");

        // Simulate API delay
        setTimeout(() => {
            // Mock logic: pincodes starting with '0' or '9' are non-serviceable
            if (pincode.startsWith('0') || pincode.startsWith('9')) {
                setPincodeStatus("unserviceable");
                showNotification("Sorry, we do not ship to this pincode yet", "error");
            } else {
                setPincodeStatus("available");
                showNotification("Delivery available to " + pincode, "success");
            }
        }, 1200);
    };

    // Extract all images from all variants
    const images = useMemo(() => {
        if (!product || !selectedColor) {
            if (!product) return ["https://placehold.co/600x800/121212/white?text=No+Image"];
            // Fallback to all images if no color selected (though one should be selected by default)
            const allImgs = [];
            product.variants?.forEach(v => {
                v.images?.forEach(img => {
                    if (img.url && !allImgs.includes(img.url)) {
                        allImgs.push(img.url);
                    }
                });
            });
            return allImgs.length > 0 ? allImgs : ["https://placehold.co/600x800/121212/white?text=No+Image"];
        }

        const colorImgs = [];
        product.variants?.forEach(v => {
            if ((v.color?._id || v.color?.name) === (selectedColor._id || selectedColor.name)) {
                v.images?.forEach(img => {
                    if (img.url && !colorImgs.includes(img.url)) {
                        colorImgs.push(img.url);
                    }
                });
            }
        });

        return colorImgs.length > 0 ? colorImgs : ["https://placehold.co/600x800/121212/white?text=No+Image"];
    }, [product, selectedColor]);

    // Unique colors from variants
    const uniqueColors = useMemo(() => {
        if (!product || !product.variants) return [];
        const colors = [];
        const seen = new Set();
        product.variants.forEach(v => {
            // Support both populated objects and ID strings
            const col = v.color;
            if (!col) return;

            const colorId = typeof col === 'object' ? (col._id || col.name) : col;
            if (colorId && !seen.has(colorId)) {
                seen.add(colorId);
                colors.push(typeof col === 'object' ? col : { _id: col, name: 'Standard', hexCode: '#000000' });
            }
        });
        return colors;
    }, [product]);

    // Filtered variants based on selected color
    const filteredVariants = useMemo(() => {
        if (!product || !product.variants || !selectedColor) return [];
        return product.variants.filter(v => (v.color?._id || v.color?.name) === (selectedColor._id || selectedColor.name));
    }, [product, selectedColor]);

    const handleColorSelect = (color) => {
        setSelectedColor(color);
        setActiveImage(0); // Reset gallery
        // Automatically select the first available size for this color
        const firstAvailable = product.variants.find(v => (v.color?._id || v.color?.name) === (color._id || color.name));
        if (firstAvailable) {
            setSelectedVariant(firstAvailable);
            setSelectedSize(firstAvailable.size?.name);
        }
    };

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
            <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 py-6 md:py-12">
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
                    <section className="w-full lg:w-[45%] xl:w-[40%] space-y-4 md:space-y-6 lg:sticky lg:top-24">
                        <div className="relative group">
                            <div className="zoom-container relative aspect-[4/5] overflow-hidden bg-[#121212] border border-white/5 rounded-sm">
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
                        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 snap-x snap-mandatory">
                            {images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveImage(i)}
                                    className={`flex-shrink-0 w-16 sm:w-20 md:w-24 aspect-[4/5] overflow-hidden cursor-pointer transition-all snap-start
                                        ${i === activeImage ? "ring-2 ring-white ring-offset-2 ring-offset-black" : "opacity-50 hover:opacity-100 border border-white/10"}
                                    `}
                                >
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </section>
                    <aside className="w-full lg:w-[55%] xl:w-[60%]">
                        <div className="lg:sticky lg:top-24 space-y-8">
                            <div className="space-y-4">
                                <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                                    <Link to="/" className="hover:text-white transition-colors">Home</Link>
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
                                        <div className="flex text-[#d4c4b1] items-center">
                                            {[1, 2, 3, 4].map(n => (
                                                <span key={n} className="material-symbols-outlined text-sm fill-star">star</span>
                                            ))}
                                            <span className="material-symbols-outlined text-sm">star_half</span>
                                        </div>
                                        <span className="text-[10px] font-bold tracking-widest text-white/40">(1240)</span>
                                    </div>
                                </div>
                            </div>

                            {/* Color Palette */}
                            {uniqueColors.length > 0 && (
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h4 className="text-[11px] font-black uppercase tracking-[0.3em]">Select Color</h4>
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">{selectedColor?.name}</span>
                                    </div>
                                    <div className="flex gap-4">
                                        {uniqueColors.map((color) => (
                                            <button
                                                key={color._id || color.name}
                                                onClick={() => handleColorSelect(color)}
                                                className={`w-10 h-10 rounded-full border border-white/10 transition-all ${(selectedColor?._id || selectedColor?.name) === (color._id || color.name) ? "ring-2 ring-white ring-offset-2 ring-offset-black scale-110" : "hover:scale-105"} ${color.name?.toLowerCase() === 'white' ? 'border-white/40' : ''}`}
                                                style={{
                                                    backgroundColor: color.hexCode
                                                        ? (color.hexCode.startsWith('#') ? color.hexCode : `#${color.hexCode}`)
                                                        : (color.name?.toLowerCase() || 'transparent')
                                                }}
                                                title={color.name}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h4 className="text-[11px] font-black uppercase tracking-[0.3em]">Select Size</h4>
                                    <button className="text-[10px] font-bold uppercase tracking-widest text-[#d4c4b1] border-b border-[#d4c4b1]/30">Size Guide</button>
                                </div>
                                <div className="grid grid-cols-5 gap-2">
                                    {filteredVariants.map(v => (
                                        <button
                                            key={v._id}
                                            onClick={() => handleSizeSelect(v)}
                                            className={`h-12 flex items-center justify-center text-[11px] font-bold tracking-widest transition-all border ${selectedVariant?._id === v._id ? "bg-white text-black border-white" : "border-white/10 hover:border-white/40"} ${v.stock <= 0 ? "opacity-30 cursor-not-allowed" : ""}`}
                                            disabled={v.stock <= 0}
                                        >
                                            {v.size?.name}
                                        </button>
                                    ))}
                                    {filteredVariants.length === 0 && <p className="col-span-5 text-[10px] text-white/30 uppercase italic">No sizes available for this color</p>}
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
                                <motion.button
                                    onClick={handleAddToBag}
                                    disabled={isOutOfStock}
                                    whileTap={{ scale: 0.98 }}
                                    whileHover={{ scale: 1.01 }}
                                    className={`w-full h-16 text-[11px] font-black uppercase tracking-[0.3em] transition-colors flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed ${isAdded ? 'bg-green-500 text-white' : 'bg-white text-black hover:bg-[#d4c4b1]'}`}
                                >
                                    <AnimatePresence mode="wait">
                                        {isAdded ? (
                                            <motion.div
                                                key="added"
                                                initial={{ y: 10, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                exit={{ y: -10, opacity: 0 }}
                                                className="flex items-center justify-center gap-2"
                                            >
                                                Added to Bag <span className="material-symbols-outlined text-sm">check_circle</span>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="add"
                                                initial={{ y: 10, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                exit={{ y: -10, opacity: 0 }}
                                                className="flex items-center justify-center gap-2"
                                            >
                                                {isOutOfStock ? "Out of Stock" : "Add to Bag"} <span className="material-symbols-outlined text-sm">shopping_bag</span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.button>
                                <motion.button
                                    onClick={() => handleQuickBuy()}
                                    disabled={isOutOfStock}
                                    whileTap={{ scale: 0.98 }}
                                    whileHover={{ scale: 1.01 }}
                                    className={`w-full h-16 border text-[11px] font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed ${isQuickBuying ? 'bg-accent text-black border-accent' : 'border-white/10 bg-zinc-950 text-white hover:border-white/40'}`}
                                >
                                    <AnimatePresence mode="wait">
                                        {isQuickBuying ? (
                                            <motion.div
                                                key="buying"
                                                initial={{ y: 10, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                exit={{ y: -10, opacity: 0 }}
                                                className="flex items-center justify-center gap-2"
                                            >
                                                Processing... <span className="material-symbols-outlined animate-spin text-sm">sync</span>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="buy"
                                                initial={{ y: 10, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                exit={{ y: -10, opacity: 0 }}
                                                className="flex items-center justify-center gap-2"
                                            >
                                                Quick Buy
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.button>


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
                                        value={pincode}
                                        onChange={(e) => setPincode(e.target.value)}
                                        className="bg-transparent border-none text-[10px] font-bold tracking-[0.2em] w-full py-4 px-0 focus:ring-0 placeholder:text-white/20"
                                    />
                                    <button
                                        onClick={handlePincodeCheck}
                                        className="text-[10px] font-black uppercase text-[#d4c4b1] px-4"
                                    >
                                        {pincodeStatus === "checking" ? "Checking..." : "Check"}
                                    </button>
                                </div>

                                {pincodeStatus === "available" && (
                                    <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest flex items-center gap-1 mt-3 animate-fadeIn">
                                        <span className="material-symbols-outlined text-[14px]">local_shipping</span>
                                        Delivery available in 3-5 days
                                    </p>
                                )}

                                {pincodeStatus === "unserviceable" && (
                                    <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest flex items-center gap-1 mt-3 animate-fadeIn">
                                        <span className="material-symbols-outlined text-[14px]">block</span>
                                        Non-serviceable location
                                    </p>
                                )}

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
                                                <span className="material-symbols-outlined text-white/20 group-hover:text-white transition-transform duration-300" style={{ transform: openAccordion === tab ? 'rotate(180deg)' : 'rotate(0)' }}>
                                                    expand_more
                                                </span>
                                            </button>
                                            <div className="accordion-content overflow-hidden transition-all duration-300 ease-in-out" style={{ maxHeight: openAccordion === tab ? '500px' : '0' }}>
                                                <div className="pb-5 pr-10">
                                                    <p className="text-[10px] md:text-[11px] leading-relaxed text-white/60 font-medium tracking-wide">
                                                        {tab === 'fabric'
                                                            ? (product.composition || product.material || "Premium quality fabric. Cold wash only. Do not tumble dry.")
                                                            : (product.shippingInfo || "Ships within 24-48 hours. Express 3-day delivery available worldwide.")}
                                                    </p>
                                                </div>
                                            </div>
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

            {/* Notification UI */}
            {notification && (
                <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] z-[100] animate-fadeIn ${notification.type === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white shadow-2xl shadow-green-500/20'}`}>
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-sm">
                            {notification.type === 'error' ? 'error' : 'check_circle'}
                        </span>
                        {notification.message}
                    </div>
                </div>
            )}
        </main>
    );
}