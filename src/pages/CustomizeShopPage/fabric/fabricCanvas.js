// fabricCanvas.js
import { Canvas } from "fabric";
import { addPrintArea } from "./printArea";
import { addBaseImage } from "./baseImage";

export function initFabric(canvasEl, printAreaRef, activeTextRef) {
    if (!canvasEl) return null;

    const canvas = new Canvas(canvasEl, {
        preserveObjectStacking: true,
        selection: true,
    });

    canvas.on("object:scaling", (e) => {
        const obj = e.target;
        if (obj !== activeTextRef?.current) return;

        obj.set({
            width: printAreaRef.current.width - 40,
            scaleX: 1, // 🔒 disable horizontal scale
        });

        obj.initDimensions();
        obj.setCoords();
        canvas.requestRenderAll();
    });


    // ✅ v7 way
    canvas.backgroundColor = "#ffffff";
    canvas.renderAll();

    // ✅ CREATE + STORE PRINT AREA
    const printArea = addPrintArea(canvas);
    printAreaRef.current = printArea;

    addPrintArea(canvas);
    addBaseImage(canvas);

    // 🔥 store reference
    canvas.printArea = addPrintArea(canvas);

    return canvas;
}
