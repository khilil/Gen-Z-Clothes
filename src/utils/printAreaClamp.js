export function clampToPrintArea(obj, printArea) {
    if (!obj || !printArea) return;

    obj.setCoords();

    const objBounds = obj.getBoundingRect(true, true);
    const areaBounds = printArea.getBoundingRect(true, true);

    let newLeft = obj.left;
    let newTop = obj.top;

    // LEFT
    if (objBounds.left < areaBounds.left) {
        newLeft += areaBounds.left - objBounds.left;
    }

    // RIGHT
    if (objBounds.left + objBounds.width > areaBounds.left + areaBounds.width) {
        newLeft -=
            objBounds.left +
            objBounds.width -
            (areaBounds.left + areaBounds.width);
    }

    // TOP
    if (objBounds.top < areaBounds.top) {
        newTop += areaBounds.top - objBounds.top;
    }

    // BOTTOM
    if (objBounds.top + objBounds.height > areaBounds.top + areaBounds.height) {
        newTop -=
            objBounds.top +
            objBounds.height -
            (areaBounds.top + areaBounds.height);
    }

    obj.set({
        left: newLeft,
        top: newTop,
    });

    obj.setCoords();
}
