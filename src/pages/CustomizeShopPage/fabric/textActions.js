import * as fabric from "fabric";



export function addOrUpdateText(canvas, activeTextRef, options, printArea) {
    if (!canvas || !printArea) return;

    const PADDING = 20;
    const maxWidth = printArea.width - PADDING * 2;

    if (activeTextRef.current) {
        activeTextRef.current.set({
            text: options.text ?? activeTextRef.current.text,
            fontFamily: options.fontFamily ?? activeTextRef.current.fontFamily,
            fill: options.fill ?? activeTextRef.current.fill,
            width: maxWidth,
        });



        activeTextRef.current.initDimensions();
        activeTextRef.current.setCoords();
        canvas.requestRenderAll();
        return;
    }

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

        hasControls: true,
        hasBorders: true,
        lockScalingX: false,
        lockScalingY: false,
        lockRotation: false,
        selectable: true,

    });

    console.log("TYPE:", textbox.type); 
    console.log("SCALE:", textbox.scaleX, textbox.scaleY);


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

