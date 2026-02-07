// FabricContext.js
import { createContext, useContext } from "react";

export const FabricContext = createContext(null);

export const useFabric = () => {
    const ctx = useContext(FabricContext);
    if (!ctx) {
        throw new Error("useFabric must be used inside FabricProvider");
    }
    return ctx;
};
