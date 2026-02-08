export default function LayersPanel() {
    return (
        <section className="space-y-6">
            <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#d4c4b1]">
                03. Layers
            </h4>

            <div className="space-y-2">
                <div className="flex items-center gap-4 bg-white/5 border border-white/20 p-4">
                    <span className="material-symbols-outlined">text_fields</span>
                    <span className="text-[10px] uppercase flex-1">
                        Studio Edit (Text)
                    </span>
                </div>

                <div className="flex items-center gap-4 border border-white/5 p-4 opacity-50">
                    <span className="material-symbols-outlined">image</span>
                    <span className="text-[10px] uppercase flex-1">Base T-Shirt</span>
                    <span className="material-symbols-outlined">lock</span>
                </div>
            </div>
        </section>
    );
}
