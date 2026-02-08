import { clampObjectInsidePrintArea } from "../../../utils/printAreaMath";

export function attachClampEvents(canvas, printArea) {
    canvas.on("object:moving", e => {
        clampObjectInsidePrintArea(e.target, printArea);
    });

    canvas.on("object:scaling", e => {
        clampObjectInsidePrintArea(e.target, printArea);
    });

    canvas.on("object:rotating", e => {
        clampObjectInsidePrintArea(e.target, printArea);
    });
}
