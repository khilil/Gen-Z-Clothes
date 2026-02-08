import CanvasArea from "./components/CanvasArea";
import TextEditorSidebar from './TextEditorSidebar'

export default function TextEditorPage() {
    return (
        <div className="bg-[#0a0a0a] text-white min-h-screen">
            <main className="pt-20 h-screen flex">
                <CanvasArea />
                <TextEditorSidebar />
            </main>
        </div>
    );
}
