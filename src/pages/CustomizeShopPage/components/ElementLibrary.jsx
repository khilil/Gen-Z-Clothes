import { useNavigate, useParams } from "react-router-dom";

export default function ElementLibrary() {
    const navigate = useNavigate();
    const { slug } = useParams(); // important for dynamic route

    const items = [
        { icon: "text_fields", label: "Text", action: "text" },
        { icon: "category", label: "Shapes", action: "shapes" },
        { icon: "palette", label: "Graphics", action: "graphics" },
    ];

    const handleClick = (item) => {
        if (item.action === "text") {
            navigate(`/customize/${slug}/text`);
        }
        else if (item.action === "shapes") {
            navigate(`/customize/${slug}/shapes`);
        }
        else if (item.action === "graphics") {
            navigate(`/customize/${slug}/graphics`);
        }
        // later:
        // shapes → /customize/:slug/shapes
        // graphics → /customize/:slug/graphics
    };

    return (
        <section className="space-y-6">
            <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#d4c4b1]">
                02. Element Library
            </h4>

            <div className="grid grid-cols-3 gap-3">
                {items.map(item => (
                    <button
                        key={item.label}
                        onClick={() => handleClick(item)}
                        className="bg-black/40 aspect-square border border-white/5 flex flex-col items-center justify-center gap-2 hover:border-white/40 transition-all"
                    >
                        <span className="material-symbols-outlined text-xl">
                            {item.icon}
                        </span>
                        <span className="text-[8px] font-bold uppercase tracking-widest">
                            {item.label}
                        </span>
                    </button>
                ))}
            </div>
        </section>
    );
}
