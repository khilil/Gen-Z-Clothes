// fabricCanvas.js
import { Canvas } from "fabric";
import { addPrintArea } from "./printArea";

export function initFabric(
    canvasEl,
    printAreaRef,
    activeTextRef,
    syncLayers
) {
    if (!canvasEl) return null;

    const canvas = new Canvas(canvasEl, {
        preserveObjectStacking: true,
        selection: true,
    });

    canvas.backgroundColor = "#ffffff";
    canvas.renderAll();

    const printArea = addPrintArea(canvas);
    printAreaRef.current = printArea;
    canvas.printArea = printArea;

    canvas.on("object:scaling", (e) => {
        const obj = e.target;
        if (!obj) return;
        if (!printAreaRef.current) return;
        if (obj !== activeTextRef?.current) return;

        obj.set({
            width: printAreaRef.current.width - 40,
            scaleX: 1,
        });

        obj.initDimensions();
        obj.setCoords();
        canvas.requestRenderAll();
    });

    canvas.on("object:added", () => syncLayers && syncLayers(canvas));
    canvas.on("object:removed", () => syncLayers && syncLayers(canvas));
    canvas.on("object:modified", () => syncLayers && syncLayers(canvas));

    return canvas;
}
