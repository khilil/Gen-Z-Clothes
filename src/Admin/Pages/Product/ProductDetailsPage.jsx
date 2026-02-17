import React, { useState, useMemo } from 'react';
import ProductHeader from './components/ProductHeader';
import BasicInfoSection from './components/BasicInfoSection';
import VariantSection from './components/VariantGeneratorSection';
import OrganizationCard from './components/OrganizationCard';
import MediaGallery from './components/MediaGallery';
import FooterActionBar from './components/FooterActionBar';
import PricingCard from './components/PricingCard';


export default function ProductDetailsPage() {
    // State Management
    const [productName, setProductName] = useState('Classic Essential T-Shirt');
    const [description, setDescription] = useState('Our Classic Essential T-Shirt is made from 100% organic cotton.');
    const [selectedColors, setSelectedColors] = useState([
        { name: 'Red', hex: '#ef4444', code: 'RED' },
        { name: 'Blue', hex: '#2563eb', code: 'BLU' }
    ]);
    const [selectedSizes, setSelectedSizes] = useState(['S', 'M']);
    const [pricing, setPricing] = useState({ base: 29.00, cost: 12.00, compare: 0 });

    // SKU Generation Logic
    const generatedSkus = useMemo(() => {
        const prefix = "TS";
        const skus = [];
        selectedColors.forEach(color => {
            selectedSizes.forEach(size => {
                const skuCode = `${prefix}-${color.code}-${size}`.toUpperCase();
                skus.push({ id: skuCode, color: color.name, size: size, sku: skuCode });
            });
        });
        return skus;
    }, [selectedColors, selectedSizes]);

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100">
            <ProductHeader title={productName} />

            <main className="max-w-7xl mx-auto px-6 py-8 pb-32">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-8">
                        <BasicInfoSection
                            name={productName}
                            setName={setProductName}
                            desc={description}
                            setDesc={setDescription}
                        />
                        <VariantSection
                            selectedColors={selectedColors}
                            setSelectedColors={setSelectedColors}
                            selectedSizes={selectedSizes}
                            setSelectedSizes={setSelectedSizes}
                            generatedSkus={generatedSkus}
                        />
                    </div>

                    {/* Right Column (Sidebar) */}
                    <div className="space-y-8">
                        <OrganizationCard />
                        <PricingCard pricing={pricing} setPricing={setPricing} />
                        <MediaGallery />
                    </div>
                </div>
            </main>

            <FooterActionBar />
        </div>
    );
}