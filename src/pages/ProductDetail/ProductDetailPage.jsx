import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetailPage.css";
import CollectiveFooter from "../../components/common/CollectiveFooter/CollectiveFooter";

export default function ProductDetailPage() {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [size, setSize] = useState("M");
    const [sleeve, setSleeve] = useState("full");
    const [openAcc, setOpenAcc] = useState(null);

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
                        <button className="add-to-bag">
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

            <CollectiveFooter />
        </>
    );
}
