import React from 'react';
import { motion } from 'framer-motion';

export const OffersSection = ({ offers = [] }) => {
    if (offers.length === 0) return null;

    return (
        <section className="space-y-6 pt-4">
            <div className="flex items-center gap-3 border-b border-white/5 pb-2">
                <span className="material-symbols-outlined text-accent text-lg">local_offer</span>
                <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-white/90">
                    Save extra with these offers
                </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {offers.map((offer, index) => (
                    <motion.div
                        key={offer._id || index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative p-4 bg-white/[0.02] border border-white/5 rounded-sm hover:border-accent/30 transition-all cursor-pointer overflow-hidden"
                    >
                        {/* Subtle background glow on hover */}
                        <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        
                        <div className="relative z-10 flex items-start gap-4">
                            <div className="w-10 h-10 flex-shrink-0 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-accent group-hover:text-black transition-colors">
                                <span className="material-symbols-outlined text-sm">{offer.icon}</span>
                            </div>
                            <div className="space-y-1">
                                <h5 className="text-[10px] font-black uppercase tracking-widest text-white/80 group-hover:text-accent transition-colors">
                                    {offer.title}
                                </h5>
                                <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest leading-relaxed">
                                    {offer.description}
                                </p>
                                <div className="pt-2">
                                    <span className="inline-block px-2 py-1 bg-white/5 border border-dashed border-white/10 text-[8px] font-mono text-white/60 uppercase tracking-widest">
                                        Use Code: {offer.code}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
