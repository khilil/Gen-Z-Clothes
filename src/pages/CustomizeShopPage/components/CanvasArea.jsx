import { useEffect, useState, useRef } from "react";
import { useFabric } from "../../../context/FabricContext";
import { initFabric } from "../fabric/fabricCanvas.js";
import { clampToPrintArea } from "../../../utils/printAreaClamp.js";
import { addBaseImage } from "../fabric/baseImage";

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

    const [viewSide, setViewSide] = useState("front");



    const updateLayers = () => {
        const canvas = fabricCanvas.current;
        if (!canvas) return;
        layersRef.current = [...canvas.getObjects()].reverse();
    };

    // 🔥 SIDE SWITCH LOGIC
    const switchSide = async (side) => {
        const canvas = fabricCanvas.current;
        if (!canvas) return;

        // 🔥 Save current side as PNG BEFORE switching
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
        const objects = canvas.getObjects();
        objects.forEach((obj) => {
            if (!obj.excludeFromExport && obj !== canvas.printArea) {
                canvas.remove(obj);
            }
        });

        // Remove base image
        const baseImage = canvas.getObjects().find(o => o.excludeFromExport);
        if (baseImage) canvas.remove(baseImage);

        // Load saved PNG as image if exists
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

        await addBaseImage(canvas, side);

        viewSideRef.current = side;
        setViewSide(side);
    };


    useEffect(() => {

        if (!canvasRef.current) return;
        if (fabricCanvas.current) return;

        fabricCanvas.current = initFabric(
            canvasRef.current,
            printAreaRef,
            activeTextRef,
            syncLayers
        );

        const canvas = fabricCanvas.current;

        // 🔥 Initially load FRONT
        addBaseImage(canvas, "front");

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


    }, []);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-6">

            {/* FRONT / BACK TOGGLE */}
            <div className="flex items-center bg-[#1a1a1d] border border-white/[0.06] rounded-full p-1">

                <button
                    onClick={() => switchSide("front")}
                    className={`px-6 py-2 text-xs font-black uppercase tracking-widest rounded-full transition-all duration-300
            ${viewSide === "front"
                            ? "bg-[#d4c4b1] text-black"
                            : "text-[#9a9a9a] hover:text-white"
                        }`}
                >
                    Front
                </button>

                <button
                    onClick={() => switchSide("back")}
                    className={`px-6 py-2 text-xs font-black uppercase tracking-widest rounded-full transition-all duration-300
            ${viewSide === "back"
                            ? "bg-[#d4c4b1] text-black"
                            : "text-[#9a9a9a] hover:text-white"
                        }`}
                >
                    Back
                </button>

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
