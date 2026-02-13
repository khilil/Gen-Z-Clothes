import { Image as FabricImage } from "fabric";

// 🔥 Replace with your real images
const FRONT_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDuFUz1mgOhqTqhYH6sm0rNtTbQ0-Li067nl97kdiBcIkYxfRHYUZFOK_snplFfjKR_fyd0iBmTy6pQj3f9njo3co4ZCiGwhH_RTShwML_5xXkgJ-2EY2I2ByZ64kb7Cuxg4jv88QdDElu90YGHyHWTE5d1UPX9YuhyIGc6E4Zu-v_LXqclizbegdhw2I5hpG2dRHD4Dc4oodz4dt8LHRGyB4MeFDeY_J_luf147r9JtQS8UvmZnIm34rNw9uP3AXgT-iWKhiMa_UbF";

const BACK_IMAGE =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcWKbFqDo9ZWhq3QdR3s_fGLgMfgqKV5OmxA&s"; // 🔁 replace with real back image

export async function addBaseImage(canvas, side = "front") {

  const imageURL = side === "front" ? FRONT_IMAGE : BACK_IMAGE;

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
    hasControls: false,
    hasBorders: false,
    hoverCursor: "default",
    excludeFromExport: true, // 🔥 important
  });

  canvas.add(img);
  canvas.moveObjectTo(img, 0);
  canvas.renderAll();

  return img;
}
