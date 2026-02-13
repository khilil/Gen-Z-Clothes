// PreviewButton.jsx
import { useNavigate, useParams } from "react-router-dom";
import { useFabric } from "../../../../context/FabricContext";

export default function PreviewButton() {
    const navigate = useNavigate();
    const { slug } = useParams();
    const { fabricCanvas, frontDesignRef, backDesignRef, viewSideRef } = useFabric();

    const handlePreview = () => {
        const canvas = fabricCanvas.current;
        if (!canvas) return;

        const dataURL = canvas.toDataURL({
            format: "png",
            quality: 1,
            multiplier: 2,
        });

        if (viewSideRef.current === "front") {
            frontDesignRef.current = dataURL;
        } else {
            backDesignRef.current = dataURL;
        }

        navigate(`/customize/${slug}/preview`);
    };


    return (
        <div className="sticky bottom-0 bg-black border-t border-white/10 ">
            <button
                onClick={handlePreview}
                className="w-full py-5 text-xs uppercase tracking-widest bg-[#d4c4b1] text-black font-bold hover:opacity-90 transition-all duration-300"
            >
                Preview Design
            </button>
        </div>
    );
}