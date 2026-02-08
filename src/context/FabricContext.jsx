import { createContext, useContext, useRef } from "react";

const FabricContext = createContext(null);

export function FabricProvider({ children }) {
    const canvasRef = useRef(null);
    const fabricCanvas = useRef(null);

    const printAreaRef = useRef(null);     // ✅ ADD
    const activeTextRef = useRef(null);    // ✅ ADD

    // 🔥 NEW: persist design
    const designStateRef = useRef(null);

    return (
        <FabricContext.Provider
            value={{
                canvasRef,
                fabricCanvas,
                printAreaRef,
                activeTextRef,
                designStateRef
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
