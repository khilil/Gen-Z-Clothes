import * as fabric from "fabric";

export function addPrintArea(canvas) {
    const rect = new fabric.Rect({
        left: canvas.getWidth() / 2,
        top: canvas.getHeight() / 2,
        width: 260,
        height: 320,
        originX: "center",
        originY: "center",
        fill: "transparent",
        stroke: "rgba(0,0,0,0.3)",
        strokeDashArray: [8, 6],
        selectable: false,
        evented: false,
        excludeFromExport: true,
    });

    canvas.add(rect);
    rect.setCoords();

    return rect; // ✅ VERY IMPORTANT
}
