import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function CartPage() {
    const { cart, updateQty, removeItem, isLoading } = useCart();

    const subtotal = cart.reduce((acc, item) => acc + (item.price || 0) * (item.qty || 0), 0);
    const estimatedTax = subtotal * 0.08; // Example 8% tax
    const total = subtotal + estimatedTax;

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="animate-pulse font-[Oswald] tracking-widest uppercase text-black text-2xl">Loading Bag…</div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen font-sans text-black selection:bg-[#d4c4b1] selection:text-black">
            {/* Header Area - Since the main layout might have its own header, we match the style */}
            <header className="bg-black text-white h-20 flex items-center border-b border-white/10 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto w-full px-4 md:px-8 flex justify-between items-center text-white">
                    <Link to="/" className="text-xl md:text-3xl font-[Oswald] tracking-tighter uppercase no-underline text-white">MODERN MEN</Link>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] opacity-80">
                        <span className="material-symbols-outlined text-[#d4c4b1] text-lg">shopping_bag</span>
                        <span className="hidden sm:inline">Shopping Cart ({cart.length})</span>
                        <span className="sm:hidden">Cart ({cart.length})</span>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 md:px-8 py-12">
                {/* Progress Stepper */}
                <div className="hidden md:flex items-center justify-center mb-16 max-w-2xl mx-auto">
                    <div className="flex items-center gap-4 group">
                        <span className="text-[10px] font-black uppercase tracking-widest text-black">Cart</span>
                        <div className="w-12 md:w-16 h-[2px] bg-black"></div>
                    </div>
                    <div className="flex items-center gap-4 px-4 opacity-30">
                        <span className="text-[10px] font-black uppercase tracking-widest">Shipping</span>
                        <div className="w-12 md:w-16 h-[2px] bg-gray-200"></div>
                    </div>
                    <div className="flex items-center gap-4 px-4 opacity-30">
                        <span className="text-[10px] font-black uppercase tracking-widest">Payment</span>
                        <div className="w-12 md:w-16 h-[2px] bg-gray-200"></div>
                    </div>
                    <div className="flex items-center gap-4 opacity-30">
                        <span className="text-[10px] font-black uppercase tracking-widest">Done</span>
                    </div>
                </div>

                {cart.length === 0 ? (
                    <div className="text-center py-32 space-y-8">
                        <h2 className="text-4xl font-[Oswald] uppercase tracking-tighter">Your Bag is Empty</h2>
                        <p className="text-gray-500 uppercase tracking-widest text-[11px] font-bold">Start exploring our premium collection</p>
                        <Link to="/" className="inline-block px-12 py-5 bg-black text-white text-[11px] font-black uppercase tracking-[0.4em] hover:bg-[#d4c4b1] hover:text-black transition-all duration-500 rounded-xl">
                            Continue Exploration
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-16">
                        {/* Cart Items List */}
                        <div className="flex-1 space-y-8">
                            <h1 className="text-2xl md:text-3xl font-[Oswald] uppercase tracking-tight mb-8">Your Bag ({cart.length} Items)</h1>

                            {cart.map((item) => (
                                <div key={item.cartItemId} className="flex flex-col sm:flex-row gap-4 md:gap-8 py-8 border-b border-gray-100 last:border-0 hover:bg-gray-50/30 transition-colors p-4 rounded-3xl group">
                                    <div className="w-full sm:w-40 aspect-[3/4] bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0 relative">
                                        <img
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                                            src={item.image}
                                        />
                                    </div>
                                    <div className="flex flex-col flex-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-lg font-[Oswald] uppercase tracking-widest">{item.title}</h3>
                                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Ref: {item.variantId?.slice(-8).toUpperCase() || "MM-OX-001"}</p>
                                            </div>
                                            <p className="text-xl font-[Oswald]">₹{item.price?.toLocaleString()}</p>
                                        </div>

                                        <div className="mt-4 space-y-4">
                                            <div className="flex flex-wrap gap-4 text-[11px] font-black uppercase tracking-widest">
                                                <p>Size: <span className="text-gray-400 font-medium">{item.size}</span></p>
                                                {item.color && item.color !== "N/A" && (
                                                    <p>Color: <span className="text-gray-400 font-medium">{item.color}</span></p>
                                                )}
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <span className="text-[11px] font-black uppercase tracking-widest">Quantity:</span>
                                                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                                                    <button
                                                        onClick={() => updateQty(item.id, item.variantId, item.qty - 1)}
                                                        className="px-3 py-1 hover:bg-gray-100 transition-colors border-r border-gray-200 disabled:opacity-30"
                                                        disabled={item.qty <= 1}
                                                    >-</button>
                                                    <span className="px-5 py-1 text-xs font-bold w-12 text-center">{item.qty}</span>
                                                    <button
                                                        onClick={() => updateQty(item.id, item.variantId, item.qty + 1)}
                                                        className="px-3 py-1 hover:bg-gray-100 transition-colors border-l border-gray-200"
                                                    >+</button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-auto pt-6 flex gap-6">
                                            <button
                                                onClick={() => removeItem(item.cartItemId)}
                                                className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-600 hover:text-red-500 flex items-center gap-1 transition-colors"
                                            >
                                                <span className="material-symbols-outlined text-sm">delete</span> Remove
                                            </button>
                                            <button className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-600 hover:text-black flex items-center gap-1 transition-colors">
                                                <span className="material-symbols-outlined text-sm">favorite</span> Save for Later
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary Sidebar */}
                        <div className="lg:w-[400px]">
                            <div className="sticky top-32 bg-gray-50 border border-gray-100 p-8 rounded-2xl shadow-sm">
                                <h3 className="text-2xl font-[Oswald] uppercase tracking-tight mb-8">Order Summary</h3>

                                <div className="mb-8">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-3">Promo Code</label>
                                    <div className="flex gap-2">
                                        <input
                                            className="flex-1 border-gray-200 rounded-xl py-3 px-4 text-xs focus:ring-black focus:border-black outline-none"
                                            placeholder="Enter code"
                                            type="text"
                                        />
                                        <button className="px-6 py-3 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-[#d4c4b1] hover:text-black transition-all">Apply</button>
                                    </div>
                                </div>

                                <div className="space-y-4 pt-6 border-t border-gray-200">
                                    <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-gray-500">
                                        <span>Subtotal</span>
                                        <span className="text-black">₹{subtotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-gray-500">
                                        <span>Shipping</span>
                                        <span className="text-emerald-600">Calculated at next step</span>
                                    </div>
                                    <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-gray-500">
                                        <span>Estimated Tax</span>
                                        <span className="text-black">₹{estimatedTax.toLocaleString()}</span>
                                    </div>

                                    <div className="pt-6 border-t border-gray-200 flex justify-between items-end">
                                        <span className="text-lg font-[Oswald] uppercase tracking-tighter">Total</span>
                                        <span className="text-3xl font-[Oswald] uppercase tracking-tight text-black">₹{total.toLocaleString()}</span>
                                    </div>
                                </div>

                                <Link
                                    to="/checkout"
                                    className="block text-center w-full mt-10 h-16 bg-black text-white text-[12px] font-black uppercase tracking-[0.3em] hover:bg-[#d4c4b1] hover:text-black transition-all rounded-xl shadow-xl shadow-black/10 flex items-center justify-center no-underline"
                                >
                                    Proceed to Checkout
                                </Link>

                                <div className="mt-8 space-y-3">
                                    <div className="flex items-center gap-3 text-gray-400">
                                        <span className="material-symbols-outlined text-lg">local_shipping</span>
                                        <span className="text-[9px] font-black uppercase tracking-widest">Free Express Shipping on orders over ₹5,000</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-400">
                                        <span className="material-symbols-outlined text-lg">workspace_premium</span>
                                        <span className="text-[9px] font-black uppercase tracking-widest">30-Day Premium Returns Guarantee</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Mobile Bottom Fixed Bar */}
            {cart.length > 0 && (
                <div className="lg:hidden fixed bottom-0 left-0 w-full z-[60] animate-slideUp">
                    <div className="bg-white border-t border-gray-100 p-6 flex justify-between items-center shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
                        <div>
                            <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">Total Amount</p>
                            <span className="text-2xl font-[Oswald] text-black tracking-tighter">₹{total.toLocaleString()}</span>
                        </div>
                        <Link
                            to="/checkout"
                            className="h-14 px-8 bg-black text-white text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center rounded-xl active:scale-95 transition-all no-underline"
                        >
                            Checkout
                        </Link>
                    </div>
                </div>
            )}

        </div>
    );
}
