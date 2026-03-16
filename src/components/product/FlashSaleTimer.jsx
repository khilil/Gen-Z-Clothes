import React, { useState, useEffect } from 'react';

const FlashSaleTimer = ({ endDate }) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(endDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    if (!timeLeft.hours && !timeLeft.minutes && !timeLeft.seconds) {
        return null;
    }

    return (
        <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#d4c4b1]">Ends in:</span>
            <div className="flex gap-1.5">
                {[
                    { label: 'H', value: timeLeft.hours },
                    { label: 'M', value: timeLeft.minutes },
                    { label: 'S', value: timeLeft.seconds }
                ].map((item, idx) => (
                    <div key={idx} className="flex items-baseline gap-0.5">
                        <span className="text-xs font-black text-white">{String(item.value).padStart(2, '0')}</span>
                        <span className="text-[8px] font-bold text-white/40">{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FlashSaleTimer;
