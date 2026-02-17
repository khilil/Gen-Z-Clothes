import "./Products.css";

const products = [
  {
    title: "Raw Denim Tapered",
    subtitle: "Selvedge Finish",
    price: "$185.00",
    img1: "https://lh3.googleusercontent.com/aida-public/AB6AXuCodgCBHrDDAKZiy_yLimGjExrGQiJCfXcXJfLWHl4Irh2cLT4n4gReNV689yTVQ9fJoTCJ3FNsbYaLIoXVRCDhgsj1PHVZAKrFjiiDMdCMef22iG7YPZu2Uf3WODJGniW_m4dvs0W1kZ64Dyvz7jgfd9qnUqB5Oj4RR0f0XDXh7rOLdrPBYEA7CXnJtiW-DLsG7Wg5wfxK4vfCsIg_TUKqQ0DYZLbKLOoj7j1Vl3g3UYLHKNW8pfdOvv2kGOkuBURQfEoUJiRSifgs",
    img2: "https://lh3.googleusercontent.com/aida-public/AB6AXuDs9WQldQT9ZGJbWJ68InNhiV1oLDbI575rx8p-Z3rSJLJCka7bEeyAyw20NtNVH0YZ2EKc40JMwu2hPyFnE_PoY4LKC1fknLVHsNXS-kL2X8KuKRiReiHDJTUq2CRL9JTAQqLCy3Plh53TyYYObKjlHeuE90nCcFCim1r_EGrOq-LVd3DckR1gCo5E5VmJuPSWFa0we3DjNIifh58JepO45b3urTlhy7vRLzZAcXg611xlcC1d4U4rQCxLiIW8Zy1Yp6n82cKXC9hf"
  },
  {
    title: "Heavy Cotton Crew",
    subtitle: "Premium Slate",
    price: "$65.00",
    img1: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWF4PTb3zmAbIdIirT7eY4DhgJBx4vO67JP5MS7BECxSSi6K4MT8c07xzeZMyXfJqN_JDcEfrl_xAsyMch_WbfelTD_rsmGHePjYvJRa7OBFERkWq2x2y3l-7BIGk4_SiqtQW95PHHE2R6fps9DfuGJxSpWXziPY2tK1IuN0vii6KNC4VFe6f0V9SLJMfcD7jR65SF3uKMR7E51ixXtpOwYmAR09240s-tu3-BY5nTzPE6J2wrXJ49m8C8r_HRyQtqokNsg_guYzQ2",
    img2: "https://lh3.googleusercontent.com/aida-public/AB6AXuCG5grYfiRd6Pr_epZfGVr6vP75nCUx5d3faRYuRLP_QunjgzUMUK55QJ78B63LG652tX5dBllWrLbllu5OoN85VcJDOkNsZYN4LdLYSqEx1k72KEiAbED4MBtvfDPGcniFvoqSscotaKqk1BzYqdVndGwMnKqlUg8lJYgOmxqN5ZiWYvJC7w0Bmt6uK5feGSkZfkwwNluuieN3iIafv_r69BxlFC9JdNhKrkOOcdzohyl9CBdwUP4Cnou6qVDbCyzmjrm1UQJvlDIv"
  }
];

function AdminProducts() {
  return (
    <section className="products">
      <div className="products-header">
        <span>NEW ARRIVALS</span>
        <h2>THE EDIT</h2>
        <a href="#">EXPLORE ALL</a>
      </div>

      <div className="products-grid">
        {products.map((p, i) => (
          <div className="product-card" key={i}>
            <div className="product-image">
              <img src={p.img1} alt={p.title} className="img-main" />
              <img src={p.img2} alt={p.title} className="img-hover" />

              <button className="quick-add">ADD TO BAG</button>
            </div>

            <div className="product-info">
              <h4>{p.title}</h4>
              <p>{p.subtitle}</p>
              <strong>{p.price}</strong>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AdminProducts;
