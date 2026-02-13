import { FiArrowLeft } from "react-icons/fi";
import ElementLibrary from "./components/ElementLibrary";
import { useFabric } from "../../context/FabricContext";
import { addGraphicToCanvas } from "./fabric/Graphic/components/addGraphic";

import api from "../../../public/assets/graphics/api.svg";
import calling from "../../../public/assets/graphics/calling.svg";
import cloud from "../../../public/assets/graphics/cloud.svg";
import jksAura from "../../../public/assets/graphics/JK Aura.svg";
import { addSVGToCanvas } from "./fabric/Graphic/addSVGGraphic";
import LayersPanel from "./components/LayersPanel";
import PreviewButton from "./components/Preview/PreviewButton";

export default function GraphicsEditorPage() {

    const svgGraphics = [
        { name: "Api", file: api },
        { name: "Calling", file: calling },
        { name: "Cloud", file: cloud },
        { name: "JK Aura", file: jksAura },
    ];

    const {
        fabricCanvas,
        printAreaRef,
    } = useFabric();

    const handleFabricColorChange = (color) => {
        if (!fabricCanvas.current) return;

        fabricCanvas.current.setBackgroundColor(
            color,
            fabricCanvas.current.renderAll.bind(fabricCanvas.current)
        );
    };

    return (
        <div className="bg-[#151518] text-[#f5f5f5] min-h-screen">

            {/* RIGHT PANEL */}
            <div className="w-full bg-[#151518] border-l border-white/[0.06] p-10 space-y-12 overflow-y-auto h-screen pt-10">

                {/* BACK BUTTON */}
                <div className="sticky top-0 z-20 bg-[#151518] pb-4 border-b border-white/[0.06]">
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#9a9a9a] hover:text-[#d4c4b1] transition-colors duration-300"
                    >
                        <FiArrowLeft size={18} />
                        Back
                    </button>
                </div>

                {/* 02. ELEMENT LIBRARY */}
                <section className="space-y-6">
                    <ElementLibrary />
                </section>

                {/* 01. GRAPHIC LIBRARY */}
                <section className="space-y-6">
                    <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#d4c4b1]">
                        02. Graphic Library
                    </h4>

                    <div className="grid grid-cols-4 gap-4">
                        {svgGraphics.map((item, index) => (
                            <button
                                key={index}
                                onClick={() =>
                                    addSVGToCanvas(
                                        fabricCanvas.current,
                                        item.file,
                                        printAreaRef.current
                                    )
                                }
                                className="bg-[#1a1a1d] aspect-square border border-white/[0.06]
                                           flex items-center justify-center
                                           hover:border-[#d4c4b1]
                                           hover:bg-[#1f1f23]
                                           transition-all duration-300 ease-in-out"
                            >
                                <img
                                    src={item.file}
                                    alt={item.name}
                                    className="w-10 h-10 object-contain"
                                />
                            </button>
                        ))}
                    </div>
                </section>





                {/* 04. FABRIC COLOR */}
                <section className="space-y-6">
                    <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#d4c4b1]">
                        03. Fabric Color
                    </h4>

                    <div className="flex gap-4">
                        {[
                            "#ffffff",
                            "#000000",
                            "#2d3a3a",
                            "#d4c4b1"
                        ].map((color) => (
                            <button
                                key={color}
                                onClick={() => handleFabricColorChange(color)}
                                className="w-10 h-10 rounded-full transition-all duration-300 ease-in-out hover:scale-110 hover:ring-2 hover:ring-white/[0.15]"
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>
                </section>

                {/* 03. LAYERS */}
                <section className="space-y-6">
                    <LayersPanel />
                </section>

            </div>
            <PreviewButton />
        </div>
    );
}
