import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const OffersSection = ({ offers = [] }) => {
    const [copiedId, setCopiedId] = useState(null);

    if (offers.length === 0) return null;

    const handleCopy = (code, id) => {
        navigator.clipboard.writeText(code);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <section className="space-y-6 pt-4">
            <div className="flex items-center gap-3 border-b border-white/5 pb-2">
                <span className="material-symbols-outlined text-accent text-lg">local_offer</span>
                <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-white/90">
                    Save extra with these offers
                </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {offers.map((offer, index) => {
                    const offerId = offer._id || index;
                    const isCopied = copiedId === offerId;

                    return (
                        <motion.div
                            key={offerId}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => handleCopy(offer.code, offerId)}
                            className="group relative p-4 bg-white/[0.02] border border-white/5 rounded-sm hover:border-accent/30 transition-all cursor-pointer overflow-hidden"
                        >
                            {/* Subtle background glow on hover */}
                            <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            
                            <div className="relative z-10 flex items-start gap-4">
                                <div className="w-10 h-10 flex-shrink-0 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-accent group-hover:text-black transition-colors">
                                    <span className="material-symbols-outlined text-sm">{offer.icon || 'percent'}</span>
                                </div>
                                <div className="flex-1 space-y-1">
                                    <div className="flex justify-between items-start">
                                        <h5 className="text-[10px] font-black uppercase tracking-widest text-white/80 group-hover:text-accent transition-colors">
                                            {offer.title}
                                        </h5>
                                        <div className="flex items-center gap-1.5 min-w-[50px] justify-end">
                                            <AnimatePresence mode="wait">
                                                {isCopied ? (
                                                    <motion.span
                                                        key="copied"
                                                        initial={{ opacity: 0, x: 5 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, x: -5 }}
                                                        className="text-[8px] font-black text-accent uppercase tracking-tighter"
                                                    >
                                                        Copied!
                                                    </motion.span>
                                                ) : (
                                                    <motion.span
                                                        key="copy"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        className="material-symbols-outlined text-sm text-white/20 group-hover:text-white/60"
                                                    >
                                                        content_copy
                                                    </motion.span>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                    <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest leading-relaxed pr-8">
                                        {offer.description}
                                    </p>
                                    <div className="pt-2">
                                        <span className={`inline-block px-2 py-1 transition-colors duration-300 ${isCopied ? 'bg-accent/20 border-accent/40 text-accent' : 'bg-white/5 border-white/10 text-white/60'} border border-dashed text-[8px] font-mono uppercase tracking-widest`}>
                                            Use Code: {offer.code}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
};

