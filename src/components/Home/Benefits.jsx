import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { Truck, ShieldCheck, RefreshCcw, Headset } from "lucide-react";
import "./Benefits.css";

const benefitItems = [
    {
        icon: <Truck size={32} />,
        title: "GLOBAL SHIPPING",
        description: "Express delivery to over 150 countries worldwide."
    },
    {
        icon: <ShieldCheck size={32} />,
        title: "SECURE PAYMENTS",
        description: "Encryption protocols protecting every transaction."
    },
    {
        icon: <RefreshCcw size={32} />,
        title: "MODERN RETURNS",
        description: "Seamless 30-day return policy for peace of mind."
    },
    {
        icon: <Headset size={32} />,
        title: "24/7 SUPPORT",
        description: "Our concierge team is available around the clock."
    }
];

function Benefits() {
    return (
        <section className="benefits-section">
            <div className="benefits-container">
                {benefitItems.map((item, index) => (
                    <motion.div
                        key={index}
                        className="benefit-card"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                    >
                        <div className="benefit-icon">
                            {item.icon}
                        </div>
                        <div className="benefit-info">
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

export default Benefits;
