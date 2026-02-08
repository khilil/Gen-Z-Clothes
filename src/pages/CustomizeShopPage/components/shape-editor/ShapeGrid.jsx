export default function ShapeGrid() {
    const shapes = [
        "circle-outline",
        "square-outline",
        "triangle-outline",
        "hexagon-outline",
        "circle-solid",
        "square-solid",
        "star",
        "heart"
    ];

    return (
        <div className="grid grid-cols-4 gap-4">
            {shapes.map((shape, i) => (
                <button
                    key={i}
                    className="bg-black/40 aspect-square border border-white/5 flex items-center justify-center transition-all hover:border-accent hover:bg-white/5"
                >
                    <span className="material-symbols-outlined text-xl">
                        {shape === "star" ? "star" : shape === "heart" ? "favorite" : "category"}
                    </span>
                </button>
            ))}
        </div>
    );
}
