import Categories from "../../components/Hero/Categories Card's/Categories";
import Hero from "../../components/Hero/Hero";
import Products from "../../components/Hero/Products/Products";
import './Home.css'
import CollectiveFooter from "../../components/common/CollectiveFooter/CollectiveFooter";
import Header from "../../components/common/Header/Header";

function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <Products />
      <section className="urban">
        {/* Background Image */}
        <div className="urban-bg"></div>

        {/* Content */}
        <div className="urban-content">
          <span className="urban-tag">
            LEGACY OF DETAIL
          </span>

          <h2 className="urban-title">
            URBAN <br /> TAILORING
          </h2>

          <p className="urban-text">
            We don’t build trends. We engineer garments that survive them.
            High-utility design meets uncompromising craftsmanship for the
            modern icon.
          </p>

          <a href="#" className="urban-btn">
            DISCOVER THE PHILOSOPHY
          </a>
        </div>
      </section>
      <CollectiveFooter/>
    </>
  );
}

export default Home;
