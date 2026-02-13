import TransformControls from "./TransformControls";
import ElementLibrary from "./ElementLibrary";
import LayersPanel from "./LayersPanel";
import FabricColorPicker from "./FabricColorPicker";

export default function StudioSidebar() {
    return (
        <aside className="w-full bg-[#121212] border-l border-white/5 overflow-y-auto">
            <div className="p-10 space-y-12 pb-48">
                <ElementLibrary />
                <TransformControls />
                <LayersPanel />
                <FabricColorPicker />
            </div>
        </aside>
    );
}
