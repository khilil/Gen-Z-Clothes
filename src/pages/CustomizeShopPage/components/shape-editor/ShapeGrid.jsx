import ShapeIcon from "./ShapeIcon";
import { addShape } from "../../fabric/Shapes/shapeActions";
import { useFabric } from "../../../../context/FabricContext";
import { SHAPES } from "../../fabric/Shapes/shapeRegistry";

export default function ShapeGrid() {
    const { fabricCanvas, activeShapeRef, printAreaRef } = useFabric();

    return (
        <div className="grid grid-cols-4 gap-4">
            {SHAPES.map(shape => (
                <button
                    key={shape.id}
                    onClick={() =>
                        addShape(
                            fabricCanvas.current,
                            activeShapeRef,
                            shape.id,
                            printAreaRef.current
                        )
                    }
                    className="aspect-square bg-black/40 border border-white/10 hover:border-accent flex flex-col items-center justify-center gap-2"
                >
                    <ShapeIcon type={shape.icon} />
                    <span className="text-[8px] uppercase tracking-widest text-white/60">
                        {shape.label}
                    </span>
                </button>
            ))}
        </div>
    );
}


