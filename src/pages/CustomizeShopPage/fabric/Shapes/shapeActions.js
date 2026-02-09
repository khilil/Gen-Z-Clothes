import * as fabric from "fabric";

export function addShape(canvas, activeShapeRef, type, printArea) {
    if (!canvas || !printArea) return;

    const base = {
        left: printArea.left,
        top: printArea.top,
        originX: "center",
        originY: "center",
        fill: "#000",
        stroke: "#000",
        strokeWidth: 2,
    };

    let shape;

    switch (type) {
        case "rect":
            shape = new fabric.Rect({ ...base, width: 120, height: 120 });
            break;

        case "roundedRect":
            shape = new fabric.Rect({
                ...base,
                width: 140,
                height: 100,
                rx: 20,
                ry: 20,
            });
            break;

        case "circle":
            shape = new fabric.Circle({ ...base, radius: 60 });
            break;

        case "triangle":
            shape = new fabric.Triangle({ ...base, width: 120, height: 120 });
            break;

        case "line":
            shape = new fabric.Line([-60, 0, 60, 0], base);
            break;

        case "star":
            shape = new fabric.Text("★", {
                ...base,
                fontSize: 120,
            });
            break;

        case "heart":
            shape = new fabric.Text("♥", {
                ...base,
                fontSize: 120,
            });
            break;

        default:
            return;
    }

    canvas.add(shape);
    canvas.setActiveObject(shape);
    activeShapeRef.current = shape;
    canvas.requestRenderAll();
}


export function updateShape(activeShapeRef, canvas, props) {
    if (!activeShapeRef.current || !canvas) return;

    activeShapeRef.current.set(props);
    activeShapeRef.current.setCoords();
    canvas.requestRenderAll();
}


export function updateOpacity(canvas, activeObject, value) {
    if (!canvas || !activeObject) return;

    activeObject.set({
        opacity: value / 100, // 🔥 convert to 0–1
    });

    canvas.requestRenderAll();
}

export function updateStrokeWidth(canvas, activeObject, value) {
    if (!canvas || !activeObject) return;

    activeObject.set({
        strokeWidth: value,
    });

    canvas.requestRenderAll();
}
