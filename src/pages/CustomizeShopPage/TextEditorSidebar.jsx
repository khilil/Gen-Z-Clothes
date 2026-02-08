
import { useState } from "react";
import { useFabric } from "../../context/FabricContext";
import ElementLibrary from "./components/ElementLibrary";
import { FONT_FAMILIES } from "./fabric/fontRegistry";
import { addOrUpdateText, applyFontFamily } from "./fabric/textActions";
import { waitForFont } from "./fabric/fontUtils";
import { useNavigate } from "react-router-dom";
import { applyTextAlignment } from "./fabric/textActions";


export default function TextEditorSidebar() {
    const navigate = useNavigate();

    const { fabricCanvas, activeTextRef, printAreaRef } = useFabric();

    const [fontFamily, setFontFamily] = useState("Oswald");


    async function handleFontChange(fontFamily) {
        if (!fabricCanvas.current || !activeTextRef.current) return;

        await waitForFont(fontFamily);

        activeTextRef.current.set({
            fontFamily,
            width: printAreaRef.current.width - 40, // 🔒 KEEP WRAP
        });

        activeTextRef.current.initDimensions(); // 🔥 IMPORTANT
        activeTextRef.current.setCoords();
        fabricCanvas.current.requestRenderAll();
    }


    const handleTextChange = (e) => {
        addOrUpdateText(
            fabricCanvas.current,
            activeTextRef,
            { text: e.target.value },
            printAreaRef.current // ✅ PASS PRINT AREA
        );
    };


    function handleColor(color) {
        if (!fabricCanvas.current) return;

        addOrUpdateText(
            fabricCanvas.current,
            activeTextRef,
            { fill: color },           // ✅ options
            printAreaRef.current       // ✅ printArea
        );
    }


    function handleFont(font) {
        addOrUpdateText(fabricCanvas.current, activeObject, {
            fontFamily: font,
        });
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

    console.log("PRINT AREA:", printAreaRef.current);



    return (
        <div className="lg:w-2/5 custom-studio-overlay border-l border-white/5 flex flex-col h-full overflow-y-auto no-scrollbar">

            <div className="p-10 space-y-12 pb-48">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-accent transition-colors mb-6"
                >
                    <span className="material-symbols-outlined text-sm">
                        arrow_back
                    </span>
                    Back
                </button>

                {/* 01. TEXT STYLING */}
                <section className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-accent">
                            01. Text Styling
                        </h4>
                        <span className="material-symbols-outlined text-accent text-sm">
                            text_fields
                        </span>
                    </div>

                    <div className="space-y-4">

                        {/* TEXT INPUT */}
                        <div className="space-y-2">
                            <label className="text-[9px] font-bold uppercase tracking-widest text-white/40">
                                Enter Text
                            </label>
                            <input
                                type="text"
                                defaultValue="Studio Edit"
                                onChange={handleTextChange}
                                className="w-full bg-black/40 border-white/10 border p-4 text-xs font-bold tracking-widest uppercase focus:ring-0 focus:border-accent transition-colors"
                            />
                        </div>

                        {/* FONT FAMILY */}
                        <div className="space-y-2">
                            <label className="text-[9px] font-bold uppercase tracking-widest text-white/40">
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
                                    className="w-full bg-black/40 border-white/10 border p-4 text-xs font-bold tracking-widest appearance-none focus:ring-0 focus:border-accent cursor-pointer"
                                >
                                    {FONT_FAMILIES.map((font) => (
                                        <option key={font.value} value={font.value}>
                                            {font.label}
                                        </option>
                                    ))}
                                </select>

                                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
                                    expand_more
                                </span>
                            </div>
                        </div>

                        {/* ALIGNMENT + KERNING */}
                        <div className="grid grid-cols-2 gap-6 pt-2">

                            {/* ALIGNMENT */}
                            <div className="flex border border-white/10 h-12">
                                <button
                                    onClick={() => handleAlignment("left")}
                                    className="flex-1 flex items-center justify-center border-r border-white/10 hover:bg-white hover:text-black transition-all"
                                >
                                    <span className="material-symbols-outlined text-lg">
                                        format_align_left
                                    </span>
                                </button>

                                <button
                                    onClick={() => handleAlignment("center")}
                                    className="flex-1 flex items-center justify-center border-r border-white/10 hover:bg-white hover:text-black transition-all"
                                >
                                    <span className="material-symbols-outlined text-lg">
                                        format_align_center
                                    </span>
                                </button>

                                <button
                                    onClick={() => handleAlignment("right")}
                                    className="flex-1 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                                >
                                    <span className="material-symbols-outlined text-lg">
                                        format_align_right
                                    </span>
                                </button>
                            </div>


                            {/* KERNING */}
                            <div className="space-y-2">
                                <label className="text-[9px] font-bold uppercase tracking-widest text-white/40">
                                    Kerning
                                </label>
                                <div className="flex items-center h-12 gap-3 px-2">
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        defaultValue="20"
                                        className="flex-1 h-px bg-white/10 appearance-none accent-white"
                                    />
                                    <span className="text-[9px] font-mono font-bold text-white/60">
                                        0.2em
                                    </span>
                                </div>
                            </div>

                        </div>

                        {/* TEXT COLORS */}
                        <div className="space-y-4 pt-4">
                            <label className="text-[9px] font-bold uppercase tracking-widest text-white/40 ">
                                Text Color Selection
                            </label>

                            <div className="flex gap-4 my-4">
                                <button
                                    onClick={() => handleColor("#000")}
                                    className="w-8 h-8 rounded-full bg-black ring-2 ring-accent ring-offset-2 ring-offset-charcoal"
                                />
                                <button
                                    onClick={() => handleColor("#fff")}
                                    className="w-8 h-8 rounded-full bg-white hover:scale-110 transition-transform"
                                />
                                <button
                                    onClick={() => handleColor("#800000")}
                                    className="w-8 h-8 rounded-full bg-red-800 hover:scale-110 transition-transform"
                                />
                                <button
                                    onClick={() => handleColor("#d4c4b1")}
                                    className="w-8 h-8 rounded-full bg-[#d4c4b1] hover:scale-110 transition-transform"
                                />
                                 <button
                                    onClick={() => handleColor("#E93562")}
                                    className="w-8 h-8 rounded-full bg-[#E93562] hover:scale-110 transition-transform"
                                />
                                <button className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10">
                                    <span className="material-symbols-outlined text-sm">add</span>
                                </button>
                            </div>
                        </div>

                    </div>
                </section>

                {/* 02. ELEMENT LIBRARY */}
                <section className="space-y-6">
                    <ElementLibrary />
                </section>

            </div>
        </div>
    );

}
