import React, { useState, useEffect } from 'react';
import {
    ChevronRight,
    Search,
    Bell,
    CheckCircle2,
    AlertCircle,
    Loader2,
    X,
    Trash2,
    Plus
} from 'lucide-react';
import ProductInfo from './components/ProductInfo';
import Pricing from './components/Pricing';
import Variants from './components/Variants';
import Images from './components/Images';
import VariantImages from './components/VariantImages';
import { InventorySettings, ProductFlags, SEOSettings } from './components/Settings';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getProductBySlug, updateProduct } from '../../../services/productService';

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

function UpdateProductLayout() {
    const { slug } = useParams();
    const navigate = useNavigate();

    const [productId, setProductId] = useState(null);

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
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const [notification, setNotification] = useState(null);

    const showNotification = (type, message) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 5000);
    };

    useEffect(() => {
        const fetchProduct = async () => {
            setIsLoading(true);
            try {
                const data = await getProductBySlug(slug);
                const product = data.data || data.product || data;

                setProductId(product._id || product.id);

                setProductData({
                    title: product.title || '',
                    slug: product.slug || '',
                    brand: product.brand || '',
                    category: product.category || '',
                    gender: product.gender || 'unisex',
                    material: product.material || '',
                    shortDescription: product.shortDescription || '',
                    fullDescription: product.fullDescription || '',
                    price: product.price || '',
                    compareAtPrice: product.compareAtPrice || '',
                    trackInventory: product.trackInventory ?? true,
                    globalThreshold: product.globalThreshold || 5,
                    isActive: product.isActive ?? true,
                    isFeatured: product.isFeatured ?? false,
                    isNewArrival: product.isNewArrival ?? true,
                    isBestSeller: product.isBestSeller ?? false,
                    metaTitle: product.metaTitle || '',
                    metaDescription: product.metaDescription || '',
                    metaKeywords: product.metaKeywords || '',
                });

                // Map variants
                if (product.variants && Array.isArray(product.variants)) {
                    setVariants(product.variants.map(v => ({
                        ...v,
                        id: v._id || v.id || Date.now().toString() + Math.random(),
                        isExpanded: false,
                        images: (v.images || []).map(img => ({
                            ...img,
                            id: img._id || img.id || Date.now().toString() + Math.random(),
                            existing: true // CRITICAL: Flag existing variant images
                        }))
                    })));
                }

                // Map images
                if (product.images && Array.isArray(product.images)) {
                    setImages(product.images.map(img => ({
                        id: img._id || img.id || Date.now().toString() + Math.random(),
                        preview: typeof img === 'string' ? img : img.url,
                        isMain: img.isMain || false,
                        existing: true // Flag to identify existing images
                    })));
                }

            } catch (err) {
                console.error("Fetch Product Error:", err);
                showNotification('error', 'Failed to load product data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProduct();
    }, [slug]);

    // Handlers for Variants (Reused from AddProductLayout)
    const handleAddVariant = () => {
        const newVariant = {
            id: Date.now().toString(),
            size: '',
            color: 'White',
            colorCode: '#ffffff',
            sku: generateSKU(productData.title, 'White', ''),
            isSkuManual: false,
            images: [],
            stock: 0,
            reservedStock: 0,
            lowStockThreshold: 5,
            allowBackorder: false,
            isExpanded: true
        };
        setVariants([...variants, newVariant]);
    };

    const handleDeleteVariant = (variantId) => {
        setVariants(variants.filter(v => (v.id || v._id) !== variantId));
    };

    const handleVariantChange = (variantId, field, value) => {
        setVariants(variants.map(v => {
            if ((v.id || v._id) === variantId) {
                const updated = { ...v, [field]: value };
                if ((field === 'color' || field === 'size') && !v.isSkuManual) {
                    updated.sku = generateSKU(productData.title, updated.color, updated.size);
                }
                if (field === 'sku') {
                    updated.isSkuManual = true;
                }
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

    const handleResetSku = (variantId) => {
        setVariants(variants.map(v => {
            if ((v.id || v._id) === variantId) {
                return {
                    ...v,
                    sku: generateSKU(productData.title, v.color, v.size),
                    isSkuManual: false
                };
            }
            return v;
        }));
    };

    const toggleVariantExpand = (variantId) => {
        setVariants(variants.map(v =>
            (v.id || v._id) === variantId ? { ...v, isExpanded: !v.isExpanded } : v
        ));
    };

    const totalStock = variants.reduce((sum, v) => sum + (Number(v.stock) || 0), 0);

    // Handlers for Images
    const handleAddImage = (files) => {
        const newImages = Array.from(files).map(file => ({
            id: Date.now().toString() + Math.random(),
            file,
            preview: URL.createObjectURL(file),
            isMain: images.length === 0,
            existing: false
        }));
        setImages(prev => [...prev, ...newImages]);
    };

    const handleDeleteImage = (imageId) => {
        setImages(images.filter(img => (img.id || img._id) !== imageId));
    };

    const handleSetMainImage = (imageId) => {
        setImages(images.map(img => ({
            ...img,
            isMain: (img.id || img._id) === imageId
        })));
    };

    // Handlers for Variant Images
    const handleAddVariantImage = (variantId, files) => {
        const newImages = Array.from(files).map(file => ({
            id: Date.now().toString() + Math.random(),
            file,
            url: URL.createObjectURL(file),
            isPrimary: false,
            existing: false
        }));

        setVariants(variants.map(v => {
            if ((v.id || v._id) === variantId) {
                const combinedImages = [...(v.images || []), ...newImages];
                if ((v.images?.length || 0) === 0 && combinedImages.length > 0) {
                    combinedImages[0].isPrimary = true;
                }
                return { ...v, images: combinedImages };
            }
            return v;
        }));
    };

    const handleDeleteVariantImage = (variantId, imageId) => {
        setVariants(variants.map(v => {
            if ((v.id || v._id) === variantId) {
                return { ...v, images: v.images.filter(img => (img.id || img._id) !== imageId) };
            }
            return v;
        }));
    };

    const handleSetPrimaryVariantImage = (variantId, imageId) => {
        setVariants(variants.map(v => {
            if ((v.id || v._id) === variantId) {
                return {
                    ...v,
                    images: v.images.map(img => ({
                        ...img,
                        isPrimary: (img.id || img._id) === imageId
                    }))
                };
            }
            return v;
        }));
    };

    const handleDataChange = (field, value) => {
        setProductData(prev => {
            const newData = { ...prev, [field]: value };
            if (field === 'title') {
                newData.slug = value.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
                setVariants(prevVariants => prevVariants.map(v => ({
                    ...v,
                    sku: v.isSkuManual ? v.sku : generateSKU(value, v.color, v.size)
                })));
            }
            return newData;
        });
    };

    const handleUpdate = async () => {
        setIsUpdating(true);
        try {
            const formData = new FormData();

            // Append basic data
            Object.keys(productData).forEach(key => {
                formData.append(key, productData[key]);
            });

            // Handle general images (existing vs new)
            const generalImagesData = [];
            images.forEach(img => {
                if (img.existing) {
                    generalImagesData.push({ url: img.preview, isMain: img.isMain });
                } else if (img.file) {
                    formData.append('images', img.file);
                }
            });
            formData.append('existingImages', JSON.stringify(generalImagesData));

            // Map variants for partial update
            const variantsMetadata = variants.map(v => {
                const newImages = v.images?.filter(img => !img.existing && img.file) || [];
                return {
                    id: v._id || v.id,
                    size: v.size,
                    color: v.color,
                    colorCode: v.colorCode,
                    sku: v.sku,
                    stock: v.stock,
                    reservedStock: v.reservedStock,
                    lowStockThreshold: v.lowStockThreshold,
                    allowBackorder: v.allowBackorder,
                    existingImages: v.images?.filter(img => img.existing).map(img => ({ url: img.url, isPrimary: img.isPrimary })) || [],
                    newImageCount: newImages.length
                };
            });
            formData.append('variants', JSON.stringify(variantsMetadata));

            // Append new variant images
            variants.forEach(v => {
                v.images?.forEach(img => {
                    if (!img.existing && img.file) {
                        formData.append('variantImages', img.file);
                    }
                });
            });

            await updateProduct(productId, formData);
            showNotification('success', 'Product updated successfully!');
            setTimeout(() => navigate('/admin/products'), 1500);

        } catch (error) {
            console.error("Update Error:", error);
            showNotification('error', error.response?.data?.message || "Failed to update product");
        } finally {
            setIsUpdating(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-slate-950">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 size={48} className="animate-spin text-indigo-500" />
                    <p className="text-sm font-bold text-slate-400">Loading product details...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-slate-950">
            <main className="flex-1">
                <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md px-8 py-5">
                    <div className="mx-auto flex max-w-7xl items-center justify-between">
                        <div>
                            <nav className="mb-1 flex items-center gap-2 text-xs font-medium text-slate-500">
                                <span onClick={() => navigate('/admin/products')} className="hover:text-slate-300 cursor-pointer transition-colors">Products</span>
                                <ChevronRight size={12} />
                                <span className="text-slate-300">Edit Product</span>
                            </nav>
                            <h1 className="text-2xl font-bold text-white">Edit: {productData.title}</h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-400 transition-all hover:bg-slate-800 hover:text-white">
                                <Bell size={20} />
                            </button>
                            <div className="h-10 w-10 rounded-full bg-slate-800 border-2 border-slate-700 ring-1 ring-slate-800"></div>
                        </div>
                    </div>
                </header>

                <div className="p-8 pb-32">
                    <div className="mx-auto max-w-7xl">
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
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

                            <div className="space-y-8">
                                <Pricing data={productData} onChange={handleDataChange} />
                                <InventorySettings
                                    data={productData}
                                    onChange={handleDataChange}
                                    totalStock={totalStock}
                                />
                                <ProductFlags data={productData} onChange={handleDataChange} />
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

            <div className="fixed bottom-0 right-0 z-50 w-full border-t border-slate-800 bg-slate-900 p-4 lg:left-64 lg:w-[calc(100%-16rem)] shadow-[0_-8px_30px_rgb(0,0,0,0.12)]">
                <div className="mx-auto flex max-w-7xl items-center justify-between">
                    <button onClick={() => navigate('/admin/products')} className="px-6 py-2.5 text-sm font-semibold text-slate-400 transition-all hover:text-white">
                        Cancel
                    </button>
                    <div className="flex gap-4">
                        <button
                            disabled={isUpdating}
                            className={`rounded-xl bg-indigo-600 px-8 py-2.5 text-sm font-semibold text-white transition-all shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 hover:shadow-indigo-600/40 flex items-center gap-2 ${isUpdating ? 'opacity-70 cursor-not-allowed' : ''}`}
                            onClick={handleUpdate}
                        >
                            {isUpdating ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                'Save Changes'
                            )}
                        </button>
                    </div>
                </div>
            </div>

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
                        <button onClick={() => setNotification(null)} className="ml-4 text-slate-500 transition-colors hover:text-white">
                            <X size={16} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default UpdateProductLayout;
