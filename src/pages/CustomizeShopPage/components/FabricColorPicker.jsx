export default function FabricColorPicker() {
    const colors = ["white", "black", "#2d3a3a", "#d4c4b1"];

    return (
        <section className="space-y-6">
            <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#d4c4b1]">
                04. Fabric Color
            </h4>

            <div className="flex gap-6">
                {colors.map(color => (
                    <button
                        key={color}
                        className="w-10 h-10 rounded-full border border-white/20"
                        style={{ backgroundColor: color }}
                    />
                ))}
            </div>
        </section>
    );
}
