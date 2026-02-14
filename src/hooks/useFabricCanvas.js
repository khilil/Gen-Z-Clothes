// hooks/useFabricCanvas.js

import { useEffect, useRef } from "react";
import * as fabric from "fabric";
import {
    clampPosition,
    clampScale,
    snapInsidePrintArea
} from "../utils/printAreaMath";
import { isEditableObject } from "../utils/fabricHelpers";

export default function useFabricCanvas({
    canvasRef,
    printAreaRef,
    onSelectionChange
} = {}) {
    const fabricRef = useRef(null);


    useEffect(() => {
        // const canvas = new fabric.Canvas(canvasRef.current, {
        //     preserveObjectStacking: true,
        //     selection: true
        // });

        // Retina scaling
        const canvas = new fabric.Canvas(canvasRef.current, {
            preserveObjectStacking: true,
            selection: true
        });

        const dpr = window.devicePixelRatio || 1;

        canvas.setWidth(canvasRef.current.clientWidth * dpr);
        canvas.setHeight(canvasRef.current.clientHeight * dpr);

        canvas.getContext().scale(dpr, dpr);


        fabricRef.current = canvas;

        /* =============================
           FABRIC EVENTS
        ============================= */

        canvas.on("object:moving", e => {
            const obj = e.target;
            if (!isEditableObject(obj)) return;

            clampPosition(obj, printAreaRef.current);
            obj.setCoords();
        });

        canvas.on("object:scaling", e => {
            const obj = e.target;
            if (!isEditableObject(obj)) return;

            clampScale(obj, printAreaRef.current);
            clampPosition(obj, printAreaRef.current);
            obj.setCoords();
        });

        canvas.on("object:rotating", e => {
            const obj = e.target;
            if (!isEditableObject(obj)) return;

            // rotation breaks bounding box → hard snap
            snapInsidePrintArea(obj, printAreaRef.current);
            obj.setCoords();
        });

        canvas.on("selection:created", e => {
            onSelectionChange?.(e.selected?.[0] || null);
        });

        canvas.on("selection:updated", e => {
            onSelectionChange?.(e.selected?.[0] || null);
        });

        canvas.on("selection:cleared", () => {
            onSelectionChange?.(null);
        });

        return () => {
            canvas.dispose();
            fabricRef.current = null;
        };
    }, []);

    return fabricRef;
}
