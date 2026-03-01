import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { Instagram } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./InstagramFeed.css";

const feedItems = [
    {
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop",
        link: "#"
    },
    {
        image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1974&auto=format&fit=crop",
        link: "#"
    },
    {
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
        link: "#"
    },
    {
        image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=2073&auto=format&fit=crop",
        link: "#"
    },
    {
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop",
        link: "#"
    },
    {
        image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop",
        link: "#"
    }
];

function InstagramFeed() {
    const navigate = useNavigate();
    return (
        <section className="instagram-section">
            <div className="section-header">
                <motion.span
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-tag"
                >
                    COMMUNITY
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="section-title"
                >
                    SHOP THE LOOK
                </motion.h2>
                <motion.p
                    className="insta-handle"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.5 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    @GENZ_CLOTHS_OFFICIAL
                </motion.p>
            </div>

            <div className="insta-grid">
                {feedItems.map((item, index) => (
                    <motion.div
                        key={index}
                        className="insta-card"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05, duration: 0.5 }}
                        onClick={() => navigate("/category/all")}
                        style={{ cursor: 'pointer' }}
                    >
                        <img src={item.image} alt="Social Feed" />
                        <div className="insta-overlay">
                            <Instagram size={24} />
                            <span>SHOP NOW</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

export default InstagramFeed;
