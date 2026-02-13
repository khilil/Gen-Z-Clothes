import * as fabric  from "fabric";

export const addGraphicToCanvas = (
    canvas,
    iconName,
    printArea
) => {
    if (!canvas) return;

    const graphic = new fabric.Text(iconName, {
        fontSize: 60,
        fill: "#000",
        originX: "center",
        originY: "center",
    });

    graphic.left = printArea.left + printArea.width / 2;
    graphic.top = printArea.top + printArea.height / 2;

    canvas.add(graphic);
    canvas.setActiveObject(graphic);
    canvas.requestRenderAll();
};
