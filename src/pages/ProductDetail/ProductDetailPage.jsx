import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetailPage.css";
import CollectiveFooter from "../../components/common/CollectiveFooter/CollectiveFooter";
import { useCart } from "../../context/CartContext";

export default function ProductDetailPage() {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [size, setSize] = useState("M");
    const [sleeve, setSleeve] = useState("full");
    const [openAcc, setOpenAcc] = useState(null);

    const { addToCart } = useCart();

    useEffect(() => {
        fetch(`https://api.escuelajs.co/api/v1/products/slug/${slug}`)
            .then(res => res.json())
            .then(setProduct);
    }, [slug]);

    if (!product) return <div className="loader">Loading…</div>;

    return (
        <>
            <main className="product-page">

                {/* GALLERY */}
                <div className="gallery">
                    {product.images.map((img, i) => (
                        <div key={i} className="image-wrap">
                            <img src={img} alt={product.title} />
                        </div>
                    ))}
                </div>

                {/* INFO */}
                <aside className="info-panel">

                    <nav className="breadcrumb">
                        Home / {product.category?.name} / {product.title}
                    </nav>

                    <h1 className="title">{product.title}</h1>

                    {/* REVIEWS */}
                    <div className="reviews">
                        ★★★★☆ <span>(48 REVIEWS)</span>
                    </div>

                    {/* PRICE */}
                    <div className="price-row">
                        <span className="price">${product.price}.00</span>
                        <span className="old-price">${product.price + 40}.00</span>
                    </div>

                    <p className="description">{product.description}</p>

                    {/* PALETTE */}
                    <div className="palette">
                        <h4>Palette: <span>Optic White</span></h4>
                        <div className="colors">
                            <span className="color white active"></span>
                            <span className="color black"></span>
                            <span className="color beige"></span>
                            <span className="color green"></span>
                        </div>
                    </div>

                    {/* SIZE */}
                    <div className="sizes">
                        <div className="sizes-header">
                            <h4>Select Size</h4>
                            <button className="size-guide">Size Guide</button>
                        </div>

                        <div className="size-grid">
                            {["XS", "S", "M", "L", "XL"].map(s => (
                                <button
                                    key={s}
                                    className={size === s ? "active" : ""}
                                    onClick={() => setSize(s)}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* SLEEVE */}
                    <div className="sleeve">
                        <h4>Sleeve Type</h4>
                        <div className="sleeve-options">
                            <button
                                className={sleeve === "full" ? "active" : ""}
                                onClick={() => setSleeve("full")}
                            >
                                Full Sleeve
                            </button>
                            <button
                                className={sleeve === "short" ? "active" : ""}
                                onClick={() => setSleeve("short")}
                            >
                                Short Sleeve
                            </button>
                        </div>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="actions">
                        {/* button */}
                        <button
                            className="add-to-bag"
                            onClick={() => addToCart(product, size, sleeve)}
                        >
                            Add to Bag
                            <span className="material-symbols-outlined">shopping_bag</span>
                        </button>

                        <button className="buy-now">
                            Buy it Now
                        </button>
                    </div>


                    {/* DELIVERY */}
                    <div className="delivery">
                        <h4>Delivery Options</h4>
                        <div className="pincode">
                            <input placeholder="Enter Pincode" />
                            <button>Check</button>
                        </div>
                    </div>

                    {/* ACCORDION */}
                    <div className="accordion">
                        {[
                            { key: "fabric", label: "Fabric & Care", content: "100% Cotton. Machine wash cold. Do not bleach." },
                            { key: "shipping", label: "Shipping & Returns", content: "Free shipping above $99. Easy 7-day returns." }
                        ].map(item => (
                            <div key={item.key} className="acc-item">
                                <button
                                    onClick={() => setOpenAcc(openAcc === item.key ? null : item.key)}
                                >
                                    {item.label}
                                    <span>{openAcc === item.key ? "−" : "+"}</span>
                                </button>

                                {openAcc === item.key && (
                                    <p>{item.content}</p>
                                )}
                            </div>
                        ))}
                    </div>

                </aside>
            </main>
            {/* COMPLETE THE LOOK */}
            <section className="complete-look">
                <div className="container">

                    <div className="complete-look-header">
                        <h2 className="complete-look-title">COMPLETE THE LOOK</h2>

                        <div className="complete-look-nav">
                            <button>
                                <span className="material-symbols-outlined">west</span>
                            </button>
                            <button>
                                <span className="material-symbols-outlined">east</span>
                            </button>
                        </div>
                    </div>

                    <div className="complete-look-grid">

                        <div className="complete-look-card">
                            <div className="complete-look-image">
                                <img
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuANt1UV_27JxD0QhRvqnX5zP1F_g8Cxd5nKWvbq_eMzCTBPe74Z05DHTqm4ZAPp-_5tFfFAJw6Lrh8GJO5E549XCShDl3DslSyTEZPoZDPcRGWAlBowfgvRG3YDkO2eok1vMlgXmDSbCqSlJ38JDIYMQF06t_zYBRukNZCLnQ0CGuhVBJxQDxdYHC6aObPjqxX_6_PjzdP5yUBt7R7XrICDG9I-1U6wVe95Dd7WM0qnqTBIqwYCx2yQ8SXrH5F7qpNqS_o9IieXa0N2"
                                    alt="Raw Denim Trousers"
                                />
                            </div>
                            <h3 className="complete-look-name">Raw Denim Trousers</h3>
                            <p className="complete-look-price">$245</p>
                        </div>

                        <div className="complete-look-card">
                            <div className="complete-look-image">
                                <img
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXZhniQdec2wzTN85Y96dKi87Yt4THSO9wcpzep3V3Eyqgcu9XeI7TwABaUW_nsgxJtHPLjxT3LbAbRQgXEPHR9IStKAt0JMY0DOJg024RSzXhpiqnVNU_BnoE1jeN-HFLWT8pf3k_lH02ATKFzZv3icouvyCKMlUq4xrfTOwu3oahebgmq3bGbwxBqBkFesSHp2fM5PALrh2TIAxM-SmqaNm2Xsoy8MCjSC8_GWEP4Dv5p52mbY1xhP9UQrIedL_qF72iHjD-eUYA"
                                    alt="Atelier Chelsea Boot"
                                />
                            </div>
                            <h3 className="complete-look-name">Atelier Chelsea Boot</h3>
                            <p className="complete-look-price">$410</p>
                        </div>

                        <div className="complete-look-card">
                            <div className="complete-look-image">
                                <img
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwsZp-Pn1cf91xCfR0zKcdmcBt88piN2EqmVP9zCCl3Yx0ESZ63MgKxhyhxaFIQpCOEyIa15Iqm4aMMPB_8her15N4ANWbU2CPwY6ECoCf4-9Rfizxu3FWAeZIISVUbRgKZneU-UZhsbxixrWytLLNqlH7PDRkDdZjtTnkqSUAHbMRkc6Mfb1mfBVAxFYjhUaWAPwRZ0uDBiiVRdLxDrRpJy2pRAAM5QjzAgw1T5zZXk7S8Rc3BUrL9aLhcxVFv3Q9Krw26dUDkay1"
                                    alt="Urban Field Coat"
                                />
                            </div>
                            <h3 className="complete-look-name">Urban Field Coat</h3>
                            <p className="complete-look-price">$580</p>
                        </div>

                        <div className="complete-look-card">
                            <div className="complete-look-image">
                                <img
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCodgCBHrDDAKZiy_yLimGjExrGQiJCfXcXJfLWHl4Irh2cLT4n4gReNV689yTVQ9fJoTCJ3FNsbYaLIoXVRCDhgsj1PHVZAKrFjiiDMdCMef22iG7YPZu2Uf3WODJGniW_m4dvs0W1kZ64Dyvz7jgfd9qnUqB5Oj4RR0f0XDXh7rOLdrPBYEA7CXnJtiW-DLsG7Wg5wfxK4vfCsIg_TUKqQ0DYZLbKLOoj7j1Vl3g3UYLHKNW8pfdOvv2kGOkuBURQfEoUJiRSifgs"
                                    alt="Canvas Tote Archive"
                                />
                            </div>
                            <h3 className="complete-look-name">Canvas Tote Archive</h3>
                            <p className="complete-look-price">$120</p>
                        </div>

                    </div>
                </div>
            </section>


            <CollectiveFooter />
        </>
    );
}
