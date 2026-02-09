export default function ShapeIcon({ type }) {
    switch (type) {
        case "rect":
            return <div className="w-6 h-6 border border-white" />;

        case "rounded":
            return <div className="w-6 h-6 border border-white rounded-md" />;

        case "circle":
            return <div className="w-6 h-6 border border-white rounded-full" />;

        case "triangle":
            return (
                <div
                    className="w-0 h-0"
                    style={{
                        borderLeft: "12px solid transparent",
                        borderRight: "12px solid transparent",
                        borderBottom: "20px solid white",
                    }}
                />
            );

        case "line":
            return <div className="w-6 h-[2px] bg-white" />;

        case "star":
            return <span className="text-white text-lg">★</span>;

        case "heart":
            return <span className="text-white text-lg">♥</span>;

        default:
            return null;
    }
}
