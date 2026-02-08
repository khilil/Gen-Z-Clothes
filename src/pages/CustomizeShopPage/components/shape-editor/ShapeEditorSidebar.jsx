import { FiArrowLeft } from "react-icons/fi";
import ElementLibrary from "../ElementLibrary";
import ShapeGrid from "./ShapeGrid";

export default function ShapeEditorSidebar() {
    return (
        <div className="w-2/5 custom-studio-overlay border-l border-white/5 flex flex-col h-full overflow-y-auto no-scrollbar">
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
                                <button className="w-6 h-6 rounded-full bg-black ring-1 ring-white/20 ring-offset-2 ring-offset-charcoal" />
                                <button className="w-6 h-6 rounded-full bg-white" />
                                <button className="w-6 h-6 rounded-full bg-red-800" />
                                <button className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[10px]">add</span>
                                </button>
                            </div>
                        </div>

                        {/* Stroke Color */}
                        <div className="space-y-4">
                            <label className="text-[9px] font-bold uppercase tracking-widest text-white/40">
                                Stroke Color
                            </label>
                            <div className="flex gap-2 flex-wrap">
                                <button className="w-6 h-6 rounded-full bg-white ring-1 ring-accent ring-offset-2 ring-offset-charcoal" />
                                <button className="w-6 h-6 rounded-full bg-black border border-white/10" />
                                <button className="w-6 h-6 rounded-full bg-accent" />
                                <button className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[10px]">add</span>
                                </button>
                            </div>
                        </div>

                        {/* Opacity */}
                        <div className="space-y-3">
                            <div className="flex justify-between text-[9px] font-mono text-white/60">
                                <span>Opacity</span>
                                <span>100%</span>
                            </div>
                            <input type="range" className="w-full h-px bg-white/10 accent-white" />
                        </div>

                        {/* Stroke Width */}
                        <div className="space-y-3">
                            <div className="flex justify-between text-[9px] font-mono text-white/60">
                                <span>Stroke Width</span>
                                <span>2px</span>
                            </div>
                            <input type="range" className="w-full h-px bg-white/10 accent-white" />
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
