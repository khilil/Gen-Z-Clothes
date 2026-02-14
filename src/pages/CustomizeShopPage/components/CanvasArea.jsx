import { useEffect, useState } from "react";
import { useFabric } from "../../../context/FabricContext";
import { initFabric } from "../fabric/fabricCanvas.js";
import { clampToPrintArea } from "../../../utils/printAreaClamp.js";
import { addBaseImage } from "../fabric/baseImage";
import { useLocation, useParams } from "react-router-dom";

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
        backDesignRef,
        productDataRef
    } = useFabric();

    const location = useLocation();
    const { slug } = useParams();

    const [viewSide, setViewSide] = useState("front");
    const [productData, setProductData] = useState(null);
    const [loading, setLoading] = useState(true);

    /* =============================
       FETCH PRODUCT DATA
    ============================= */
    // useEffect(() => {
    //     if (location.state?.frontImage) {
    //         setProductData({
    //             frontImage: location.state.frontImage,
    //             backImage: location.state.backImage
    //         });
    //         setLoading(false);
    //     } else {
    //         fetch(`https://api.escuelajs.co/api/v1/products/slug/${slug}`)
    //             .then(res => res.json())
    //             .then(data => {
    //                 setProductData({
    //                     frontImage: data.images?.[0],
    //                     backImage: data.images?.[1]
    //                 });
    //                 setLoading(false);
    //             })
    //             .catch(() => setLoading(false));
    //     }
    // }, [slug]);

    useEffect(() => {
        if (location.state?.frontImage) {

            const data = {
                frontImage: location.state.frontImage,
                backImage: location.state.backImage
            };

            setProductData(data);
            productDataRef.current = data;   // ✅ set here safely
            setLoading(false);

        } else {

            fetch(`https://api.escuelajs.co/api/v1/products/slug/${slug}`)
                .then(res => res.json())
                .then(data => {

                    const product = {
                        frontImage: data.images?.[0],
                        backImage: data.images?.[1]
                    };

                    setProductData(product);
                    productDataRef.current = product;  // ✅ set here safely
                    setLoading(false);

                })
                .catch(() => setLoading(false));
        }
    }, [slug]);



    /* =============================
       SIDE SWITCH LOGIC
    ============================= */
    const switchSide = async (side) => {
        const canvas = fabricCanvas.current;
        if (!canvas || !productData) return;

        // console.log("🔁 Switching to:", side);

        // 1️⃣ Save current design JSON
        const json = canvas.toJSON();
        if (viewSideRef.current === "front") {
            frontDesignRef.current = json;
            // console.log("💾 Saved FRONT JSON");
        } else {
            backDesignRef.current = json;
            // console.log("💾 Saved BACK JSON");
        }

        // 2️⃣ Load saved design of new side
        const savedDesign =
            side === "front"
                ? frontDesignRef.current
                : backDesignRef.current;

        // console.log("📦 Loading saved JSON:", savedDesign ? "YES" : "NO");

        await canvas.loadFromJSON(savedDesign || { objects: [] });

        // 3️⃣ Add base image AFTER JSON load
        const baseImageURL =
            side === "front"
                ? productData.frontImage
                : productData.backImage || productData.frontImage;

        await addBaseImage(canvas, baseImageURL);

        // 4️⃣ Ensure base image always at bottom
        const baseImg = canvas.getObjects().find(o => o.excludeFromExport);
        if (baseImg) {
            canvas.sendObjectToBack(baseImg);
            // console.log("🖼 Base image sent to back");
        }

        canvas.renderAll();

        // console.log("🧱 Canvas Objects:", canvas.getObjects());

        viewSideRef.current = side;
        setViewSide(side);
    };

    /* =============================
       INIT FABRIC CANVAS
    ============================= */
    useEffect(() => {
        if (!canvasRef.current || !productData) return;

        if (fabricCanvas.current) {
            fabricCanvas.current.dispose();
            fabricCanvas.current = null;
        }

        fabricCanvas.current = initFabric(
            canvasRef.current,
            printAreaRef,
            activeTextRef,
            syncLayers
        );

        const canvas = fabricCanvas.current;

        // console.log("🎨 Fabric initialized");

        const initialLoad = async () => {
            const savedDesign =
                viewSideRef.current === "front"
                    ? frontDesignRef.current
                    : backDesignRef.current;

            await canvas.loadFromJSON(savedDesign || { objects: [] });

            await addBaseImage(canvas, productData.frontImage);

            const baseImg = canvas.getObjects().find(o => o.excludeFromExport);
            if (baseImg) canvas.sendObjectToBack(baseImg);

            canvas.renderAll();
        };


        initialLoad();

        /* ===== EVENTS ===== */
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

    }, [productData]);

    /* =============================
       LOADING UI
    ============================= */
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

    /* =============================
       RENDER
    ============================= */
    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-6">

            {/* FRONT / BACK TOGGLE */}
            <div className="flex items-center justify-center w-full mt-6">
                <div className="flex items-center bg-[#1a1a1d] border border-white/[0.06] 
        rounded-full p-1 
        w-full max-w-[260px] 
        md:max-w-[320px] md:p-1.5">

                    <button
                        onClick={() => switchSide("front")}
                        className={`flex-1 px-4 md:px-6 py-2.5 text-[10px] md:text-xs 
            font-black uppercase tracking-widest 
            rounded-full transition-all duration-300
            ${viewSide === "front"
                                ? "bg-[#d4c4b1] text-black shadow-md"
                                : "text-[#9a9a9a] hover:text-white"
                            }`}
                    >
                        Front
                    </button>

                    <button
                        onClick={() => switchSide("back")}
                        className={`flex-1 px-4 md:px-6 py-2.5 text-[10px] md:text-xs 
            font-black uppercase tracking-widest 
            rounded-full transition-all duration-300
            ${viewSide === "back"
                                ? "bg-[#d4c4b1] text-black shadow-md"
                                : "text-[#9a9a9a] hover:text-white"
                            }`}
                    >
                        Back
                    </button>

                </div>
            </div>


            {/* CANVAS */}
            <div className="w-full h-full flex items-center justify-center">
                <canvas
                    ref={canvasRef}
                    width={450}
                    height={500}
                    className="max-w-full max-h-full"
                />
            </div>

        </div>
    );
}
