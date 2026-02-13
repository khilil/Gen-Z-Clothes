import CanvasArea from "./components/CanvasArea";
import ShapeEditorSidebar from "./components/shape-editor/ShapeEditorSidebar";

export default function ShapeEditorPage() {
    return (
        <div className="bg-[#0a0a0a] text-white min-h-screen">
            {/* Main */}
            <main className="h-screen flex overflow-hidden">
                <ShapeEditorSidebar />
            </main>
        </div>
    );
}
