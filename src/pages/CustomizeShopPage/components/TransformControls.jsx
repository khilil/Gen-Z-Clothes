export default function TransformControls() {
    return (
        <section className="space-y-6">
            <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#d4c4b1]">
                01. Transform Controls
            </h4>

            <div className="grid grid-cols-4 gap-2">
                {["open_with", "sync", "flip", "aspect_ratio"].map(icon => (
                    <button
                        key={icon}
                        className="h-12 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                    >
                        <span className="material-symbols-outlined">{icon}</span>
                    </button>
                ))}
            </div>

            <div className="space-y-4 pt-2">
                <div className="flex items-center gap-4">
                    <span className="text-[9px] uppercase text-white/40 w-8">Scale</span>
                    <input type="range" className="flex-1 accent-white" />
                    <span className="text-[9px] font-mono text-white/60">100%</span>
                </div>

                <div className="flex items-center gap-4">
                    <span className="text-[9px] uppercase text-white/40 w-8">Rot.</span>
                    <input type="range" className="flex-1 accent-white" />
                    <span className="text-[9px] font-mono text-white/60">0°</span>
                </div>
            </div>
        </section>
    );
}
