import { useEffect, useState } from "react";
import { useFabric } from "../../../context/FabricContext";
import { initFabric } from "../fabric/fabricCanvas.js";
import { clampToPrintArea } from "../../../utils/printAreaClamp.js";
import { addBaseImage } from "../fabric/baseImage";
import { useLocation, useParams } from "react-router-dom";
import * as fabric from "fabric";

export default function CanvasArea() {
    const {
        canvasRef,
        fabricCanvas,
        activeTextRef,
        printAreaRef,
        activeObjectRef,
        layersRef,
        syncLayers,
        viewSideRef,
        frontDesignRef,
        backDesignRef
    } = useFabric();

    const location = useLocation();
    const { slug } = useParams();

    const [viewSide, setViewSide] = useState("front");
    const [productData, setProductData] = useState(null);
    const [loading, setLoading] = useState(true);

    // ✅ GET PRODUCT DATA (State OR API fallback)
    useEffect(() => {
        if (location.state?.frontImage) {
            setProductData({
                frontImage: location.state.frontImage,
                backImage: location.state.backImage
            });
            setLoading(false);
        } else {
            // Direct URL access → fetch product
            fetch(`https://api.escuelajs.co/api/v1/products/slug/${slug}`)
                .then(res => res.json())
                .then(data => {
                    setProductData({
                        frontImage: data.images?.[0],
                        backImage: data.images?.[1]
                    });
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                });
        }
    }, [slug]);

    const updateLayers = () => {
        const canvas = fabricCanvas.current;
        if (!canvas) return;
        layersRef.current = [...canvas.getObjects()].reverse();
    };

    // 🔥 SIDE SWITCH
    const switchSide = async (side) => {
        const canvas = fabricCanvas.current;
        if (!canvas || !productData) return;

        // Save current design
        const dataURL = canvas.toDataURL({
            format: "png",
            quality: 1,
            multiplier: 2,
        });

        if (viewSideRef.current === "front") {
            frontDesignRef.current = dataURL;
        } else {
            backDesignRef.current = dataURL;
        }

        // Clear canvas except printArea
        canvas.getObjects().forEach((obj) => {
            if (!obj.excludeFromExport && obj !== canvas.printArea) {
                canvas.remove(obj);
            }
        });

        // Remove base image
        const baseImage = canvas.getObjects().find(o => o.excludeFromExport);
        if (baseImage) canvas.remove(baseImage);

        // Load correct base image
        const baseImageURL =
            side === "front"
                ? productData.frontImage
                : productData.backImage || productData.frontImage;

        await addBaseImage(canvas, baseImageURL);

        // Restore saved design
        const savedDesign =
            side === "front"
                ? frontDesignRef.current
                : backDesignRef.current;

        if (savedDesign) {
            fabric.Image.fromURL(savedDesign, (img) => {
                img.set({
                    left: canvas.width / 2,
                    top: canvas.height / 2,
                    originX: "center",
                    originY: "center",
                    selectable: false,
                });
                canvas.add(img);
                canvas.renderAll();
            });
        }

        viewSideRef.current = side;
        setViewSide(side);
    };

    // ✅ INIT FABRIC CANVAS
    useEffect(() => {
        if (!canvasRef.current) return;
        if (fabricCanvas.current) return;
        if (!productData) return;

        fabricCanvas.current = initFabric(
            canvasRef.current,
            printAreaRef,
            activeTextRef,
            syncLayers
        );

        const canvas = fabricCanvas.current;

        // Load front image initially
        addBaseImage(canvas, productData.frontImage);

        canvas.on("object:modified", (e) => {
            const obj = e.target;
            if (!obj || obj.excludeFromExport) return;

            clampToPrintArea(obj, canvas.printArea);
            obj.setCoords();
            canvas.requestRenderAll();
        });

        canvas.on("selection:created", (e) => {
            activeObjectRef.current = e.selected?.[0] || null;
            if (e.selected?.[0]?.type === "textbox") {
                activeTextRef.current = e.selected[0];
            }
        });

        canvas.on("selection:updated", (e) => {
            activeObjectRef.current = e.selected?.[0] || null;
            if (e.selected?.[0]?.type === "textbox") {
                activeTextRef.current = e.selected[0];
            }
        });

        canvas.on("selection:cleared", () => {
            activeObjectRef.current = null;
            activeTextRef.current = null;
        });

        canvas.on("object:moving", (e) => {
            const obj = e.target;
            if (!obj || obj.excludeFromExport) return;
            clampToPrintArea(obj, canvas.printArea);
        });

        canvas.on("object:added", updateLayers);
        canvas.on("object:removed", updateLayers);
        canvas.on("object:modified", updateLayers);

        updateLayers();

    }, [productData]);

    // ✅ LOADING STATE
    if (loading) {
        return (
            <div className="flex items-center justify-center h-[400px] text-white">
                Loading Design Studio...
            </div>
        );
    }

    if (!productData) {
        return (
            <div className="flex items-center justify-center h-[400px] text-red-500">
                Failed to load product.
            </div>
        );
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-8">

            {/* FRONT / BACK TOGGLE - Mobile ma thodu nanu kari didhu */}
            <div className="flex items-center bg-[#1a1a1d] border border-white/[0.06] rounded-full p-1 mb-4 scale-90 md:scale-100">
                <button
                    onClick={() => switchSide("front")}
                    className={`px-5 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full transition-all duration-300
                    ${viewSide === "front" ? "bg-[#d4c4b1] text-black" : "text-[#9a9a9a]"}`}
                >
                    Front
                </button>
                <button
                    onClick={() => switchSide("back")}
                    className={`px-5 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full transition-all duration-300
                    ${viewSide === "back" ? "bg-[#d4c4b1] text-black" : "text-[#9a9a9a]"}`}
                >
                    Back
                </button>
            </div>

            {/* CANVAS CONTAINER - Mobile ma Max-Height set kari */}
            <div className="relative w-full flex items-center justify-center overflow-hidden max-h-[70vh] md:max-h-full">
                <canvas
                    ref={canvasRef}
                    width={550}
                    height={500}
                    className="max-w-full max-h-full object-contain shadow-2xl"
                />
            </div>

        </div>
    );
}
