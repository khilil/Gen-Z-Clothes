import React, { useState } from 'react';
import {
    BarChart3,
    Box,
    ChevronRight,
    LayoutDashboard,
    Settings,
    ShoppingBag,
    Users,
    Package,
    Bell,
    Search,
    Plus
} from 'lucide-react';
// import './AddProductLayout.css'
import ProductInfo from './components/ProductInfo';
import Pricing from './components/Pricing';
import Variants from './components/Variants';
import Images from './components/Images';
import VariantImages from './components/VariantImages';
import { InventorySettings, ProductFlags, SEOSettings } from './components/Settings';

// Helper to generate SKU
const generateSKU = (title, color, size) => {
    if (!title) return '';
    const base = title
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
    const colorSuffix = color ? `-${color.toLowerCase()}` : '';
    const sizeSuffix = size ? `-${size.toLowerCase()}` : '';
    return `${base}${colorSuffix}${sizeSuffix}`;
};

function AddProductLayout() {
    const [activeItem, setActiveItem] = useState('Products');
    const [productData, setProductData] = useState({
        title: '',
        slug: '',
        brand: '',
        category: '',
        gender: 'unisex',
        material: '',
        shortDescription: '',
        fullDescription: '',
        price: '',
        compareAtPrice: '',
        trackInventory: true,
        globalThreshold: 5,
        isActive: true,
        isFeatured: false,
        isNewArrival: true,
        isBestSeller: false,
        metaTitle: '',
        metaDescription: '',
        metaKeywords: '',
    });

    const [variants, setVariants] = useState([]);
    const [images, setImages] = useState([]);
    const [seoExpanded, setSeoExpanded] = useState(false);

    // Handlers for Variants
    const handleAddVariant = () => {
        const newVariant = {
            id: Date.now().toString(),
            size: '',
            color: 'White',
            colorCode: '#ffffff',
            sku: generateSKU(productData.title, 'White', ''),
            isSkuManual: false,
            images: [], // Each variant now has its own images
            stock: 0,
            reservedStock: 0,
            lowStockThreshold: 5,
            allowBackorder: false,
            isExpanded: true
        };
        setVariants([...variants, newVariant]);
    };

    const handleDeleteVariant = (id) => {
        setVariants(variants.filter(v => v.id !== id));
    };

    const handleVariantChange = (id, field, value) => {
        setVariants(variants.map(v => {
            if (v.id === id) {
                const updated = { ...v, [field]: value };

                // Auto-generate SKU if color or size changes AND not manually edited
                if ((field === 'color' || field === 'size') && !v.isSkuManual) {
                    updated.sku = generateSKU(productData.title, updated.color, updated.size);
                }

                // If SKU itself is manually edited, mark it as manual
                if (field === 'sku') {
                    updated.isSkuManual = true;
                }

                // Simple color code mapping for demonstration
                if (field === 'color') {
                    const colors = {
                        'Black': '#000000',
                        'White': '#ffffff',
                        'Navy': '#000080',
                        'Red': '#ff0000',
                        'Forest': '#228b22'
                    };
                    updated.colorCode = colors[value] || '#cccccc';
                }
                return updated;
            }
            return v;
        }));
    };

    const handleResetSku = (id) => {
        setVariants(variants.map(v => {
            if (v.id === id) {
                return {
                    ...v,
                    sku: generateSKU(productData.title, v.color, v.size),
                    isSkuManual: false
                };
            }
            return v;
        }));
    };

    const toggleVariantExpand = (id) => {
        setVariants(variants.map(v =>
            v.id === id ? { ...v, isExpanded: !v.isExpanded } : v
        ));
    };

    // Calculate total stock
    const totalStock = variants.reduce((sum, v) => sum + v.stock, 0);

    // Handlers for Images
    const handleAddImage = () => {
        const newImg = {
            id: Date.now().toString(),
            isMain: images.length === 0
        };
        setImages([...images, newImg]);
    };

    const handleDeleteImage = (id) => {
        setImages(images.filter(img => img.id !== id));
    };

    const handleSetMainImage = (id) => {
        setImages(images.map(img => ({
            ...img,
            isMain: img.id === id
        })));
    };

    // Handlers for Variant-Specific Images
    const handleAddVariantImage = (variantId) => {
        setVariants(variants.map(v => {
            if (v.id === variantId) {
                const newImg = {
                    id: Date.now().toString(),
                    url: 'https://via.placeholder.com/150', // Mock URL
                    isPrimary: v.images.length === 0
                };
                return { ...v, images: [...v.images, newImg] };
            }
            return v;
        }));
    };

    const handleDeleteVariantImage = (variantId, imageId) => {
        setVariants(variants.map(v => {
            if (v.id === variantId) {
                return { ...v, images: v.images.filter(img => img.id !== imageId) };
            }
            return v;
        }));
    };

    const handleSetPrimaryVariantImage = (variantId, imageId) => {
        setVariants(variants.map(v => {
            if (v.id === variantId) {
                return {
                    ...v,
                    images: v.images.map(img => ({
                        ...img,
                        isPrimary: img.id === imageId
                    }))
                };
            }
            return v;
        }));
    };

    const handleDataChange = (field, value) => {
        setProductData(prev => {
            const newData = { ...prev, [field]: value };

            // Auto-generate slug if title changes
            if (field === 'title') {
                newData.slug = value
                    .toLowerCase()
                    .replace(/[^\w ]+/g, '')
                    .replace(/ +/g, '-');

                // Also update variant SKUs if title changes AND not manually edited
                setVariants(prevVariants => prevVariants.map(v => ({
                    ...v,
                    sku: v.isSkuManual ? v.sku : generateSKU(value, v.color, v.size)
                })));
            }

            return newData;
        });
    };

    const menuItems = [
        { icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
        { icon: <ShoppingBag size={20} />, label: 'Products' },
        { icon: <Box size={20} />, label: 'Orders' },
        { icon: <Package size={20} />, label: 'Inventory' },
        { icon: <Users size={20} />, label: 'Customers' },
        { icon: <BarChart3 size={20} />, label: 'Analytics' },
        { icon: <Settings size={20} />, label: 'Settings' },
    ];

    return (
        <div className="flex min-h-screen bg-slate-50">


            {/* Main Content Area */}
            <main className="flex-1">
                {/* Header */}
                <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-md px-8 py-5">
                    <div className="mx-auto flex max-w-7xl items-center justify-between">
                        <div>
                            <nav className="mb-1 flex items-center gap-2 text-xs font-medium text-slate-500">
                                <span>Products</span>
                                <ChevronRight size={12} />
                                <span className="text-slate-900">Add Product</span>
                            </nav>
                            <h1 className="text-2xl font-bold text-slate-900">Add New Product</h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="relative hidden md:block">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input
                                    type="text"
                                    placeholder="Search anything..."
                                    className="h-10 w-64 rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                                />
                            </div>
                            <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-900">
                                <Bell size={20} />
                            </button>
                            <div className="h-10 w-10 rounded-full bg-slate-200 border-2 border-white ring-1 ring-slate-200"></div>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div className="p-8 pb-32">
                    <div className="mx-auto max-w-7xl">
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                            {/* Main Column */}
                            <div className="lg:col-span-2 space-y-8">
                                <ProductInfo data={productData} onChange={handleDataChange} />

                                <Variants
                                    variants={variants}
                                    onAdd={handleAddVariant}
                                    onDelete={handleDeleteVariant}
                                    onChange={handleVariantChange}
                                    onResetSku={handleResetSku}
                                    onToggleExpand={toggleVariantExpand}
                                />

                                <VariantImages
                                    variants={variants}
                                    onAddImage={handleAddVariantImage}
                                    onDeleteImage={handleDeleteVariantImage}
                                    onSetPrimary={handleSetPrimaryVariantImage}
                                />

                                <Images
                                    images={images}
                                    onAdd={handleAddImage}
                                    onDelete={handleDeleteImage}
                                    onSetMain={handleSetMainImage}
                                />
                            </div>

                            {/* Sidebar Column */}
                            <div className="space-y-8">
                                <Pricing data={productData} onChange={handleDataChange} />

                                <InventorySettings
                                    data={productData}
                                    onChange={handleDataChange}
                                    totalStock={totalStock}
                                />

                                <ProductFlags
                                    data={productData}
                                    onChange={handleDataChange}
                                />

                                <SEOSettings
                                    data={productData}
                                    onChange={handleDataChange}
                                    isExpanded={seoExpanded}
                                    onToggle={() => setSeoExpanded(!seoExpanded)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </main>
                    {/* Action Bar (Sticky) */}
                    <div className="fixed bottom-0 right-0 z-50 w-full border-t border-slate-200 bg-white p-4 lg:left-64 lg:w-[calc(100%-16rem)] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                        <div className="mx-auto flex max-w-7xl items-center justify-between">
                            <button className="px-6 py-2.5 text-sm font-semibold text-slate-600 transition-all hover:text-slate-900">
                                Cancel
                            </button>
                            <div className="flex gap-4">
                                <button className="rounded-xl border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-slate-900 transition-all hover:bg-slate-50">
                                    Save as Draft
                                </button>
                                <button className="rounded-xl bg-indigo-600 px-8 py-2.5 text-sm font-semibold text-white transition-all shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300">
                                    Publish Product
                                </button>
                            </div>
                        </div>
                    </div>
        </div>
    );
}

export default AddProductLayout;
