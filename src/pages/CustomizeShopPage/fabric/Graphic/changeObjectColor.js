export const changeActiveObjectColor = (canvas, color) => {
    if (!canvas) return;

    const activeObject = canvas.getActiveObject();
    if (!activeObject) return;

    // If SVG group
    if (activeObject.type === "group") {
        activeObject.getObjects().forEach(obj => {
            if (obj.fill) {
                obj.set("fill", color);
            }
        });
    }

    // If single path / shape
    else if (activeObject.fill) {
        activeObject.set("fill", color);
    }

    // If textbox
    if (activeObject.type === "textbox") {
        activeObject.set("fill", color);
    }

    canvas.requestRenderAll();
};
