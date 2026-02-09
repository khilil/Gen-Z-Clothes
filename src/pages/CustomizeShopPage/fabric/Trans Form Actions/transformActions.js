export function flipHorizontal(canvas, obj) {
    if (!canvas || !obj) return;

    obj.set({ flipX: !obj.flipX });
    obj.setCoords();
    canvas.requestRenderAll();
}

export function rotateObject(canvas, obj, angle) {
    if (!canvas || !obj) return;

    obj.set({ angle });
    obj.setCoords();
    canvas.requestRenderAll();
}

export function scaleObject(canvas, obj, scale) {
    if (!canvas || !obj) return;

    obj.set({
        scaleX: scale,
        scaleY: scale,
    });

    obj.setCoords();
    canvas.requestRenderAll();
}

export function resetRotation(canvas, obj) {
    if (!canvas || !obj) return;

    obj.set({ angle: 0 });
    obj.setCoords();
    canvas.requestRenderAll();
}
