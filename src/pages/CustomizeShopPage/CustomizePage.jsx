import BottomCTA from "./components/BottomCTA";
import CanvasArea from "./components/CanvasArea";
import StudioSidebar from "./components/StudioSidebar";


export default function CustomizePage() {
    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#0a0a0a] text-white">
            {/* HEADER */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5 h-20">
                <div className="max-w-[1920px] mx-auto h-full px-8 flex items-center justify-between">
                    <h1 className="text-3xl font-impact tracking-tighter">MODERN MEN</h1>
                    <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:text-[#d4c4b1]">
                        <span className="material-symbols-outlined">close</span>
                        Exit Studio
                    </button>
                </div>
            </header>

            {/* MAIN */}
            <main className="pt-20 h-screen flex overflow-hidden">
                <CanvasArea />
                <StudioSidebar />
            </main>

            {/* <BottomCTA /> */}
        </div>
    );
}
