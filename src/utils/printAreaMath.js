export function getPrintArea(canvas) {
    const w = canvas.getWidth();
    const h = canvas.getHeight();

    return {
        left: w * 0.225,
        top: h * 0.15,
        width: w * 0.55,
        height: h * 0.65,
    };
}

export function clampObjectToPrintArea(obj, canvas) {
    if (!obj) return;

    const area = getPrintArea(canvas);
    const bounds = obj.getBoundingRect(true);

    if (bounds.left < area.left)
        obj.left += area.left - bounds.left;

    if (bounds.top < area.top)
        obj.top += area.top - bounds.top;

    if (bounds.left + bounds.width > area.left + area.width)
        obj.left -= bounds.left + bounds.width - (area.left + area.width);

    if (bounds.top + bounds.height > area.top + area.height)
        obj.top -= bounds.top + bounds.height - (area.top + area.height);

    obj.setCoords();
}


// utils/printAreaMath.js

/**
 * Get object bounding box in canvas coordinates
 */
export function getObjectBounds(obj) {
    const bounds = obj.getBoundingRect(true, true);
    return {
        left: bounds.left,
        top: bounds.top,
        right: bounds.left + bounds.width,
        bottom: bounds.top + bounds.height,
        width: bounds.width,
        height: bounds.height
    };
}

/**
 * Check if object is fully inside print area
 */
export function isInsidePrintArea(objBounds, printArea) {
    return (
        objBounds.left >= printArea.left &&
        objBounds.top >= printArea.top &&
        objBounds.right <= printArea.right &&
        objBounds.bottom <= printArea.bottom
    );
}

/**
 * Clamp object position inside print area (MOVE)
 */
export function clampPosition(obj, printArea) {
    const bounds = getObjectBounds(obj);

    let dx = 0;
    let dy = 0;

    if (bounds.left < printArea.left) {
        dx = printArea.left - bounds.left;
    }
    if (bounds.right > printArea.right) {
        dx = printArea.right - bounds.right;
    }
    if (bounds.top < printArea.top) {
        dy = printArea.top - bounds.top;
    }
    if (bounds.bottom > printArea.bottom) {
        dy = printArea.bottom - bounds.bottom;
    }

    if (dx !== 0 || dy !== 0) {
        obj.left += dx;
        obj.top += dy;
    }
}

/**
 * Clamp scale so object never exceeds print area
 */
export function clampScale(obj, printArea) {
    const bounds = getObjectBounds(obj);

    const scaleX = obj.scaleX;
    const scaleY = obj.scaleY;

    if (
        bounds.width > printArea.width ||
        bounds.height > printArea.height
    ) {
        const scaleFactorX = printArea.width / bounds.width;
        const scaleFactorY = printArea.height / bounds.height;
        const scaleFactor = Math.min(scaleFactorX, scaleFactorY);

        obj.scaleX = scaleX * scaleFactor;
        obj.scaleY = scaleY * scaleFactor;
    }
}

/**
 * Hard snap object back fully inside print area
 * (used after rotate)
 */
export function snapInsidePrintArea(obj, printArea) {
    clampPosition(obj, printArea);
    clampScale(obj, printArea);
}
