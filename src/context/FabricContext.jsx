import { createContext, useContext, useRef } from "react";

const FabricContext = createContext(null);

export function FabricProvider({ children }) {
    const canvasRef = useRef(null);
    const fabricCanvas = useRef(null);
    const printAreaRef = useRef(null);
    const activeTextRef = useRef(null);
    const activeShapeRef = useRef(null);
    const activeObjectRef = useRef(null);

    // 🔥 Store JSON instead of PNG
    const frontDesignRef = useRef(null);
    const backDesignRef = useRef(null);

    const layersRef = useRef([]);
    const designStateRef = useRef(null);
    const viewSideRef = useRef("front");
    const isCanvasReadyRef = useRef(false);

    function syncLayers(canvas) {
        if (!canvas) return;
        layersRef.current = canvas
            .getObjects()
            .filter(obj => !obj.excludeFromExport);
    }

    return (
        <FabricContext.Provider
            value={{
                canvasRef,
                fabricCanvas,
                printAreaRef,
                activeTextRef,
                activeShapeRef,
                activeObjectRef,
                layersRef,
                designStateRef,
                isCanvasReadyRef,
                syncLayers,
                viewSideRef,
                frontDesignRef,
                backDesignRef,
            }}
        >
            {children}
        </FabricContext.Provider>
    );
}

export function useFabric() {
    const ctx = useContext(FabricContext);
    if (!ctx) {
        throw new Error("useFabric must be used inside FabricProvider");
    }
    return ctx;
}
