
// export function isEditableObject(obj) {
//     return obj && obj.selectable && !obj.isBaseProduct;
// }

export function isEditableObject(obj) {
    return obj &&
        obj.type !== "image" &&
        obj.selectable !== false;
}


export function centerObjectInArea(obj, printArea) {
    obj.set({
        left: printArea.left + printArea.width / 2,
        top: printArea.top + printArea.height / 2,
        originX: "center",
        originY: "center"
    });
}

export function customizeControls(fabric) {
    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.cornerColor = "#ffffff";
    fabric.Object.prototype.cornerSize = 12;
    fabric.Object.prototype.borderColor = "rgba(255,255,255,0.6)";
    fabric.Object.prototype.cornerStyle = "rect";
}
