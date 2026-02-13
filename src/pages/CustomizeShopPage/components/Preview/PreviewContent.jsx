import { useEffect, useState } from "react";
import { useFabric } from "../../../../context/FabricContext";
import { useNavigate } from "react-router-dom";

export default function PreviewContent() {
    const navigate = useNavigate();
    const { fabricCanvas, frontDesignRef, backDesignRef } = useFabric();
    const [previewImage, setPreviewImage] = useState(null);
    const [selectedSize, setSelectedSize] = useState("L");
    const [baseColor, setBaseColor] = useState("white");
    const [viewSide, setViewSide] = useState("front");

    const mockups = {
        white: {
            front: "https://www.freeiconspng.com/uploads/white-t-shirt-png-2.png",
            back: "https://www.freeiconspng.com/uploads/white-t-shirt-blank-back-png-23.png"
        },
        black: {
            front: "https://www.freeiconspng.com/uploads/black-t-shirt-png-15.png",
            back: "https://www.freeiconspng.com/uploads/black-t-shirt-blank-back-png-2.png"
        },
    };

    useEffect(() => {
        if (viewSide === "front") {
            setPreviewImage(frontDesignRef.current);
        } else {
            setPreviewImage(backDesignRef.current);
        }
    }, [viewSide, frontDesignRef, backDesignRef]);

    return (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col lg:flex-row overflow-hidden font-sans">
            {/* Left Section: Visual Preview */}
            <div className="flex-[3] relative bg-[#0a0a0a] flex items-center justify-center p-10 md:p-20 overflow-hidden">
                
                {/* Branding Overlay */}
                <div className="absolute top-12 left-1/2 -translate-x-1/2 text-center pointer-events-none hidden md:block">
                    <h2 className="text-4xl font-impact tracking-tighter mb-1 text-white">MODERN MEN</h2>
                    <p className="text-[9px] font-black uppercase tracking-[0.6em] text-[#d4c4b1]/60">Bespoke Artisan Series</p>
                </div>

                {/* Back Button */}
                <button onClick={() => navigate(-1)} className="absolute top-10 left-10 cursor-pointer group flex items-center gap-4 z-50">
                    <span className="material-symbols-outlined text-white text-2xl transition-transform group-hover:scale-110">arrow_back</span>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60 group-hover:text-white">Back to Studio</span>
                </button>

                {/* Side Toggles */}
                <div className="absolute top-1/2 right-10 -translate-y-1/2 flex flex-col gap-4 z-50">
                    <button onClick={() => setViewSide("front")} className={`w-12 h-12 flex items-center justify-center border transition-all ${viewSide === 'front' ? 'border-white bg-white text-black' : 'border-white/20 text-white hover:border-white'}`}>
                        <span className="text-[10px] font-black uppercase tracking-tighter">Front</span>
                    </button>
                    <button onClick={() => setViewSide("back")} className={`w-12 h-12 flex items-center justify-center border transition-all ${viewSide === 'back' ? 'border-white bg-white text-black' : 'border-white/20 text-white hover:border-white'}`}>
                        <span className="text-[10px] font-black uppercase tracking-tighter">Back</span>
                    </button>
                </div>

                {/* T-Shirt Display */}
                <div className="relative w-full max-w-2xl aspect-[4/5] flex items-center justify-center">
                    <img
                        alt="T-Shirt Base"
                        src={mockups[baseColor][viewSide]}
                        className={`w-full h-full object-contain transition-all duration-500 ${baseColor === 'black' ? 'brightness-75' : 'brightness-100'} drop-shadow-[0_35px_35px_rgba(0,0,0,0.6)]`}
                    />

                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-[70%] h-[60%] relative flex items-center justify-center">
                            {previewImage ? (
                                <img
                                    src={previewImage}
                                    alt="User Design"
                                    className="max-w-full max-h-full object-contain opacity-90"
                                    style={{
                                        mixBlendMode: baseColor === 'black' ? 'screen' : 'normal'
                                    }}
                                />
                            ) : (
                                <span className="text-white/10 text-[8px] uppercase tracking-widest italic">No design on this side</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Metadata Labels */}
                <div className="absolute bottom-10 left-10 hidden md:flex gap-8">
                    <div className="flex flex-col gap-1">
                        <span className="text-[8px] font-bold text-white/40 uppercase tracking-widest">Lighting</span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-white">Cinematic Studio</span>
                    </div>
                </div>
            </div>

            {/* Right Section: Product Details */}
            <div className="flex-1 bg-[#121212] border-l border-white/5 flex flex-col justify-between p-8 md:p-12 overflow-y-auto no-scrollbar">
                <div className="space-y-10">
                    <div>
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#d4c4b1] mb-4 block">Hand-Crafted series</span>
                        <h1 className="text-5xl font-impact tracking-tighter text-white uppercase leading-none mb-4">Custom Artisan Tee</h1>
                        <p className="text-white/40 text-xs leading-relaxed max-w-xs">Hand-crafted luxury jersey. Tailored for a relaxed yet structured fit with your bespoke design.</p>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-white/40 mb-1">Premium Total</span>
                        <span className="text-3xl font-impact tracking-tighter text-white">$210.00</span>
                    </div>

                    <div className="space-y-4">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-white/40">Fabric Color</span>
                        <div className="flex gap-4">
                            {['white', 'black'].map((color) => (
                                <button 
                                    key={color} 
                                    onClick={() => setBaseColor(color)} 
                                    className={`w-8 h-8 rounded-full border transition-all ${baseColor === color ? 'ring-1 ring-white ring-offset-4 ring-offset-[#121212]' : 'border-white/10 hover:scale-110'}`} 
                                    style={{ backgroundColor: color }}>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-[9px] font-bold uppercase tracking-widest text-white/40">Select Size</span>
                            <button className="text-[9px] font-bold uppercase tracking-widest text-[#d4c4b1] underline underline-offset-4">Size Guide</button>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                            {['S', 'M', 'L', 'XL'].map((size) => (
                                <button 
                                    key={size} 
                                    onClick={() => setSelectedSize(size)} 
                                    className={`h-12 border flex items-center justify-center text-[11px] font-bold transition-all ${selectedSize === size ? 'border-white bg-white/5 text-white' : 'border-white/10 text-white/60 hover:border-white'}`}>
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-3 mt-10">
                    <button className="w-full h-16 bg-white text-black text-[11px] font-black uppercase tracking-[0.4em] hover:bg-[#d4c4b1] transition-colors flex items-center justify-center gap-3">
                        ADD TO BAG <span className="material-symbols-outlined text-lg">shopping_bag</span>
                    </button>
                    <button className="w-full h-16 bg-transparent border-2 border-white text-white text-[11px] font-black uppercase tracking-[0.4em] hover:bg-white/5 transition-colors flex items-center justify-center gap-3">
                        BUY NOW <span className="material-symbols-outlined text-lg">bolt</span>
                    </button>
                    <p className="text-[8px] text-center text-white/30 uppercase tracking-widest mt-4 italic">
                        Free Express Shipping & Signature Packaging Included
                    </p>
                </div>
            </div>
        </div>
    );
}