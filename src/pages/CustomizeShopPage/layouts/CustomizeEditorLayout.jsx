import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { FabricProvider } from "../../../context/FabricContext";
import CanvasArea from "../components/CanvasArea";
import { motion, useDragControls } from "framer-motion"; // install: npm install framer-motion

// ... baki na imports same ...

export default function CustomizeEditorLayout() {
    const location = useLocation();
    const isPreview = location.pathname.includes("/preview");

    // Mobile mate state
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <FabricProvider>
            <div className="bg-[#0a0a0a] h-screen overflow-hidden flex flex-col relative">

                <div className="pt-16 flex-1 flex flex-col md:flex-row overflow-hidden relative">
                    {isPreview ? (
                        <Outlet />
                    ) : (
                        <>
                            {/* CANVAS AREA: Desktop ma fix 70% width, Mobile ma dynamic height */}
                            <div className={`w-full md:w-[70%] transition-all duration-500 ease-in-out 
                                ${isExpanded ? "h-[40vh]" : "h-[85vh]"} md:h-full 
                                flex items-center justify-center relative bg-[#0f0f0f]`}>
                                <CanvasArea />
                            </div>

                            {/* BOTTOM SHEET / SIDEBAR */}
                            <motion.div
                                // Drag logic fakt mobile mate (width < 768px)
                                drag={window.innerWidth < 768 ? "y" : false}
                                dragConstraints={{ top: 0, bottom: 0 }}
                                onDragEnd={(e, info) => {
                                    if (window.innerWidth < 768) {
                                        if (info.offset.y > 50) setIsExpanded(false);
                                        if (info.offset.y < -50) setIsExpanded(true);
                                    }
                                }}
                                className={`fixed bottom-0 left-0 right-0 w-full bg-[#121212] z-50 
                                    transition-all duration-500 ease-in-out border-t border-white/10
                                    md:relative md:w-[30%] md:h-full md:translate-y-0 md:border-t-0 md:border-l
                                    ${isExpanded ? "h-[60vh] translate-y-0" : "h-[100px] translate-y-0"} 
                                    rounded-t-[2.5rem] md:rounded-t-none shadow-[0_-10px_40px_rgba(0,0,0,0.5)] md:shadow-none`}
                            >
                                {/* Drag Handle - Desktop ma total HIDE (md:hidden) */}
                                <div
                                    className="w-full py-4 cursor-grab active:cursor-grabbing flex flex-col items-center md:hidden"
                                    onClick={() => setIsExpanded(!isExpanded)}
                                >
                                    <div className="w-12 h-1.5 bg-white/20 rounded-full mb-1"></div>
                                    {!isExpanded && (
                                        <span className="text-[8px] font-black uppercase tracking-[0.2em] text-[#d4c4b1] animate-pulse">
                                            Tap to Edit
                                        </span>
                                    )}
                                </div>

                                {/* Content Area: Desktop ma hamesha opacity-100 rahese */}
                                <div className={`h-full overflow-y-auto no-scrollbar px-2 pb-20 md:pb-10 md:pt-6
                                    ${isExpanded ? "opacity-100" : "opacity-0 md:opacity-100"} 
                                    transition-opacity duration-300`}>
                                    <Outlet />
                                </div>
                            </motion.div>
                        </>
                    )}
                </div>
            </div>
        </FabricProvider>
    );
}