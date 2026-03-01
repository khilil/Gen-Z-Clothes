import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { ArrowRight } from "lucide-react";
import "./Newsletter.css";

function Newsletter() {
    return (
        <section className="newsletter-section">
            <div className="newsletter-bg"></div>

            <div className="newsletter-content">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="newsletter-text"
                >
                    <span className="newsletter-tag">JOIN THE INNER CIRCLE</span>
                    <h2 className="newsletter-title">
                        STAY AHEAD OF <br /> <span>THE CURVE</span>
                    </h2>
                    <p className="newsletter-desc">
                        Subscribe to receive early access to drops, exclusive lookbooks,
                        and the latest atelier updates. No spam, just pure intent.
                    </p>
                </motion.div>

                <motion.form
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="newsletter-form"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <div className="input-group">
                        <input
                            type="email"
                            placeholder="YOUR EMAIL ADDRESS"
                            required
                        />
                        <button type="submit" className="submit-btn" aria-label="Subscribe">
                            <ArrowRight size={20} />
                        </button>
                    </div>
                    <div className="form-footer">
                        <label className="checkbox-container">
                            <input type="checkbox" required />
                            <span className="checkmark"></span>
                            <span className="label-text">I AGREE TO THE PRIVACY POLICY & TERMS OF SERVICE</span>
                        </label>
                    </div>
                </motion.form>
            </div>
        </section>
    );
}

export default Newsletter;
