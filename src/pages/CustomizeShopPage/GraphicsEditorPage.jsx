import { FiArrowLeft } from "react-icons/fi";
import CanvasArea from "./components/CanvasArea";
import ElementLibrary from "./components/ElementLibrary";


export default function GraphicsEditorPage() {
    return (
        <div className="bg-[#0a0a0a] text-white min-h-screen">
            {/* HEADER */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5 h-20">
                <div className="max-w-[1920px] mx-auto h-full px-12 flex items-center justify-between">
                    <h1 className="text-3xl font-impact tracking-tighter">
                        MODERN MEN
                    </h1>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#d4c4b1]">
                        Graphic Library
                    </span>
                </div>
            </header>

            {/* MAIN */}
            <main className="pt-20 h-screen flex overflow-hidden">
                {/* LEFT – CANVAS */}
                <CanvasArea />

                {/* RIGHT – GRAPHIC CONTROLS */}
                <div className="w-2/5 bg-[#121212] border-l border-white/5 p-10 space-y-12 overflow-y-auto">
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

                    {/* 01. Graphic Library */}
                    <section className="space-y-6">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#d4c4b1]">
                            01. Graphic Library
                        </h4>

                        <div className="grid grid-cols-4 gap-4">
                            {[
                                "cardiology",
                                "bolt",
                                "stat_3",
                                "gesture",
                                "diamond",
                                "webhook",
                                "visibility",
                                "pentagon"
                            ].map(icon => (
                                <button
                                    key={icon}
                                    className="bg-black/40 aspect-square border border-white/5
                             flex items-center justify-center
                             hover:border-[#d4c4b1] transition-all"
                                >
                                    <span className="material-symbols-outlined text-2xl">
                                        {icon}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* 02. Element Library */}
                    <ElementLibrary />

                    {/* 03. Layers (STATIC for now) */}
                    <section className="space-y-4">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#d4c4b1]">
                            03. Layers
                        </h4>

                        <div className="bg-white/5 border border-white/20 p-4 flex items-center gap-4">
                            <span className="material-symbols-outlined text-[#d4c4b1]">
                                cardiology
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-widest flex-1">
                                Heart (Graphic)
                            </span>
                            <span className="material-symbols-outlined text-red-400 cursor-pointer">
                                delete
                            </span>
                        </div>
                    </section>

                    {/* 04. Fabric Color */}
                    <section className="space-y-4">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#d4c4b1]">
                            04. Fabric Color
                        </h4>

                        <div className="flex gap-4">
                            <button className="w-10 h-10 rounded-full bg-white" />
                            <button className="w-10 h-10 rounded-full bg-black border border-white/20" />
                            <button className="w-10 h-10 rounded-full bg-[#2d3a3a]" />
                            <button className="w-10 h-10 rounded-full bg-[#d4c4b1]" />
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
