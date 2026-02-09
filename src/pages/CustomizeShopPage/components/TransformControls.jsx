import { useState, useEffect } from "react";
import { useFabric } from "../../../context/FabricContext";
import {
    resetRotation,
    flipHorizontal,
    rotateObject,
    scaleObject,
} from "../fabric/Trans Form Actions/transformActions";

export default function TransformControls() {
    const { fabricCanvas, activeObjectRef } = useFabric();

    const [scale, setScale] = useState(100);
    const [rotation, setRotation] = useState(0);

    const hasObject = !!activeObjectRef.current;

    // 🔁 Sync UI when object changes
    useEffect(() => {
        if (!activeObjectRef.current) return;

        const obj = activeObjectRef.current;
        setScale(Math.round(obj.scaleX * 100));
        setRotation(Math.round(obj.angle || 0));
    }, [activeObjectRef.current]);

    const disabledUI = !hasObject
        ? "opacity-40 pointer-events-none"
        : "opacity-100";

    return (
        <section className="space-y-6">
            <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#d4c4b1]">
                01. Transform Controls
            </h4>

            {/* ICON ACTIONS */}
            <div className={`grid grid-cols-4 gap-2 ${disabledUI}`}>
                <button
                    onClick={() =>
                        flipHorizontal(fabricCanvas.current, activeObjectRef.current)
                    }
                    className="h-12 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black"
                >
                    <span className="material-symbols-outlined">flip</span>
                </button>

                <button
                    onClick={() =>
                        resetRotation(fabricCanvas.current, activeObjectRef.current)
                    }
                    className="h-12 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black"
                >
                    <span className="material-symbols-outlined">sync</span>
                </button>

                <button
                    onClick={() =>
                        rotateObject(fabricCanvas.current, activeObjectRef.current, 90)
                    }
                    className="h-12 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black"
                >
                    <span className="material-symbols-outlined">rotate_right</span>
                </button>

                <button className="h-12 border border-white/10 flex items-center justify-center">
                    <span className="material-symbols-outlined">lock</span>
                </button>
            </div>

            {/* SLIDERS */}
            <div className={`space-y-4 pt-2 ${disabledUI}`}>
                {/* SCALE */}
                <div className="flex items-center gap-4">
                    <span className="text-[9px] uppercase text-white/40 w-8">
                        Scale
                    </span>
                    <input
                        type="range"
                        min="10"
                        max="300"
                        value={scale}
                        onChange={(e) => {
                            const value = Number(e.target.value);
                            setScale(value);
                            scaleObject(
                                fabricCanvas.current,
                                activeObjectRef.current,
                                value / 100
                            );
                        }}
                        className="flex-1 accent-white"
                    />
                    <span className="text-[9px] font-mono text-white/60">
                        {scale}%
                    </span>
                </div>

                {/* ROTATION */}
                <div className="flex items-center gap-4">
                    <span className="text-[9px] uppercase text-white/40 w-8">
                        Rot.
                    </span>
                    <input
                        type="range"
                        min="-180"
                        max="180"
                        value={rotation}
                        onChange={(e) => {
                            const value = Number(e.target.value);
                            setRotation(value);
                            rotateObject(
                                fabricCanvas.current,
                                activeObjectRef.current,
                                value
                            );
                        }}
                        className="flex-1 accent-white"
                    />
                    <span className="text-[9px] font-mono text-white/60">
                        {rotation}°
                    </span>
                </div>
            </div>

            {!hasObject && (
                <p className="text-[9px] text-white/40 italic">
                    Select an element to transform
                </p>
            )}
        </section>
    );
}
