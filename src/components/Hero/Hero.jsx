import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      {/* Background Image */}
      <div className="hero-bg">
        <div className="hero-overlay"></div>
      </div>

      {/* Content */}
      <div className="hero-content">
        <span className="hero-subtitle">
          AUTUMN / WINTER ATELIER 2024
        </span>

        <h1 className="hero-title">
          RAW <br /> CHARACTER
        </h1>

        <div className="hero-actions">
          <button className="btn-primary">
            SHOP COLLECTION
          </button>
          <button className="btn-secondary">
            VIEW LOOKBOOK
          </button>
        </div>
      </div>

      {/* Bottom text */}
      <div className="hero-footer">
        GLOBAL DISPATCH AVAILABLE
      </div>
    </section>
  );
}

export default Hero;
