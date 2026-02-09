import CanvasArea from "./components/CanvasArea";
import TextEditorSidebar from './TextEditorSidebar'

export default function TextEditorPage() {
    return (
        <div className="bg-[#0a0a0a] text-white min-h-screen">
            <main className="h-full overflow-y-auto custom-studio-overlay">
                <TextEditorSidebar />
            </main>
        </div>
    );
}
