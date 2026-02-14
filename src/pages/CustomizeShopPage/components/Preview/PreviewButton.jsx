// PreviewButton.jsx
import { useNavigate, useParams } from "react-router-dom";
import { useFabric } from "../../../../context/FabricContext";

export default function PreviewButton() {
    const navigate = useNavigate();
    const { slug } = useParams();
    const { fabricCanvas, frontDesignRef, backDesignRef, viewSideRef, productDataRef } = useFabric();

    const handlePreview = () => {
        const canvas = fabricCanvas.current;
        if (!canvas) return;

        const json = canvas.toJSON();
        console.log("🔥 Saving JSON:", json);
        if (viewSideRef.current === "front") {
            frontDesignRef.current = json;
            console.log("💾 Saved FRONT before preview");
        } else {
            backDesignRef.current = json;
            console.log("💾 Saved BACK before preview");
        }

        navigate(`/customize/${slug}/preview`, {
            state: {
                frontImage: productDataRef.current.frontImage,
                backImage: productDataRef.current.backImage
            }
        });
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