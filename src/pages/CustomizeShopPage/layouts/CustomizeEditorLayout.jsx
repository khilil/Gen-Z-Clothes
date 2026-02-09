// layouts/CustomizeEditorLayout.jsx
import { Outlet } from "react-router-dom";
import { FabricProvider } from "../../../context/FabricContext";
import CanvasArea from "../components/CanvasArea";

export default function CustomizeEditorLayout() {
    return (
        <FabricProvider>
            <div className="bg-[#0a0a0a] pt-20 min-h-screen">

                {/* Layout */}
                <div className="flex flex-col md:flex-row min-h-[calc(100vh-80px)]">

                    {/* CANVAS */}
                    <div className="w-full md:w-[70%] h-[55vh] md:h-auto flex items-center justify-center shrink-0">
                        <CanvasArea />
                    </div>

                    {/* SIDEBAR */}
                    <div className="w-full md:w-[30%] flex flex-col border-t md:border-t-0 md:border-l border-white/5">
                        <Outlet />
                    </div>

                </div>
            </div>
        </FabricProvider>
    );
}


