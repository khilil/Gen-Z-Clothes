// src/utils/printAreaClamp.js
export function clampToPrintArea(obj, printArea) {
    if (!obj || !printArea) return;

    const bounds = obj.getBoundingRect(true);

    const leftLimit = printArea.left - printArea.width / 2;
    const rightLimit = printArea.left + printArea.width / 2;
    const topLimit = printArea.top - printArea.height / 2;
    const bottomLimit = printArea.top + printArea.height / 2;

    if (bounds.left < leftLimit) {
        obj.left += leftLimit - bounds.left;
    }

    if (bounds.left + bounds.width > rightLimit) {
        obj.left -= (bounds.left + bounds.width) - rightLimit;
    }

    if (bounds.top < topLimit) {
        obj.top += topLimit - bounds.top;
    }

    if (bounds.top + bounds.height > bottomLimit) {
        obj.top -= (bounds.top + bounds.height) - bottomLimit;
    }
}
