export function clampToPrintArea(obj, printArea) {
    if (!obj || !printArea) return;

    obj.setCoords();

    const objRect = obj.getBoundingRect(true);
    const areaRect = printArea.getBoundingRect();

    // 🔒 HORIZONTAL CLAMP
    if (objRect.left < areaRect.left) {
        obj.left += areaRect.left - objRect.left;
    }

    if (objRect.left + objRect.width > areaRect.left + areaRect.width) {
        obj.left -=
            (objRect.left + objRect.width) -
            (areaRect.left + areaRect.width);
    }

    // 🔒 VERTICAL CLAMP
    if (objRect.top < areaRect.top) {
        obj.top += areaRect.top - objRect.top;
    }

    if (objRect.top + objRect.height > areaRect.top + areaRect.height) {
        obj.top -=
            (objRect.top + objRect.height) -
            (areaRect.top + areaRect.height);
    }

    obj.setCoords();
}
