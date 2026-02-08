import { useEffect } from "react";
import { initFabric } from "../fabric/fabricCanvas";
import { useFabric } from "../../../context/FabricContext";
import { clampToPrintArea } from "../../../utils/printAreaClamp";

export default function CanvasArea() {
    const { canvasRef, fabricCanvas, activeTextRef, printAreaRef, designStateRef } = useFabric();


    useEffect(() => {
        if (!canvasRef.current) return;

        // 🛑 prevent double init
        if (fabricCanvas.current) return;

        fabricCanvas.current = initFabric(canvasRef.current, printAreaRef);

        fabricCanvas.current.on("object:moving", (e) => {
            const obj = e.target;
            if (!obj || obj.excludeFromExport) return;

            clampToPrintArea(obj, fabricCanvas.current.printArea);
            obj.setCoords();
        });

        fabricCanvas.current.on("object:scaling", (e) => {
            const obj = e.target;
            if (!obj || obj.excludeFromExport) return;

            clampToPrintArea(obj, fabricCanvas.current.printArea);
            obj.setCoords();
        });

        fabricCanvas.current.on("object:rotating", (e) => {
            const obj = e.target;
            if (!obj || obj.excludeFromExport) return;

            clampToPrintArea(obj, fabricCanvas.current.printArea);
            obj.setCoords();
        });

        const canvas = fabricCanvas.current;
        if (!canvas) return;

        canvas.on("selection:created", e => {
            if (e.selected?.[0]?.type === "textbox") {
                activeTextRef.current = e.selected[0];
            }
        });

        canvas.on("selection:updated", e => {
            if (e.selected?.[0]?.type === "textbox") {
                activeTextRef.current = e.selected[0];
            }
        });

        canvas.on("selection:cleared", () => {
            activeTextRef.current = null;
        });

        canvas.on("selection:created", (e) => {
            if (e.selected?.[0]?.type === "textbox") {
                activeTextRef.current = e.selected[0];
            }
        });

        canvas.on("selection:updated", (e) => {
            if (e.selected?.[0]?.type === "textbox") {
                activeTextRef.current = e.selected[0];
            }
        });

        canvas.on("selection:cleared", () => {
            activeTextRef.current = null;
        });


        // 🔁 restore design safely
        if (designStateRef.current) {
            canvas.loadFromJSON(
                designStateRef.current,
                () => {
                    canvas.renderAll();
                }
            );
        }

        return () => {
            // 🧠 guard before dispose
            if (fabricCanvas.current) {
                try {
                    designStateRef.current =
                        fabricCanvas.current.toJSON([
                            "selectable",
                            "evented",
                        ]);

                    fabricCanvas.current.dispose();
                } catch (e) {
                    console.warn("Fabric dispose skipped:", e);
                }

                fabricCanvas.current = null;
            }
        };
    }, []);



    return (
        <div className="w-3/5 bg-[#0f0f0f] flex items-center justify-center">
            <canvas
                ref={canvasRef}
                width={450}
                height={500}
            />
        </div>
    );
}
