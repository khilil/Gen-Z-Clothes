import * as fabric from "fabric";



export function addOrUpdateText(canvas, activeTextRef, options, printArea) {
    if (!canvas || !printArea) return;

    const PADDING = 20;
    const maxWidth = printArea.width - PADDING * 2;

    // 🔁 UPDATE EXISTING TEXT
    if (activeTextRef.current) {
        activeTextRef.current.set({
            ...(options.text !== undefined && { text: options.text }),
            ...(options.fontFamily && { fontFamily: options.fontFamily }),
            ...(options.fill && { fill: options.fill }),
            width: maxWidth,
        });

        activeTextRef.current.initDimensions();
        activeTextRef.current.setCoords();
        canvas.requestRenderAll();
        return;
    }

    // ➕ CREATE NEW TEXT
    const textbox = new fabric.Textbox(options.text || "Studio Edit", {
        left: printArea.left,
        top: printArea.top,
        width: maxWidth,
        originX: "center",
        originY: "center",
        fontFamily: options.fontFamily || "Oswald",
        fontSize: 64,
        fill: options.fill || "#000",
        textAlign: "center",
    });

    canvas.add(textbox);
    canvas.setActiveObject(textbox);
    activeTextRef.current = textbox;
}





export function applyFontFamily(canvas, activeTextRef, fontFamily) {
    if (!canvas) return;

    // 🎯 If text selected → update
    if (activeTextRef.current) {
        activeTextRef.current.set({
            fontFamily,
            dirty: true,
        });
        canvas.requestRenderAll();
        return;
    }

    // 🆕 If no text → create new one
    const text = new fabric.Textbox("Studio Edit", {
        left: canvas.getWidth() / 2,
        top: canvas.getHeight() / 2,
        originX: "center",
        originY: "center",
        fontFamily,
        fontSize: 64,
        fill: "#000",
        textAlign: "center",
    });

    canvas.add(text);
    canvas.setActiveObject(text);
    activeTextRef.current = text;
}

export function applyTextAlignment(canvas, text, alignment, printArea) {
    if (!canvas || !text || !printArea) return;

    const centerX = printArea.left;
    const leftX = printArea.left - printArea.width / 2;
    const rightX = printArea.left + printArea.width / 2;

    if (alignment === "left") {
        text.set({
            textAlign: "left",
            originX: "left",
            left: leftX,

        });
    }

    if (alignment === "center") {
        text.set({
            textAlign: "center",
            originX: "center",
            left: centerX,
        });
    }

    if (alignment === "right") {
        text.set({
            textAlign: "right",
            originX: "right",
            left: rightX,
        });
    }

    text.setCoords();
    canvas.requestRenderAll();
}

