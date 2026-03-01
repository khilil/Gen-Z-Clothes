import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { useNavigate } from "react-router-dom";
import "./Hero.css";

function Hero() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section className="hero" style={{ position: 'relative' }}>
      {/* Background with subtle zoom effect */}
      <motion.div
        className="hero-bg"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
      >
        <div className="hero-overlay"></div>
      </motion.div>

      {/* Content Wrapped in Motion for Staggered Entrance */}
      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.span className="hero-subtitle" variants={itemVariants}>
          AUTUMN / WINTER ATELIER 2024
        </motion.span>

        <motion.h1 className="hero-title" variants={itemVariants}>
          RAW <br /> CHARACTER
        </motion.h1>

        <motion.div className="hero-actions" variants={itemVariants}>
          <button className="btn-primary" onClick={() => navigate("/category/all")}>
            SHOP COLLECTION
          </button>
          <button className="btn-secondary" onClick={() => navigate("/about")}>
            VIEW LOOKBOOK
          </button>
        </motion.div>
      </motion.div>

      {/* Floating element for premium feel */}
      <motion.div
        className="hero-footer"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 0.4, x: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        GLOBAL DISPATCH AVAILABLE / EST. 2024
      </motion.div>

      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="mouse">
          <motion.div
            className="wheel"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </div>
        <span>SCROLL</span>
      </motion.div>
    </section>
  );
}

export default Hero;
