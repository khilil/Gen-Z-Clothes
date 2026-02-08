// layouts/CustomizeEditorLayout.jsx

import { Outlet } from "react-router-dom";
import { FabricProvider } from "../../../context/FabricContext";



export default function CustomizeEditorLayout() {
    console.log("✅ CustomizeEditorLayout mounted");
    return (
        <FabricProvider>
            <Outlet />
        </FabricProvider>
    );
}
