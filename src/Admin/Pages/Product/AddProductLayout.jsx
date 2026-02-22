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
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Loader2, X } from 'lucide-react';

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
    const navigate = useNavigate();
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
    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState(null);

    const showNotification = (type, message) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 5000);
    };


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
    const handleAddImage = (files) => {
        const newImages = Array.from(files).map(file => ({
            id: Date.now().toString() + Math.random(),
            file,
            preview: URL.createObjectURL(file),
            isMain: images.length === 0
        }));

        setImages(prev => [...prev, ...newImages]);
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
    const handleAddVariantImage = (variantId, files) => {
        const newImages = Array.from(files).map(file => ({
            id: Date.now().toString() + Math.random(),
            file,
            url: URL.createObjectURL(file), // Generate local preview URL
            isPrimary: false
        }));

        setVariants(variants.map(v => {
            if (v.id === variantId) {
                const combinedImages = [...v.images, ...newImages];
                // If there were no images before, set the first one as primary
                if (v.images.length === 0 && combinedImages.length > 0) {
                    combinedImages[0].isPrimary = true;
                }
                return { ...v, images: combinedImages };
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

    const handlePublish = async () => {
        setIsLoading(true);
        try {
            const formData = new FormData();

            // Append basic product data
            Object.keys(productData).forEach(key => {
                formData.append(key, productData[key]);
            });

            // Append general images
            images.forEach((img) => {
                if (img.file) {
                    formData.append('images', img.file);
                }
            });

            // Append variants as a JSON string
            // We'll filter out the Blob objects/previews before stringifying
            const variantsMetadata = variants.map(v => ({
                id: v.id,
                size: v.size,
                color: v.color,
                colorCode: v.colorCode,
                sku: v.sku,
                stock: v.stock,
                reservedStock: v.reservedStock,
                lowStockThreshold: v.lowStockThreshold,
                allowBackorder: v.allowBackorder
            }));
            formData.append('variants', JSON.stringify(variantsMetadata));

            // Append variant-specific images
            variants.forEach(v => {
                v.images.forEach(img => {
                    if (img.file) {
                        formData.append('variantImages', img.file);
                    }
                });
            });

            const response = await axios.post('http://localhost:5000/api/v1/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            showNotification('success', 'Product published successfully!');
            console.log("Response:", response.data);
            // Optionally navigate back after success
            // setTimeout(() => navigate('/admin/products'), 2000);

        } catch (error) {
            console.error("Publish Error:", error);
            const errorMsg = error.response?.data?.message || "Failed to publish product. Please try again.";
            showNotification('error', errorMsg);
        } finally {
            setIsLoading(false);
        }
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
        <div className="flex min-h-screen bg-slate-950">


            {/* Main Content Area */}
            <main className="flex-1">
                {/* Header */}
                <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md px-8 py-5">
                    <div className="mx-auto flex max-w-7xl items-center justify-between">
                        <div>
                            <nav className="mb-1 flex items-center gap-2 text-xs font-medium text-slate-500">
                                <span onClick={() => navigate(-1)} className="hover:text-slate-300 cursor-pointer transition-colors">Products</span>
                                <ChevronRight size={12} />
                                <span className="text-slate-300">Add Product</span>
                            </nav>
                            <h1 className="text-2xl font-bold text-white">Add New Product</h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="relative hidden md:block">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                                <input
                                    type="text"
                                    placeholder="Search anything..."
                                    className="h-10 w-64 rounded-xl border border-slate-800 bg-slate-950 pl-10 pr-4 text-sm text-slate-200 outline-none transition-all focus:border-indigo-500 focus:bg-slate-900 focus:ring-4 focus:ring-indigo-500/10"
                                />
                            </div>
                            <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-400 transition-all hover:bg-slate-800 hover:text-white">
                                <Bell size={20} />
                            </button>
                            <div className="h-10 w-10 rounded-full bg-slate-800 border-2 border-slate-700 ring-1 ring-slate-800"></div>
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
            <div className="fixed bottom-0 right-0 z-50 w-full border-t border-slate-800 bg-slate-900 p-4 lg:left-64 lg:w-[calc(100%-16rem)] shadow-[0_-8px_30px_rgb(0,0,0,0.12)]">
                <div className="mx-auto flex max-w-7xl items-center justify-between">
                    <button onClick={() => navigate(-1)} className="px-6 py-2.5 text-sm font-semibold text-slate-400 transition-all hover:text-white">
                        Cancel
                    </button>
                    <div className="flex gap-4">
                        <button className="rounded-xl border border-slate-700 bg-slate-800 px-6 py-2.5 text-sm font-semibold text-slate-300 transition-all hover:bg-slate-700 hover:text-white">
                            Save as Draft
                        </button>
                        <button
                            disabled={isLoading}
                            className={`rounded-xl bg-indigo-600 px-8 py-2.5 text-sm font-semibold text-white transition-all shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 hover:shadow-indigo-600/40 flex items-center gap-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            onClick={handlePublish}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    Publishing...
                                </>
                            ) : (
                                'Publish Product'
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Premium Notification ("Pop Pop") */}
            <AnimatePresence>
                {notification && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="fixed bottom-24 right-8 z-[100] flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/95 p-4 pr-6 shadow-2xl backdrop-blur-xl ring-1 ring-white/10"
                    >
                        <div className={`flex h-12 w-12 items-center justify-center rounded-full ${notification.type === 'success' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                            {notification.type === 'success' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-white">
                                {notification.type === 'success' ? 'Success!' : 'Error'}
                            </span>
                            <span className="text-xs text-slate-400">{notification.message}</span>
                        </div>
                        <button
                            onClick={() => setNotification(null)}
                            className="ml-4 text-slate-500 transition-colors hover:text-white"
                        >
                            <X size={16} />
                        </button>
                        <motion.div
                            initial={{ width: '100%' }}
                            animate={{ width: '0%' }}
                            transition={{ duration: 5, ease: 'linear' }}
                            className={`absolute bottom-0 left-0 h-1 rounded-full ${notification.type === 'success' ? 'bg-emerald-500' : 'bg-rose-500'}`}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default AddProductLayout;