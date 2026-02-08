export default function BottomCTA() {
    return (
        <div className="fixed bottom-0 right-0 w-2/5 bg-black border-t border-white/10 p-10">
            <div className="flex justify-between items-center mb-4">
                <span className="uppercase text-[11px]">Total Price</span>
                <span className="text-2xl font-impact text-[#d4c4b1]">$185.00</span>
            </div>

            <button className="w-full h-16 bg-white text-black font-black uppercase tracking-[0.4em] hover:bg-[#d4c4b1] transition-colors">
                Add to Bag
            </button>
        </div>
    );
}
