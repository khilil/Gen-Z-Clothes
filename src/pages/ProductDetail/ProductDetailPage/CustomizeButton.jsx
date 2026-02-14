import React from "react";

const CustomizeButton = ({ isEnabled, onClick }) => {
    if (!isEnabled) return false; // 🔥 if false → nothing render

    return (
        <button
            onClick={onClick}
            className="w-full h-16 border border-[#d4c4b1]/40 text-[#d4c4b1] text-[11px] font-black uppercase tracking-[0.3em] hover:bg-[#d4c4b1] hover:text-black transition-all flex items-center justify-center gap-3"
        >
            Customize Your Own{" "}
            <span className="material-symbols-outlined">brush</span>
        </button>
    );
};

export default CustomizeButton;
