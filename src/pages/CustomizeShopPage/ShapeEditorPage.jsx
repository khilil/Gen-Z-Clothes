import CanvasArea from "./components/CanvasArea";
import ShapeEditorSidebar from "./components/shape-editor/ShapeEditorSidebar";

export default function ShapeEditorPage() {
    return (
        <div className="bg-[#0a0a0a] text-white min-h-screen">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5 h-20">
                <div className="max-w-[1920px] mx-auto h-full px-12 flex items-center justify-between">
                    <h1 className="text-3xl font-impact tracking-tighter">
                        MODERN MEN
                    </h1>

                    <span className="hidden lg:block text-[10px] font-black uppercase tracking-[0.4em] text-accent">
                        Shape Library
                    </span>

                    <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:text-accent">
                        <span className="material-symbols-outlined text-lg">close</span>
                        Exit Studio
                    </button>
                </div>
            </header>

            {/* Main */}
            <main className="pt-20 h-screen flex overflow-hidden">
                <CanvasArea />
                <ShapeEditorSidebar />
            </main>
        </div>
    );
}
