import { FiArrowLeft } from "react-icons/fi";
import ElementLibrary from "../ElementLibrary";
import ShapeGrid from "./ShapeGrid";
import { useFabric } from "../../../../context/FabricContext";
import { updateOpacity, updateShape, updateStrokeWidth } from "../../fabric/Shapes/shapeActions";
import { useState } from "react";



export default function ShapeEditorSidebar() {
    const { fabricCanvas, activeShapeRef } = useFabric();
    const [opacity, setOpacity] = useState(100);
    const [strokeWidth, setStrokeWidth] = useState(2);
    


    return (
        <div className="w-full custom-studio-overlay border-l border-white/5 flex flex-col h-full overflow-y-auto no-scrollbar">
            {/* 🔙 Back Button */}
            <div className="sticky top-0 z-20 bg-[#121212] px-10 pt-8 pb-4 border-b border-white/5">
                <button
                    onClick={() => window.history.back()}
                    className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/50 hover:text-accent transition"
                >
                    <FiArrowLeft size={18} />
                    Back
                </button>
            </div>
            <div className="p-10 space-y-12 pb-48">

                {/* ================= SHAPE LIBRARY ================= */}
                <section className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-accent">
                            01. Shape Library
                        </h4>
                        <span className="material-symbols-outlined text-accent text-sm">
                            category
                        </span>
                    </div>

                    <ShapeGrid />

                    {/* Shape Controls */}
                    <div className="space-y-8 pt-4">
                        <h5 className="text-[9px] font-black uppercase tracking-[0.2em] text-white/60">
                            Shape Controls
                        </h5>

                        {/* Fill Color */}
                        <div className="space-y-4">
                            <label className="text-[9px] font-bold uppercase tracking-widest text-white/40">
                                Fill Color
                            </label>
                            <div className="flex gap-2 flex-wrap">
                                <button
                                    onClick={() =>
                                        updateShape(activeShapeRef, fabricCanvas.current, {
                                            fill: "#ff0000",
                                        })
                                    }
                                    className="w-6 h-6 rounded-full bg-red-600"
                                />
                                <button
                                    onClick={() =>
                                        updateShape(activeShapeRef, fabricCanvas.current, {
                                            fill: "#ffffff",
                                        })
                                    }
                                    className="w-6 h-6 rounded-full bg-red-100"
                                />

                            </div>
                        </div>

                        {/* Stroke Color */}
                        <div className="space-y-4">
                            <label className="text-[9px] font-bold uppercase tracking-widest text-white/40">
                                Stroke Color
                            </label>
                            <div className="flex gap-2 flex-wrap">
                                <button
                                    onClick={() =>
                                        updateShape(activeShapeRef, fabricCanvas.current, {
                                            stroke: "#ffffff",
                                        })
                                    }
                                    className="w-6 h-6 rounded-full bg-white"
                                />

                            </div>
                        </div>

                        {/* Opacity */}
                        <div className="space-y-3">
                            <div className="flex justify-between text-[9px] font-mono text-white/60">
                                <span>Opacity</span>
                                <span>{opacity}%</span>
                            </div>

                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={opacity}
                                onChange={(e) => {
                                    const value = Number(e.target.value);
                                    setOpacity(value);
                                    updateOpacity(
                                        fabricCanvas.current,
                                        activeShapeRef.current,
                                        value
                                    );
                                }}
                                className="w-full h-px bg-white/10 accent-white"
                            />
                        </div>


                        {/* Stroke Width */}
                        <div className="space-y-3">
                            <div className="flex justify-between text-[9px] font-mono text-white/60">
                                <span>Stroke Width</span>
                                <span>{strokeWidth}px</span>
                            </div>

                            <input
                                type="range"
                                min="0"
                                max="20"
                                value={strokeWidth}
                                onChange={(e) => {
                                    const value = Number(e.target.value);
                                    setStrokeWidth(value);
                                    updateStrokeWidth(
                                        fabricCanvas.current,
                                        activeShapeRef.current,
                                        value
                                    );
                                }}
                                className="w-full h-px bg-white/10 accent-white"
                            />
                        </div>

                    </div>
                </section>

                {/* ================= ELEMENT LIBRARY ================= */}
                <section className="space-y-6">
                    <ElementLibrary />
                </section>
            </div>
        </div>
    );
}
