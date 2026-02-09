import { useEffect, useState } from "react";
import { useFabric } from "../../../context/FabricContext";


export default function LayersPanel() {
    const { fabricCanvas, activeTextRef } = useFabric();
    const [layers, setLayers] = useState([]);

    // 🔄 Sync layers from canvas
    useEffect(() => {
        const canvas = fabricCanvas.current;
        if (!canvas) return;

        const updateLayers = () => {
            const objects = canvas.getObjects();
            // top-most layer first
            setLayers([...objects].reverse());
        };

        updateLayers();

        canvas.on("object:added", updateLayers);
        canvas.on("object:removed", updateLayers);
        canvas.on("object:modified", updateLayers);
        canvas.on("selection:created", updateLayers);
        canvas.on("selection:updated", updateLayers);
        canvas.on("selection:cleared", updateLayers);

        return () => {
            canvas.off("object:added", updateLayers);
            canvas.off("object:removed", updateLayers);
            canvas.off("object:modified", updateLayers);
            canvas.off("selection:created", updateLayers);
            canvas.off("selection:updated", updateLayers);
            canvas.off("selection:cleared", updateLayers);
        };
    }, [fabricCanvas]);

    // 🎯 Select layer
    const selectLayer = (obj) => {
        const canvas = fabricCanvas.current;
        if (!canvas || !obj.selectable) return;

        canvas.setActiveObject(obj);
        activeTextRef.current = obj.type === "textbox" ? obj : null;
        canvas.requestRenderAll();
    };

    // 👁 Toggle visibility
    const toggleVisibility = (obj) => {
        obj.visible = !obj.visible;
        fabricCanvas.current.requestRenderAll();
        setLayers([...layers]);
    };

    // 🔒 Toggle lock
    const toggleLock = (obj) => {
        if (obj.layerType === "base") return;

        obj.selectable = !obj.selectable;
        obj.evented = obj.selectable;
        fabricCanvas.current.discardActiveObject();
        fabricCanvas.current.requestRenderAll();
        setLayers([...layers]);
    };

    // 🗑 Delete layer
    const deleteLayer = (obj) => {
        if (obj.layerType === "base") return;

        fabricCanvas.current.remove(obj);
        fabricCanvas.current.requestRenderAll();
    };

    function getLayerLabel(obj) {
        if (obj.type === "textbox") return "Text";
        if (obj.type === "image") return "Image";
        if (obj.type === "rect" || obj.type === "circle" || obj.type === "triangle")
            return "Shape";
        return "Layer";
    }

    function renderIcon(obj) {
        // 🖼 Image thumbnail
        if (obj.type === "image") {
            return (
                <img
                    src={obj._originalElement?.src}
                    alt=""
                    className="w-8 h-8 object-cover border border-white/10"
                />
            );
        }

        // 🔤 Text
        if (obj.type === "textbox") {
            return (
                <span className="material-symbols-outlined text-sm">
                    text_fields
                </span>
            );
        }

        // ⬛ Shape
        return (
            <span className="material-symbols-outlined text-sm">
                category
            </span>
        );
    }

    return (
        <section className="space-y-6">
            <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#d4c4b1]">
                03. Layers
            </h4>

            <div className="space-y-2">
                {layers.map((obj, index) => {
                    const isActive =
                        fabricCanvas.current?.getActiveObject() === obj;

                    return (
                        <div
                            key={index}
                            onClick={() => selectLayer(obj)}
                            className={`flex items-center gap-3 p-3 border cursor-pointer transition
                ${isActive ? "bg-white/10 border-white/30" : "border-white/10"}
                ${!obj.visible ? "opacity-40" : ""}
              `}
                        >
                            <button
                                key={index}
                                onClick={() => selectLayer(obj)}
                                className={`w-full flex items-center gap-4 p-3 border text-left transition
                                ${isActive
                                        ? "bg-white/10 border-white"
                                        : "border-white/10 hover:bg-white/5"
                                    }
                            `}
                            >
                                {renderIcon(obj)}

                                <span className="text-[10px] uppercase tracking-widest flex-1">
                                    {getLayerLabel(obj)}
                                </span>

                                {obj.lockMovementX && (
                                    <span className="material-symbols-outlined text-sm text-white/40">
                                        lock
                                    </span>
                                )}
                            </button>
                            {/* ICON */}
                            <span className="material-symbols-outlined text-sm">
                                {obj.layerType === "text" && "text_fields"}
                                {obj.layerType === "shape" && "category"}
                                {obj.layerType === "image" && "image"}
                                {obj.layerType === "base" && "checkroom"}
                            </span>

                            {/* NAME */}
                            <span className="text-[10px] uppercase flex-1 truncate">
                                {obj.name || obj.layerType}
                            </span>

                            {/* 👁 VISIBILITY */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleVisibility(obj);
                                }}
                                className="text-white/60 hover:text-white"
                            >
                                <span className="material-symbols-outlined text-sm">
                                    {obj.visible ? "visibility" : "visibility_off"}
                                </span>
                            </button>

                            {/* 🔒 LOCK */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleLock(obj);
                                }}
                                className={`text-white/60 hover:text-white ${obj.layerType === "base" ? "opacity-30 pointer-events-none" : ""
                                    }`}
                            >
                                <span className="material-symbols-outlined text-sm">
                                    {obj.selectable ? "lock_open" : "lock"}
                                </span>
                            </button>

                            {/* 🗑 DELETE */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteLayer(obj);
                                }}
                                className={`text-red-400 hover:text-red-600 ${obj.layerType === "base" ? "opacity-30 pointer-events-none" : ""
                                    }`}
                            >
                                <span className="material-symbols-outlined text-sm">
                                    delete
                                </span>
                            </button>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
