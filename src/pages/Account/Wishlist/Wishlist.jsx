import "./Wishlist.css";

const Wishlist = () => {
  return (
    <div className="wishlist">
      {/* 🏛️ ARCHIVES: SAVED PROTOCOLS */}
      <header className="mb-20 border-b-2 border-black pb-8">
        <h1 className="font-[Oswald] text-7xl font-bold uppercase tracking-tighter leading-[0.85]">
          Wishlist
        </h1>
        <div className="flex justify-between items-end mt-4">
          <p className="text-[10px] uppercase tracking-[0.4em] font-black text-black/40">
            Saved Collection & Desired Assets
          </p>
          <button className="text-[9px] font-black uppercase tracking-widest px-8 py-4 bg-black text-white hover:bg-gray-800 transition-all duration-500 shadow-lg">
            Deploy All to Cart
          </button>
        </div>
      </header>

      {/* GRID */}
      <div className="wishlist-grid">
        {/* CARD */}
        <div className="wishlist-card">
          <div className="wishlist-image">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwsZp-Pn1cf91xCfR0zKcdmcBt88piN2EqmVP9zCCl3Yx0ESZ63MgKxhyhxaFIQpCOEyIa15Iqm4aMMPB_8her15N4ANWbU2CPwY6ECoCf4-9Rfizxu3FWAeZIISVUbRgKZneU-UZhsbxixrWytLLNqlH7PDRkDdZjtTnkqSUAHbMRkc6Mfb1mfBVAxFYjhUaWAPwRZ0uDBiiVRdLxDrRpJy2pRAAM5QjzAgw1T5zZXk7S8Rc3BUrL9aLhcxVFv3Q9Krw26dUDkay1"
              alt="Premium Oxford Shirt"
            />
            <button className="remove-icon">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="wishlist-info">
            <p className="wishlist-category">Premium Essentials</p>
            <h3>Premium Oxford Shirt</h3>
            <p className="wishlist-price">₹4,990</p>

            <div className="wishlist-actions">
              <button className="btn-primary">Add to Cart</button>
              <button className="btn-muted">Remove</button>
            </div>
          </div>
        </div>

        {/* CARD */}
        <div className="wishlist-card">
          <div className="wishlist-image">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuANt1UV_27JxD0QhRvqnX5zP1F_g8Cxd5nKWvbq_eMzCTBPe74Z05DHTqm4ZAPp-_5tFfFAJw6Lrh8GJO5E549XCShDl3DslSyTEZPoZDPcRGWAlBowfgvRG3YDkO2eok1vMlgXmDSbCqSlJ38JDIYMQF06t_zYBRukNZCLnQ0CGuhVBJxQDxdYHC6aObPjqxX_6_PjzdP5yUBt7R7XrICDG9I-1U6wVe95Dd7WM0qnqTBIqwYCx2yQ8SXrH5F7qpNqS_o9IieXa0N2"
              alt="Raw Selvedge Denim"
            />
            <button className="remove-icon">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="wishlist-info">
            <p className="wishlist-category">Signature Series</p>
            <h3>Raw Selvedge Denim</h3>
            <p className="wishlist-price">₹7,490</p>

            <div className="wishlist-actions">
              <button className="btn-primary">Add to Cart</button>
              <button className="btn-muted">Remove</button>
            </div>
          </div>
        </div>

        {/* CARD */}
        <div className="wishlist-card">
          <div className="wishlist-image">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwsZp-Pn1cf91xCfR0zKcdmcBt88piN2EqmVP9zCCl3Yx0ESZ63MgKxhyhxaFIQpCOEyIa15Iqm4aMMPB_8her15N4ANWbU2CPwY6ECoCf4-9Rfizxu3FWAeZIISVUbRgKZneU-UZhsbxixrWytLLNqlH7PDRkDdZjtTnkqSUAHbMRkc6Mfb1mfBVAxFYjhUaWAPwRZ0uDBiiVRdLxDrRpJy2pRAAM5QjzAgw1T5zZXk7S8Rc3BUrL9aLhcxVFv3Q9Krw26dUDkay1"
              alt="Linen Blazer"
            />
            <button className="remove-icon">
              <span className="material-symbols-outlined">close</span>
            </button>
            <span className="wishlist-badge">Limited Edition</span>
          </div>

          <div className="wishlist-info">
            <p className="wishlist-category">Summer Tailoring</p>
            <h3>Linen Structured Blazer</h3>
            <p className="wishlist-price">₹8,990</p>

            <div className="wishlist-actions">
              <button className="btn-primary">Add to Cart</button>
              <button className="btn-muted">Remove</button>
            </div>
          </div>
        </div>
      </div>

      {/* LOAD MORE */}
      <div className="wishlist-footer">
        <button className="load-more">
          View More from Wishlist
          <span className="material-symbols-outlined">
            keyboard_arrow_down
          </span>
        </button>
      </div>
    </div>
  );
};

export default Wishlist;
