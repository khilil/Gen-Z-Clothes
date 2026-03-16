import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { getActiveOffers } from '../services/offerService';

const OfferContext = createContext();

export const OfferProvider = ({ children }) => {
    const [activeOffers, setActiveOffers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchOffers = async () => {
        setIsLoading(true);
        try {
            const res = await getActiveOffers();
            setActiveOffers(res.data || []);
        } catch (error) {
            console.error("Failed to fetch active offers:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOffers();
        // Refresh every 5 minutes to catch newly activated/expired offers
        const interval = setInterval(fetchOffers, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    // Helper: Get applicable product-level offer
    const getProductOffer = (product) => {
        if (!product || !activeOffers.length) return null;

        return activeOffers.find(offer => {
            // Priority 1: Flash Sale, Clearance, Seasonal, Festival
            const promoTypes = ["FLASH_SALE", "CLEARANCE", "SEASONAL", "FESTIVAL"];
            if (!promoTypes.includes(offer.offerType)) return false;

            // Check category applicability
            if (offer.applicableCategories && offer.applicableCategories.length > 0) {
                const productCategory = product.productType || product.categories?.[0];
                return offer.applicableCategories.includes(productCategory);
            }

            return true;
        });
    };

    // Helper: Get cart-wide offers (tiered, buy more save more, free shipping)
    const getCartOffers = (subtotal) => {
        return activeOffers.filter(offer => {
            if (offer.offerType === "BUY_MORE_SAVE_MORE" || offer.offerType === "FREE_SHIPPING") {
                return subtotal >= (offer.minPurchaseAmount || 0);
            }
            return false;
        });
    };

    // Helper: Get active banners
    const activeBanners = useMemo(() => {
        return activeOffers
            .filter(offer => offer.bannerConfig?.showBanner)
            .map(offer => ({
                id: offer._id,
                ...offer.bannerConfig,
                title: offer.title,
                description: offer.description,
                offerType: offer.offerType,
                applicableCategories: offer.applicableCategories
            }));
    }, [activeOffers]);

    return (
        <OfferContext.Provider value={{ 
            activeOffers, 
            isLoading, 
            getProductOffer, 
            getCartOffers, 
            activeBanners,
            refreshOffers: fetchOffers
        }}>
            {children}
        </OfferContext.Provider>
    );
};

export const useOffers = () => useContext(OfferContext);
