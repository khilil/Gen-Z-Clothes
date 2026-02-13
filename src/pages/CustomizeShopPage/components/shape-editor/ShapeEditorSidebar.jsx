import { FiArrowLeft } from "react-icons/fi";
import ElementLibrary from "../ElementLibrary";
import ShapeGrid from "./ShapeGrid";
import { useFabric } from "../../../../context/FabricContext";
import { updateOpacity, updateShape, updateStrokeWidth } from "../../fabric/Shapes/shapeActions";
import { useState } from "react";
import LayersPanel from "../LayersPanel";
import PreviewButton from "../Preview/PreviewButton";

export default function ShapeEditorSidebar() {
    const { fabricCanvas, activeShapeRef } = useFabric();
    const [opacity, setOpacity] = useState(100);
    const [strokeWidth, setStrokeWidth] = useState(2);

    return (
        <div className="w-full bg-[#151518] border-l border-white/[0.06] flex flex-col h-full overflow-y-auto no-scrollbar">

            {/* 🔙 Back Button */}
            <div className="top-0 z-20 bg-[#151518] px-10 pt-8 pb-4 border-b border-white/[0.06]">
                <button
                    onClick={() => window.history.back()}
                    className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#9a9a9a] hover:text-[#d4c4b1] transition-colors duration-300"
                >
                    <FiArrowLeft size={18} />
                    Back
                </button>
            </div>


            <div className="p-10 space-y-12 pb-48">
                {/* ================= ELEMENT LIBRARY ================= */}
                <section className="space-y-6">
                    <ElementLibrary />
                </section>

                {/* ================= SHAPE LIBRARY ================= */}
                <section className="space-y-6">

                    <div className="flex items-center justify-between">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#d4c4b1]">
                            02. Shape Library
                        </h4>
                        <span className="material-symbols-outlined text-[#d4c4b1] text-sm">
                            category
                        </span>
                    </div>

                    <ShapeGrid />

                    {/* ================= SHAPE CONTROLS ================= */}
                    <div className="space-y-10 pt-6">

                        <h5 className="text-[9px] font-black uppercase tracking-[0.2em] text-[#9a9a9a]">
                            Shape Controls
                        </h5>

                        {/* Fill Color */}
                        <div className="space-y-4">
                            <label className="text-[9px] font-bold uppercase tracking-widest text-[#9a9a9a]">
                                Fill Color
                            </label>

                            <div className="flex gap-3 flex-wrap">
                                {["#ff0000", "#ffffff"].map((color) => (
                                    <button
                                        key={color}
                                        onClick={() =>
                                            updateShape(activeShapeRef, fabricCanvas.current, {
                                                fill: color,
                                            })
                                        }
                                        className="w-7 h-7 rounded-full transition-all duration-300 ease-in-out hover:scale-110 hover:ring-2 hover:ring-white/[0.15]"
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Stroke Color */}
                        <div className="space-y-4">
                            <label className="text-[9px] font-bold uppercase tracking-widest text-[#9a9a9a]">
                                Stroke Color
                            </label>

                            <div className="flex gap-3 flex-wrap">
                                <button
                                    onClick={() =>
                                        updateShape(activeShapeRef, fabricCanvas.current, {
                                            stroke: "#ffffff",
                                        })
                                    }
                                    className="w-7 h-7 rounded-full bg-white transition-all duration-300 ease-in-out hover:scale-110 hover:ring-2 hover:ring-white/[0.15]"
                                />
                            </div>
                        </div>

                        {/* Opacity */}
                        <div className="space-y-4">
                            <div className="flex justify-between text-[9px] font-mono text-[#b3b3b3]">
                                <span>Opacity</span>
                                <span>{opacity}%</span>
                            </div>

                            <div className="bg-[#1a1a1d] border border-white/[0.06] px-3 py-3">
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
                                    className="w-full h-[2px] bg-white/[0.08] appearance-none accent-[#d4c4b1]"
                                />
                            </div>
                        </div>

                        {/* Stroke Width */}
                        <div className="space-y-4">
                            <div className="flex justify-between text-[9px] font-mono text-[#b3b3b3]">
                                <span>Stroke Width</span>
                                <span>{strokeWidth}px</span>
                            </div>

                            <div className="bg-[#1a1a1d] border border-white/[0.06] px-3 py-3">
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
                                    className="w-full h-[2px] bg-white/[0.08] appearance-none accent-[#d4c4b1]"
                                />
                            </div>
                        </div>

                        <LayersPanel />

                        {/* 🔍 PREVIEW BUTTON */}
                    </div>
                </section>



            </div>
            <PreviewButton />
        </div>
    );
}
