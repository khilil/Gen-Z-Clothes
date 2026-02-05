import "./About.css";

const About = () => {
  return (
    <main className="about-page">

      {/* HERO */}
      <section className="about-hero">
        <nav className="about-breadcrumb">
          <a href="#">Home</a>
          <span>/</span>
          <strong>About Us</strong>
        </nav>

        <h1 className="about-title">OUR STORY</h1>
      </section>

      {/* IMAGE */}
      <section className="about-image-section">
        <div className="about-image-wrapper">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMhJPH52uhc2uLVL6E9VFWUJJ45NhBgAMsSKXSlI7HSTPRjaQXIekP_DtzuPxRAQelsMMm9pQCL0c1Bz_98-LfkyYdhUqZvnB16AWJZY7TL69xACH_Fq7M_5lKN3Jol1VjE-ORrEC8Oyd01Vk05qeKzaBXmLOskqq4-8OFN8QaMrS_uv63Q80R4MmH-VVqf5XBjyMRDrkqlsj1wXC1_E_TDIi72OWRh4G9PxcOsWeA0eiM07iAJRyBnQ_NWqX0879AoSfl0k3Ee7O9"
            alt="Modern Men Lifestyle"
          />
        </div>
      </section>

      {/* STORY */}
      <section className="about-story">
        <h2>Crafting the Modern Silhouette</h2>

        <p>
          Founded in 2020, MODERN MEN emerged from a simple realization:
          the modern gentleman deserves a wardrobe that speaks to his ambition
          without sacrificing comfort.
        </p>

        <p>
          Our philosophy blends traditional craftsmanship with contemporary
          design, focusing on quality, comfort, and confidence.
        </p>

        <p>
          Every piece is produced in limited runs to ensure premium quality
          and reduce environmental impact.
        </p>

        <div className="story-divider"></div>
      </section>

      {/* VALUES */}
      <section className="about-values">
        <div className="values-header">
          <h4>Our Core Values</h4>
          <h3>THE STANDARDS WE LIVE BY</h3>
        </div>

        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon">
              <span className="material-symbols-outlined">workspace_premium</span>
            </div>
            <h5>Premium Quality</h5>
            <p>Only the finest materials sourced from heritage mills.</p>
          </div>

          <div className="value-card">
            <div className="value-icon">
              <span className="material-symbols-outlined">local_shipping</span>
            </div>
            <h5>Fast Shipping</h5>
            <p>Optimized global logistics for quick delivery.</p>
          </div>

          <div className="value-card">
            <div className="value-icon">
              <span className="material-symbols-outlined">support_agent</span>
            </div>
            <h5>24/7 Support</h5>
            <p>Concierge team always available for assistance.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <h2>JOIN THE REVOLUTION</h2>
        <p>Elegance is the only beauty that never fades.</p>
        <a href="#">Explore Collection</a>
      </section>

    </main>
  );
};

export default About;
