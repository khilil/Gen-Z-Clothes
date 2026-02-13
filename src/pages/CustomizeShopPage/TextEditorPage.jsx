import CanvasArea from "./components/CanvasArea";
import PreviewButton from "./components/Preview/PreviewButton";
import TextEditorSidebar from './TextEditorSidebar'

export default function TextEditorPage() {
    return (
        <div className="bg-[#0a0a0a] text-white min-h-screen">
            <main className="overflow-y-auto custom-studio-overlay">
                <TextEditorSidebar />
            </main>
            <PreviewButton />
        </div>
    );
}
