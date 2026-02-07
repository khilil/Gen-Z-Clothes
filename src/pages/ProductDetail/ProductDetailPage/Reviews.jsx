import { useEffect, useState } from "react";

const mockReviews = [
    {
        id: 1,
        name: "Alexander V.",
        rating: 5,
        title: "Exceptional Cut & Material",
        review:
            "The tailored fit is perfect. The Giza cotton feels substantial yet remains breathable. Truly a staple piece for any minimalist wardrobe.",
        time: "2 weeks ago",
        verified: true,
    },
    {
        id: 2,
        name: "Marcus T.",
        rating: 4,
        title: "Timeless Luxury",
        review:
            "I've tried many luxury shirts, but the attention to detail in the stitching here is unparalleled. Holds its shape well after multiple washes.",
        time: "1 month ago",
        verified: true,
    },
    {
        id: 3,
        name: "Julian R.",
        rating: 5,
        title: "Perfect White Shirt",
        review:
            "Found the holy grail of white shirts. Crisp, opaque, and the collar height is just right for both formal and casual settings.",
        time: "3 months ago",
        verified: true,
    },
];

export default function Reviews() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        // 🔮 Future: replace with real API
        setReviews(mockReviews);
    }, []);

    if (!reviews.length) return null;

    return (
        <section className="py-32 bg-[#0a0a0a] border-t border-white/5">
            <div className="max-w-[1920px] mx-auto px-8 md:px-12">

                {/* HEADER */}
                <div className="flex flex-row md:flex-row justify-between items-start md:items-center gap-6 mb-16">
                    <div>
                        <h2 className="text-5xl font-impact tracking-tighter mb-4">
                            CUSTOMER REVIEWS
                        </h2>

                        <div className="flex items-center gap-4">
                            <div className="flex gap-1 text-[#d4c4b1]">
                                {[1, 2, 3, 4].map(i => (
                                    <span
                                        key={i}
                                        className="material-symbols-outlined text-2xl fill-star"
                                    >
                                        star
                                    </span>
                                ))}
                                <span className="material-symbols-outlined text-2xl">
                                    star_half
                                </span>
                            </div>

                            <span className="text-[11px] font-bold uppercase tracking-widest text-white/40">
                                4.8 Average Based on 1,240 Reviews
                            </span>
                        </div>
                    </div>

                    <button className="px-10 py-4 border border-white/10 text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                        Write a Review
                    </button>
                </div>

                {/* GRID */}
                <div className="grid grid-rows-1 md:grid-cols-3 gap-8">
                    {reviews.map(review => (
                        <div
                            key={review.id}
                            className="bg-[#121212] p-10 border border-white/5 hover:border-white/20 transition-all flex flex-col justify-between"
                        >
                            <div>
                                {/* Rating + Verified */}
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex gap-0.5 text-[#d4c4b1]">
                                        {Array.from({ length: review.rating }).map((_, i) => (
                                            <span
                                                key={i}
                                                className="material-symbols-outlined text-base fill-star"
                                            >
                                                star
                                            </span>
                                        ))}
                                    </div>

                                    {review.verified && (
                                        <div className="flex items-center gap-1.5 text-[#d4c4b1]">
                                            <span className="material-symbols-outlined text-sm">
                                                verified
                                            </span>
                                            <span className="text-[9px] font-black uppercase tracking-widest">
                                                Verified Buyer
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Title */}
                                <h4 className="text-[12px] font-black uppercase tracking-widest mb-4">
                                    {review.title}
                                </h4>

                                {/* Review */}
                                <p className="text-white/60 text-[11px] leading-relaxed tracking-wider uppercase">
                                    {review.review}
                                </p>
                            </div>

                            {/* Footer */}
                            <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase tracking-widest">
                                    {review.name}
                                </span>
                                <span className="text-[9px] font-bold uppercase tracking-widest text-white/20">
                                    {review.time}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
