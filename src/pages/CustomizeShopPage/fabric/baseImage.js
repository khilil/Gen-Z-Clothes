import { Image as FabricImage } from "fabric";

export async function addBaseImage(canvas, imageURL) {
  if (!imageURL) return;

  const img = await FabricImage.fromURL(imageURL, {
    crossOrigin: "anonymous",
  });

  const scale = Math.min(
    canvas.width / img.width,
    canvas.height / img.height
  ) * 1.5;

  img.scale(scale);

  img.set({
    left: canvas.width / 2,
    top: canvas.height / 2,
    originX: "center",
    originY: "center",
    selectable: false,
    evented: false,
    hasControls: true,
    hasBorders: false,
    hoverCursor: "default",
    excludeFromExport: true,
  });


  canvas.toJSON()
  canvas.add(img);
  canvas.moveObjectTo(img, 0);
  canvas.renderAll();

  return img;
}
