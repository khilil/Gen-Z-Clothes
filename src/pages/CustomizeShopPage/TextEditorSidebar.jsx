import { useState } from "react";
import { useFabric } from "../../context/FabricContext";
import ElementLibrary from "./components/ElementLibrary";
import { FONT_FAMILIES } from "./fabric/fontRegistry";
import { addOrUpdateText, applyFontFamily } from "./fabric/textActions";
import { waitForFont } from "./fabric/fontUtils";
import { useNavigate } from "react-router-dom";
import { applyTextAlignment } from "./fabric/textActions";
import LayersPanel from "./components/LayersPanel";
import PreviewButton from "./components/Preview/PreviewButton";

export default function TextEditorSidebar() {
    const navigate = useNavigate();
    const { fabricCanvas, activeTextRef, printAreaRef } = useFabric();
    const [fontFamily, setFontFamily] = useState("Oswald");

    async function handleFontChange(fontFamily) {
        if (!fabricCanvas.current || !activeTextRef.current) return;

        await waitForFont(fontFamily);

        activeTextRef.current.set({
            fontFamily,
            width: printAreaRef.current.width - 40,
        });

        activeTextRef.current.initDimensions();
        activeTextRef.current.setCoords();
        fabricCanvas.current.requestRenderAll();
    }

    const handleTextChange = (e) => {
        addOrUpdateText(
            fabricCanvas.current,
            activeTextRef,
            { text: e.target.value },
            printAreaRef.current
        );
    };

    function handleColor(color) {
        if (!fabricCanvas.current) return;

        addOrUpdateText(
            fabricCanvas.current,
            activeTextRef,
            { fill: color },
            printAreaRef.current
        );
    }

    function handleAlignment(type) {
        if (!fabricCanvas.current || !activeTextRef.current) return;

        applyTextAlignment(
            fabricCanvas.current,
            activeTextRef.current,
            type,
            printAreaRef.current
        );
    }

    return (

        <>
            <div className="h-full overflow-y-auto bg-[#151518] px-4 md:px-10">

                <div className="pt-10 space-y-12 pb-48">

                    {/* BACK BUTTON */}
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#9a9a9a] hover:text-[#d4c4b1] transition-colors duration-300 mb-6"
                    >
                        <span className="material-symbols-outlined text-sm">
                            arrow_back
                        </span>
                        Back
                    </button>

                    {/* 01. TEXT STYLING */}
                    <section className="space-y-6">
                        {/* 02. ELEMENT LIBRARY */}
                        <section className="space-y-6">
                            <ElementLibrary />
                        </section>

                        <div className="flex items-center justify-between">
                            <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#d4c4b1]">
                                02. Text Styling
                            </h4>
                            <span className="material-symbols-outlined text-[#d4c4b1] text-sm">
                                text_fields
                            </span>
                        </div>

                        <div className="space-y-6">

                            {/* TEXT INPUT */}
                            <div className="space-y-2">
                                <label className="text-[9px] font-bold uppercase tracking-widest text-[#9a9a9a]">
                                    Enter Text
                                </label>
                                <input
                                    type="text"
                                    defaultValue="Studio Edit"
                                    onChange={handleTextChange}
                                    className="w-full bg-[#1a1a1d] border border-white/[0.06] p-4 text-xs font-bold tracking-widest uppercase text-[#f5f5f5] focus:ring-0 focus:border-[#d4c4b1] transition-colors duration-300"
                                />
                            </div>

                            {/* FONT FAMILY */}
                            <div className="space-y-2">
                                <label className="text-[9px] font-bold uppercase tracking-widest text-[#9a9a9a]">
                                    Font Family
                                </label>

                                <div className="relative">
                                    <select
                                        value={fontFamily}
                                        onChange={(e) => {
                                            const selectedFont = e.target.value;
                                            setFontFamily(selectedFont);
                                            handleFontChange(selectedFont);
                                        }}
                                        className="w-full bg-[#1a1a1d] border border-white/[0.06] p-4 text-xs font-bold tracking-widest text-[#f5f5f5] appearance-none focus:ring-0 focus:border-[#d4c4b1] cursor-pointer"
                                    >
                                        {FONT_FAMILIES.map((font) => (
                                            <option key={font.value} value={font.value}>
                                                {font.label}
                                            </option>
                                        ))}
                                    </select>

                                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#9a9a9a]">
                                        expand_more
                                    </span>
                                </div>
                            </div>

                            {/* ALIGNMENT + KERNING */}
                            <div className="grid grid-cols-2 gap-6 pt-2">

                                {/* ALIGNMENT */}
                                <div className="flex border border-white/[0.06] h-12 bg-[#1a1a1d]">
                                    {["left", "center", "right"].map((align, i) => (
                                        <button
                                            key={align}
                                            onClick={() => handleAlignment(align)}
                                            className={`flex-1 flex items-center justify-center ${i !== 2 ? "border-r border-white/[0.06]" : ""
                                                } hover:bg-[#1f1f23] hover:text-[#f5f5f5] transition-all duration-300`}
                                        >
                                            <span className="material-symbols-outlined text-lg">
                                                {`format_align_${align}`}
                                            </span>
                                        </button>
                                    ))}
                                </div>

                                {/* KERNING */}
                                <div className="space-y-2">
                                    <label className="text-[9px] font-bold uppercase tracking-widest text-[#9a9a9a]">
                                        Kerning
                                    </label>

                                    <div className="flex items-center h-12 gap-3 px-2 bg-[#1a1a1d] border border-white/[0.06]">
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            defaultValue="20"
                                            className="flex-1 h-[2px] bg-white/[0.08] appearance-none accent-[#d4c4b1]"
                                        />
                                        <span className="text-[9px] font-mono font-bold text-[#b3b3b3]">
                                            0.2em
                                        </span>
                                    </div>
                                </div>

                            </div>

                            {/* TEXT COLORS */}
                            <div className="space-y-4 pt-4">
                                <label className="text-[9px] font-bold uppercase tracking-widest text-[#9a9a9a]">
                                    Text Color Selection
                                </label>

                                <div className="flex gap-4 my-4">
                                    {[
                                        "#000",
                                        "#fff",
                                        "#800000",
                                        "#d4c4b1",
                                        "#E93562"
                                    ].map((color) => (
                                        <button
                                            key={color}
                                            onClick={() => handleColor(color)}
                                            className="w-8 h-8 rounded-full transition-all duration-300 ease-in-out hover:scale-110 hover:ring-2 hover:ring-white/[0.15]"
                                            style={{ backgroundColor: color }}
                                        />
                                    ))}

                                    <button className="w-8 h-8 rounded-full border border-white/[0.08] flex items-center justify-center hover:bg-[#1f1f23] transition-all duration-300">
                                        <span className="material-symbols-outlined text-sm text-[#9a9a9a]">
                                            add
                                        </span>
                                    </button>
                                </div>
                            </div>

                        </div>
                    </section>



                    {/* 03. LAYERS */}
                    <section className="space-y-6">
                        <LayersPanel />
                    </section>

                </div>
            </div>
        </>
    );
}
