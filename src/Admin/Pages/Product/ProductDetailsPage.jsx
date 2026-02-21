import React, { useState, useEffect } from 'react';
import { AddCategoryModal } from './AddCategoryModal';

const AddProduct = () => {
    // State management for pricing logic
    const [price, setPrice] = useState(49.00);
    const [comparePrice, setComparePrice] = useState(65.00);
    const [discount, setDiscount] = useState(0);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

    const [categories, setCategories] = useState([
        "Men's Apparel",
        "Women's Apparel",
        "Accessories"
    ]);

    const [images, setImages] = useState([]);
    const fileInputRef = React.useRef(null);

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);

        const imagePreviews = files.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));

        setImages(prev => [...prev, ...imagePreviews]);
    };

    const inputClass =
        "bg-[#0b1220] border border-[#334155] rounded-md text-[11px] px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all";

    const [variants, setVariants] = useState([
        {
            color: "#000000",
            colorName: "Midnight Black",
            size: "M",
            sku: "COTTON-BLK-M",
            stock: 45,
            isEditing: false
        },
        {
            color: "#1e40af",
            colorName: "Ocean Blue",
            size: "L",
            sku: "COTTON-BLU-L",
            stock: 12,
            isEditing: false
        }
    ]);

    const handleAddVariant = () => {
        const newVariant = {
            color: "#000000",
            colorName: "New Color",
            size: "S",
            sku: `SKU-${Date.now()}`,
            stock: 0,
            isEditing: true
        };

        setVariants(prev => [...prev, newVariant]);
    };


    useEffect(() => {
        if (comparePrice > price) {
            const percentage = ((comparePrice - price) / comparePrice) * 100;
            setDiscount(percentage.toFixed(1));
        } else {
            setDiscount(0);
        }
    }, [price, comparePrice]);

    return (
        <div className="bg-[#0f172a] text-[#f8fafc] min-h-screen font-sans selection:bg-blue-500/30">
            <main className="max-w-7xl mx-auto px-6 py-8 pb-32">

                {/* PAGE TITLE & ACTIONS */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <nav className="flex items-center gap-2 text-sm text-[#94a3b8] mb-2">
                            <a className="hover:text-blue-500" href="#">Products</a>
                            <i className="fa-solid fa-chevron-right text-[10px]"></i>
                            <span className="text-[#f8fafc] font-medium">Add New Product</span>
                        </nav>
                        <h2 className="text-3xl font-extrabold tracking-tight">Create New Product</h2>
                        <p className="text-[#94a3b8] mt-1">Fill in the details to list a new item in your inventory.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 text-sm font-semibold text-[#94a3b8] border border-[#334155] rounded-xl hover:bg-[#1e293b] transition-colors">
                            Discard Changes
                        </button>
                        <button className="px-4 py-2 text-sm font-semibold text-blue-500 bg-blue-500/10 border border-blue-500/20 rounded-xl hover:bg-blue-500/20 transition-colors">
                            Preview Listing
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* LEFT COLUMN */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* PRODUCT INFO */}
                        <section className="bg-[#1e293b] rounded-xl border border-[#334155] shadow-xl overflow-hidden">
                            <div className="px-6 py-4 border-b border-[#334155] flex justify-between items-center bg-[#1e293b]/50">
                                <h3 className="font-bold text-lg">Product Information</h3>
                                <span className="px-2 py-1 bg-blue-500/20 text-blue-500 text-[10px] font-bold uppercase tracking-wider rounded border border-blue-500/30">Step 1</span>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2 flex flex-col md:flex-row md:items-end gap-6">
                                        <div className="flex-1">
                                            <label className="block text-sm font-semibold text-[#94a3b8] mb-2">Product Title</label>
                                            <input className="w-full rounded-lg border-[#334155] bg-[#0f172a] focus:border-blue-500 focus:ring-blue-500 text-lg font-medium p-3" placeholder="e.g. Classic Organic Cotton Crewneck" type="text" defaultValue="Classic Organic Cotton Crewneck" />
                                        </div>
                                        <div className="flex items-center gap-3 pb-3">
                                            <div className="text-right">
                                                <label className="text-sm font-semibold text-[#94a3b8]">Customizable</label>
                                                <p className="text-[10px] text-[#94a3b8]/60">Allow personalization</p>
                                            </div>
                                            <ToggleButton />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-[#94a3b8] mb-2">Slug</label>
                                        <div className="flex rounded-lg shadow-sm">
                                            <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-[#334155] bg-[#0f172a] text-[#94a3b8] text-xs">store.com/p/</span>
                                            <input className="flex-1 block w-full rounded-none rounded-r-lg border-[#334155] bg-[#0f172a] focus:border-blue-500 focus:ring-blue-500 text-sm p-2" placeholder="classic-organic-cotton" type="text" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-[#94a3b8] mb-2">Category</label>
                                        <div className="flex items-center gap-2">
                                            <select
                                                className="flex-1 rounded-lg border-[#334155] bg-[#0f172a] focus:border-blue-500 focus:ring-blue-500 text-sm p-2"
                                            >
                                                {categories.map((cat, index) => (
                                                    <option key={index}>{cat}</option>
                                                ))}
                                            </select>

                                            <button
                                                onClick={() => setIsCategoryModalOpen(true)}
                                                className="p-2 bg-[#0f172a] border border-[#334155] rounded-lg text-blue-500 hover:bg-[#1e293b]"
                                            >
                                                <i className="fa-solid fa-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-[#94a3b8] mb-2">Description</label>
                                    <div className="border border-[#334155] rounded-lg overflow-hidden bg-[#0f172a]">
                                        <div className="bg-[#1e293b]/50 border-b border-[#334155] p-2 flex gap-2">
                                            <button className="p-1.5 text-[#94a3b8] hover:bg-[#334155] rounded"><i className="fa-solid fa-bold"></i></button>
                                            <button className="p-1.5 text-[#94a3b8] hover:bg-[#334155] rounded"><i className="fa-solid fa-italic"></i></button>
                                            <button className="p-1.5 text-[#94a3b8] hover:bg-[#334155] rounded"><i className="fa-solid fa-link"></i></button>
                                        </div>
                                        <textarea className="w-full border-none bg-[#0f172a] focus:ring-0 text-sm p-4 outline-none" placeholder="Describe the material..." rows="5"></textarea>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* PRICING */}
                        <section className="bg-[#1e293b] rounded-xl border border-[#334155] shadow-xl p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-lg">Pricing</h3>
                                <i className="fa-solid fa-hand-holding-dollar text-[#94a3b8]"></i>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                                <div>
                                    <label className="block text-sm font-semibold text-[#94a3b8] mb-2">Price ($)</label>
                                    <input className="w-full rounded-lg border-[#334155] bg-[#0f172a] p-2 focus:ring-blue-500" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-[#94a3b8] mb-2">Compare At ($)</label>
                                    <input className="w-full rounded-lg border-[#334155] bg-[#0f172a] p-2 focus:ring-blue-500" type="number" value={comparePrice} onChange={(e) => setComparePrice(Number(e.target.value))} />
                                </div>
                                <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-3 flex items-center justify-between">
                                    <div>
                                        <span className="block text-[#94a3b8] text-[10px] uppercase font-bold">Discount</span>
                                        <span className="text-blue-500 font-bold text-lg">{discount}% OFF</span>
                                    </div>
                                    <i className="fa-solid fa-arrow-trend-down text-blue-500 text-xl"></i>
                                </div>
                            </div>
                        </section>
                        {/* VARIANTS & INVENTORY TABLE */}
                        <section className="bg-[#1e293b] rounded-xl border border-[#334155] overflow-hidden shadow-xl">
                            <div className="px-6 py-4 border-b border-[#334155] flex justify-between items-center bg-[#1e293b]/50">
                                <h3 className="font-bold text-lg">Variants & Inventory</h3>
                                <button
                                    onClick={handleAddVariant}
                                    className="text-blue-500 text-sm font-bold flex items-center gap-1 hover:text-blue-400"
                                >
                                    <i className="fa-solid fa-circle-plus"></i> Add Variant
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-[#0f172a]/50 text-[11px] font-bold text-[#94a3b8] uppercase tracking-wider">
                                        <tr>
                                            <th className="px-6 py-3">Color Pick & Name</th>
                                            <th className="px-6 py-3">Size</th>
                                            <th className="px-6 py-3">SKU</th>
                                            <th className="px-6 py-3">Stock</th>
                                            <th className="px-6 py-3 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#334155]">
                                        {variants.map((variant, index) => (
                                            <tr key={index} className="hover:bg-[#0f172a]/40 transition-colors">

                                                {/* COLOR */}
                                                <td className="px-6 py-3">
                                                    <div className="flex items-center gap-3">
                                                        {variant.isEditing ? (
                                                            <div className="flex items-center gap-2">
                                                                <input
                                                                    type="color"
                                                                    value={variant.color}
                                                                    onChange={(e) => {
                                                                        const updated = [...variants];
                                                                        updated[index].color = e.target.value;
                                                                        setVariants(updated);
                                                                    }}
                                                                    className="w-7 h-7 rounded-md border border-[#334155] cursor-pointer bg-transparent"
                                                                />
                                                                <input
                                                                    type="text"
                                                                    value={variant.colorName}
                                                                    onChange={(e) => {
                                                                        const updated = [...variants];
                                                                        updated[index].colorName = e.target.value;
                                                                        setVariants(updated);
                                                                    }}
                                                                    className={`${inputClass} w-32`}
                                                                />
                                                            </div>
                                                        ) : (
                                                            <>
                                                                <div
                                                                    className="w-5 h-5 rounded border border-[#334155]"
                                                                    style={{ backgroundColor: variant.color }}
                                                                />
                                                                <span className="text-xs">{variant.colorName}</span>
                                                            </>
                                                        )}
                                                    </div>
                                                </td>

                                                {/* SIZE */}
                                                <td className="px-6 py-3 text-xs">
                                                    {variant.isEditing ? (
                                                        <select
                                                            value={variant.size}
                                                            onChange={(e) => {
                                                                const updated = [...variants];
                                                                updated[index].size = e.target.value;
                                                                setVariants(updated);
                                                            }}
                                                            className={`${inputClass} w-16`}
                                                        >
                                                            <option>S</option>
                                                            <option>M</option>
                                                            <option>L</option>
                                                        </select>
                                                    ) : (
                                                        variant.size
                                                    )}
                                                </td>

                                                {/* SKU */}
                                                <td className="px-6 py-3 font-mono text-[10px] text-[#94a3b8]">
                                                    {variant.sku}
                                                </td>

                                                {/* STOCK */}
                                                <td className="px-6 py-3">
                                                    {variant.isEditing ? (
                                                        <input
                                                            type="number"
                                                            value={variant.stock}
                                                            onChange={(e) => {
                                                                const updated = [...variants];
                                                                updated[index].stock = e.target.value;
                                                                setVariants(updated);
                                                            }}
                                                            className="w-14 bg-[#0f172a] border-[#334155] rounded text-[11px] p-1 text-center"
                                                        />
                                                    ) : (
                                                        <span className="text-xs">{variant.stock}</span>
                                                    )}
                                                </td>

                                                {/* ACTIONS */}
                                                <td className="px-6 py-3 text-right text-[#94a3b8]">
                                                    <button
                                                        onClick={() => {
                                                            const updated = [...variants];
                                                            updated[index].isEditing = !updated[index].isEditing;
                                                            setVariants(updated);
                                                        }}
                                                        className="hover:text-blue-500 mr-3 text-sm"
                                                    >
                                                        {variant.isEditing ? "Save" : <i className="fa-regular fa-pen-to-square"></i>}
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            setVariants(variants.filter((_, i) => i !== index))
                                                        }
                                                        className="hover:text-red-400 text-sm"
                                                    >
                                                        <i className="fa-regular fa-trash-can"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="space-y-8">

                        {/* IMAGES */}
                        <section className="bg-[#1e293b] rounded-xl border border-[#334155] shadow-xl p-6">
                            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                <i className="fa-regular fa-image text-[#94a3b8]"></i> Product Images
                            </h3>
                            <div
                                onClick={() => fileInputRef.current.click()}
                                className="border-2 border-dashed border-[#334155] rounded-xl p-8 text-center bg-[#0f172a]/50 hover:border-blue-500 transition-colors cursor-pointer group"
                            >
                                <i className="fa-solid fa-cloud-arrow-up text-3xl text-[#94a3b8] group-hover:text-blue-500 mb-3"></i>
                                <p className="text-sm font-semibold">Drop files here or click</p>
                                <p className="text-[10px] text-[#94a3b8] italic">Support JPG, PNG up to 10MB</p>

                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    ref={fileInputRef}
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                            </div>
                            <div className="grid grid-cols-3 gap-3 mt-6">
                                {images.map((img, index) => (
                                    <div
                                        key={index}
                                        className={`relative aspect-square rounded-lg overflow-hidden border ${index === 0
                                            ? "border-2 border-blue-500"
                                            : "border-[#334155]"
                                            }`}
                                    >
                                        <img
                                            src={img.preview}
                                            alt={`Product ${index}`}
                                            className="object-cover w-full h-full"
                                        />

                                        {index === 0 && (
                                            <span className="absolute top-1 left-1 bg-blue-600 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">
                                                Primary
                                            </span>
                                        )}

                                        <button
                                            onClick={() =>
                                                setImages(images.filter((_, i) => i !== index))
                                            }
                                            className="absolute top-1 right-1 bg-black/60 text-white text-xs px-1 rounded"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* STATUS & TAGS */}
                        <section className="bg-[#1e293b] rounded-xl border border-[#334155] p-6 space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-semibold">Product Status</p>
                                    <p className="text-[10px] text-[#94a3b8]">Enable or disable from store</p>
                                </div>
                                <ToggleButton defaultChecked={true} />
                            </div>
                            <hr className="border-[#334155]" />
                            <div className="space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#94a3b8]">Featured Product</span>
                                    <ToggleButton />
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#94a3b8]">New Arrival</span>
                                    <ToggleButton defaultChecked={true} />
                                </div>
                            </div>
                            <div className="pt-4">
                                <label className="block text-xs font-bold text-[#94a3b8] uppercase mb-3">Product Tags</label>
                                <div className="flex flex-wrap gap-2">
                                    {['Summer', 'Cotton'].map(tag => (
                                        <span key={tag} className="px-2.5 py-1 bg-[#0f172a] border border-[#334155] rounded-full text-[10px] font-bold flex items-center gap-2">
                                            {tag} <i className="fa-solid fa-xmark text-red-400 cursor-pointer"></i>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>

            {/* FOOTER BAR */}
            <div className="fixed bottom-0 w-full bg-[#1e293b]/90 border-t border-[#334155] px-8 py-4 backdrop-blur-lg shadow-2xl z-50">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                        <p className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest">Autosaved just now</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="px-6 py-2 text-sm font-bold text-[#94a3b8] hover:text-white transition-all">Save Draft</button>
                        <button className="px-8 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-500/30 hover:bg-blue-500 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2">
                            <i className="fa-solid fa-upload"></i> Publish Product
                        </button>
                    </div>
                </div>
            </div>
            <AddCategoryModal
                isOpen={isCategoryModalOpen}
                onClose={() => setIsCategoryModalOpen(false)}
                onAdd={(newCategory) =>
                    setCategories((prev) => [...prev, newCategory])
                }
            />
        </div>

    );
};

// Reusable Toggle Component
const ToggleButton = ({ defaultChecked = false }) => (
    <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" defaultChecked={defaultChecked} />
        <div className="w-11 h-6 bg-[#334155] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
    </label>
);

export default AddProduct;