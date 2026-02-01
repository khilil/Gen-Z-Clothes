import "./CollectiveFooter.css";

function CollectiveFooter() {
  return (
    <>
      {/* JOIN THE COLLECTIVE */}
      <section className="collective">
        <div className="collective-inner">
          <div className="collective-text">
            <h2>
              JOIN THE <br /> COLLECTIVE
            </h2>
            <p>
              Priority access to drops and member-only pricing.
            </p>
          </div>

          <form className="collective-form">
            <input
              type="email"
              placeholder="ENTER EMAIL ADDRESS"
              required
            />
            <button type="submit">
              SUBSCRIBE
              <span className="material-symbols-outlined">east</span>
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">

          {/* BRAND */}
          <div className="footer-brand">
            <h3>MODERN MEN</h3>
            <p>
              Uncompromising aesthetics for the urban professional.<br />
              Based in New York City.
            </p>

            <div className="footer-social">
              <span className="material-symbols-outlined">public</span>
              <span className="material-symbols-outlined">share</span>
              <span className="material-symbols-outlined">language</span>
            </div>
          </div>

          {/* ASSISTANCE */}
          <div className="footer-col">
            <h4>ASSISTANCE</h4>
            <a href="#">Shipping Matrix</a>
            <a href="#">Returns Archive</a>
            <a href="#">Atelier Care</a>
            <a href="#">Privilege Policy</a>
          </div>

          {/* DEPARTMENT */}
          <div className="footer-col">
            <h4>DEPARTMENT</h4>
            <a href="#">New Archives</a>
            <a href="#">Denim Series</a>
            <a href="#">Formal Tailoring</a>
            <a href="#">Essential Tech</a>
          </div>

          {/* FLAGSHIP */}
          <div className="footer-col">
            <h4>FLAGSHIP</h4>
            <p className="footer-address">
              245 Fifth Avenue <br />
              NoMad District, New York <br />
              NY 10016 <br /><br />
              Mon–Sat: 10:00 – 20:00
            </p>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="footer-bottom">
          <p>© 2024 MODERN MEN LTD. ALL ARCHIVES PROTECTED.</p>

          <div className="footer-payments">
            <span className="material-symbols-outlined">credit_card</span>
            <span className="material-symbols-outlined">payments</span>
            <span className="material-symbols-outlined">wallet</span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default CollectiveFooter;
