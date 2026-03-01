import { motion, useScroll, useTransform } from "framer-motion"; // eslint-disable-line no-unused-vars
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./BrandStory.css";

function BrandStory() {
    const containerRef = useRef(null);
    const navigate = useNavigate();
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section className="brand-story" ref={containerRef} style={{ position: 'relative' }}>
            <motion.div
                className="story-bg"
                style={{ y }}
            >
                <div className="story-overlay"></div>
            </motion.div>

            <div className="story-content" style={{ opacity }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                >
                    <span className="story-tag">OUR PHILOSOPHY</span>
                    <h2 className="story-title">
                        DECODING THE <br />
                        <span>URBAN NARRATIVE</span>
                    </h2>
                </motion.div>

                <motion.div
                    className="story-text-grid"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 1 }}
                >
                    <div className="text-column">
                        <p>
                            We don’t just make clothes; we engineer armor for the modern icon.
                            Genz-Cloths was born from a desire to bridge the gap between
                            utilitarian durability and high-street aesthetics.
                        </p>
                    </div>
                    <div className="text-column">
                        <p>
                            Every stitch is a statement of intent. Every fabric is chosen for
                            its ability to survive trends and the test of time. We believe in
                            the legacy of detail and the power of raw character.
                        </p>
                        <button onClick={() => navigate("/about")} className="story-link" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                            DISCOVER OUR CRAFT
                            <span className="arrow">→</span>
                        </button>
                    </div>
                </motion.div>
            </div>

            <div className="story-footer-stats">
                <div className="stat-item">
                    <span className="stat-value">100%</span>
                    <span className="stat-label">ORIGINAL DESIGN</span>
                </div>
                <div className="divider"></div>
                <div className="stat-item">
                    <span className="stat-value">EST.</span>
                    <span className="stat-label">2024 / LONDON</span>
                </div>
                <div className="divider"></div>
                <div className="stat-item">
                    <span className="stat-value">GLOBAL</span>
                    <span className="stat-label">DISTRIBUTION</span>
                </div>
            </div>
        </section>
    );
}

export default BrandStory;
