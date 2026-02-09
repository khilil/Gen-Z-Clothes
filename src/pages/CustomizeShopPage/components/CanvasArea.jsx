import { useEffect } from "react";
import { useFabric } from "../../../context/FabricContext";
import { initFabric } from '../fabric/fabricCanvas.js'
import { clampToPrintArea } from "../../../utils/printAreaClamp.js";

export default function CanvasArea() {
    const {
        canvasRef,
        fabricCanvas,
        activeTextRef,
        printAreaRef,
        designStateRef,
        activeObjectRef,
        layersRef
    } = useFabric();

    const updateLayers = () => {
        const canvas = fabricCanvas.current;
        if (!canvas) return;

        // 🔁 reverse so top layer appears first
        layersRef.current = [...canvas.getObjects()].reverse();
    };


    useEffect(() => {
        if (!canvasRef.current) return;
        if (fabricCanvas.current) return;

        fabricCanvas.current = initFabric(canvasRef.current, printAreaRef);
        const canvas = fabricCanvas.current;

        // smooth move (NO clamp)
        canvas.on("object:moving", () => { });

        // scaling guard
        canvas.on("object:scaling", (e) => {
            const obj = e.target;
            if (!obj || obj.excludeFromExport) return;

            if (obj.type === "textbox") {
                obj.scaleX = 1;
            }
        });

        // 🔥 clamp only once
        canvas.on("object:modified", (e) => {
            const obj = e.target;
            if (!obj || obj.excludeFromExport) return;

            clampToPrintArea(obj, canvas.printArea);
            obj.setCoords();
            canvas.requestRenderAll();
        });



        // 🎯 selection tracking
        canvas.on("selection:created", e => {
            activeObjectRef.current = e.selected?.[0] || null;
            if (e.selected?.[0]?.type === "textbox") {
                activeTextRef.current = e.selected[0];
            }
        });

        canvas.on("selection:updated", e => {
            activeObjectRef.current = e.selected?.[0] || null;
            if (e.selected?.[0]?.type === "textbox") {
                activeTextRef.current = e.selected[0];
            }
        });

        canvas.on("selection:cleared", () => {
            activeObjectRef.current = null;
            activeTextRef.current = null;
        });

        // 🔁 restore design
        if (designStateRef.current) {
            canvas.loadFromJSON(designStateRef.current, canvas.renderAll.bind(canvas));
        }

        // 📚 layer sync
        canvas.on("object:added", updateLayers);
        canvas.on("object:removed", updateLayers);
        canvas.on("object:modified", updateLayers);

        updateLayers(); // initial sync

        return () => {
            if (fabricCanvas.current) {
                designStateRef.current = fabricCanvas.current.toJSON([
                    "selectable",
                    "evented",
                ]);
                fabricCanvas.current.dispose();
                fabricCanvas.current = null;
            }

            canvas.off("object:added", updateLayers);
            canvas.off("object:removed", updateLayers);
            canvas.off("object:modified", updateLayers);
        };
    }, []);

    return (
        <div className="w-full h-full flex items-center justify-center">
            <canvas
                ref={canvasRef}
                width={450}
                height={500}
                className="max-w-full max-h-full"
            />
        </div>
    );
}
