import BottomCTA from "./components/BottomCTA";
import CanvasArea from "./components/CanvasArea";
import StudioSidebar from "./components/StudioSidebar";


export default function CustomizePage() {
    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#0a0a0a] text-white">
            {/* MAIN */}
            <main className="h-screen flex overflow-hidden">
                <StudioSidebar />
            </main>

            {/* <BottomCTA /> */}
        </div>
    );
}
