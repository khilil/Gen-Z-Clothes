import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import * as orderService from "../../services/orderService";

const OrderDetails = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const res = await orderService.getOrderById(orderId);
                setOrder(res.data);
            } catch (error) {
                console.error("Fetch order details failed:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchOrderDetails();
    }, [orderId]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-40 min-h-screen">
                <div className="animate-pulse text-black uppercase tracking-[0.6em] font-black text-[10px]">
                    [ RETRIEVING PROTOCOL DATA ]
                </div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="flex flex-col items-center justify-center py-40 min-h-screen">
                <p className="text-black/20 uppercase tracking-[0.5em] text-[10px] font-black">
                    Error: Protocol Trace Not Found
                </p>
                <Link to="/account/orders" className="inline-block mt-8 text-[9px] font-black uppercase tracking-widest bg-black text-white px-8 py-4 rounded-xl hover:bg-accent hover:text-black transition-all">
                    Return to Archives
                </Link>
            </div>
        );
    }

    const getStatusIndex = (status) => {
        const sequence = ['placed', 'processing', 'in-production', 'ready-to-ship', 'shipped', 'delivered'];
        return sequence.indexOf(status?.toLowerCase());
    };

    const currentIdx = getStatusIndex(order.orderStatus);

    return (
        <div className="flex-1 pb-20">
            {/* HEADER */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                <div>
                    <Link to="/account/orders" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-black/30 hover:text-black mb-6 transition-all group/back">
                        <span className="material-symbols-outlined text-base group-hover/back:-translate-x-1 transition-transform">arrow_back</span>
                        Archive Retrieval
                    </Link>
                    <h2 className="text-4xl md:text-5xl font-impact tracking-tight mb-2 text-black">Protocol #MM-{order._id.slice(-8).toUpperCase()}</h2>
                    <p className="text-black/20 text-[10px] uppercase tracking-[0.4em] font-black">
                        Logged on {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} // {new Date(order.createdAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                </div>
                <div className="flex gap-4">
                    <button className="flex items-center gap-3 px-8 py-4 border border-black/5 bg-black/5 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] text-black/60 hover:bg-black/10 hover:text-black transition-all group">
                        <span className="material-symbols-outlined text-base group-hover:translate-y-0.5 transition-transform">download</span>
                        Export Manifest
                    </button>
                    <button className="px-10 py-4 bg-black text-white rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] hover:bg-[#8b7e6d] transition-all hover:scale-105 active:scale-95 shadow-[0_10px_30px_rgba(0,0,0,0.1)]">
                        Acquire Again
                    </button>
                </div>
            </header>

            {/* TIMELINE */}
            <div className="bg-white border border-black/[0.03] rounded-[2.5rem] p-10 md:p-14 mb-10 relative overflow-hidden group/timeline shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
                <div className="absolute top-0 right-0 p-5 opacity-10 uppercase text-[8px] font-black tracking-widest text-black">Status Stream active</div>
                <div className="relative flex justify-between gap-4">
                    <div className="absolute top-[7px] left-0 w-full h-[1px] bg-black/5 -z-0"></div>
                    {['Placed', 'Processing', 'In Production', 'Ready', 'Shipped', 'Finalized'].map((step, idx) => {
                        const sequence = ['placed', 'processing', 'in-production', 'ready-to-ship', 'shipped', 'delivered'];
                        const isComplete = idx < currentIdx;
                        const isActive = idx === currentIdx;

                        return (
                            <div key={step} className={`relative z-10 flex flex-col items-center gap-5 ${isActive ? 'text-black' : isComplete ? 'text-black/60' : 'text-black/20'} transition-colors duration-700`}>
                                <div className={`w-3.5 h-3.5 rounded-full ring-8 ring-[#f8f9fa] transition-all duration-700 ${isActive ? 'bg-[#8b7e6d] scale-125 shadow-[0_0_15px_rgba(139,126,109,0.5)]' : isComplete ? 'bg-black/40' : 'bg-black/5'}`}></div>
                                <div className="text-center">
                                    <p className="text-[9px] font-black uppercase tracking-[0.2em] whitespace-nowrap">{step}</p>
                                    {isActive && (
                                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#8b7e6d] rounded-full animate-ping"></div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* TRACKING INFO (If Shipped) */}
            {order.trackingNumber && (
                <div className="bg-white border border-black/[0.03] text-black rounded-[2rem] p-10 mb-10 flex flex-col md:flex-row justify-between items-center gap-8 shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
                    <div className="flex items-center gap-8">
                        <div className="w-16 h-16 bg-black/[0.02] rounded-full flex items-center justify-center border border-black/[0.03]">
                            <span className="material-symbols-outlined text-[#8b7e6d] text-3xl">local_shipping</span>
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8b7e6d] mb-1">Active Shipment Trace</p>
                            <h3 className="text-2xl font-impact tracking-tight uppercase text-black">{order.courierService || "Express Logistics"}</h3>
                        </div>
                    </div>
                    <div className="flex flex-col md:items-end w-full md:w-auto">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black/20 mb-2">Waybill Number</p>
                        <div className="flex items-center gap-4 bg-black/[0.02] px-6 py-3 rounded-xl border border-black/[0.03]">
                            <span className="text-xl font-mono font-black tracking-tighter text-black underline underline-offset-4 decoration-[#8b7e6d]">{order.trackingNumber}</span>
                            <button className="p-2 hover:bg-black/5 rounded-lg transition-colors flex items-center justify-center">
                                <span className="material-symbols-outlined text-base">content_copy</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid lg:grid-cols-3 gap-10">
                {/* ITEMS LIST */}
                <div className="lg:col-span-2 space-y-10">
                    <div className="bg-white border border-black/[0.03] rounded-[2.5rem] overflow-hidden group/list shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
                        <div className="px-10 py-8 border-b border-black/[0.03] bg-black/[0.01] flex justify-between items-center">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-black/30">Acquisition Items ({order.items?.length || 0})</h3>
                        </div>
                        <div className="divide-y divide-black/[0.03]">
                            {order.items?.map((item, idx) => (
                                <div key={idx} className="p-10 md:p-14 flex gap-10 items-center group/item hover:bg-black/[0.01] transition-all">
                                    <div className="w-28 h-36 md:w-40 md:h-52 bg-black/[0.02] rounded-3xl overflow-hidden border border-black/5 flex-shrink-0 group-hover/item:border-black/10 transition-all duration-1000 p-2">
                                        <img
                                            alt={item.title}
                                            className="w-full h-full object-cover rounded-2xl grayscale group-hover/item:grayscale-0 group-hover/item:scale-110 transition-all duration-1000"
                                            src={item.customizations?.previews?.front || item.imageURL || "https://placeholder.com/100"}
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between h-full py-4">
                                        <div>
                                            <div className="flex justify-between items-start mb-4">
                                                <h4 className="text-xl md:text-3xl font-impact tracking-tight text-black uppercase group-hover/item:text-[#8b7e6d] transition-colors leading-none">{item.title}</h4>
                                                {item.designReference && (
                                                    <span className="text-[9px] font-black bg-[#8b7e6d] text-white px-3 py-1 rounded-full tracking-[0.2em] uppercase shadow-[0_10px_20px_rgba(139,126,109,0.2)]">Custom</span>
                                                )}
                                            </div>
                                            <p className="text-[11px] text-black/30 uppercase tracking-[0.3em] font-black mb-6">
                                                {item.size && `Dim: ${item.size}`} {item.color && ` // Chroma: ${item.color}`}
                                            </p>
                                            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-[#8b7e6d]">Quantity: {item.quantity}</p>
                                        </div>
                                        <div className="flex justify-between items-end mt-8">
                                            <p className="text-2xl font-impact tracking-tight text-black">₹{(item.priceAtPurchase || item.price * item.quantity).toLocaleString()}</p>
                                            <button className="text-[10px] font-black uppercase tracking-[0.4em] text-black/20 hover:text-black transition-colors underline underline-offset-8 decoration-black/10 group-hover/item:decoration-[#8b7e6d]">Feedback Protocol</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* SUMMARY & LOGISTICS */}
                <div className="space-y-10">
                    {/* ORDER SUMMARY */}
                    <div className="bg-white border border-black/[0.03] rounded-[2.5rem] overflow-hidden group/summary shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
                        <div className="px-10 py-6 border-b border-black/[0.03] bg-black/[0.01] flex items-center justify-between">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-black/30">Statement Summary</h3>
                            <span className="material-symbols-outlined text-black/10 text-sm">receipt</span>
                        </div>
                        <div className="p-10 space-y-6">
                            <div className="flex justify-between text-[11px] font-black uppercase tracking-[0.3em] text-black/30">
                                <span>Sub-Total Log</span>
                                <span className="text-black/60">₹{order.totalAmount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-[11px] font-black uppercase tracking-[0.3em] text-black/30">
                                <span>Logistics Protocol</span>
                                <span className="text-[#8b7e6d] animate-pulse">Standard Compulsory</span>
                            </div>
                            <div className="flex justify-between text-[11px] font-black uppercase tracking-[0.3em] text-black/30">
                                <span>Chroma Tax</span>
                                <span className="text-black/60">₹0.00</span>
                            </div>
                            <div className="pt-8 border-t border-black/[0.03] flex justify-between items-center">
                                <span className="text-[13px] font-black uppercase tracking-[0.4em] text-black">Total Investment</span>
                                <span className="text-3xl font-impact tracking-tight text-[#8b7e6d]">₹{order.totalAmount.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* SHIPPING ADDRESS */}
                    <div className="bg-white border border-black/[0.03] rounded-[2.5rem] overflow-hidden group/address shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
                        <div className="px-10 py-6 border-b border-black/[0.03] bg-black/[0.01] flex justify-between items-center text-black/40">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em]">Destination Protocol</h3>
                            <span className="material-symbols-outlined text-sm">location_on</span>
                        </div>
                        <div className="p-10">
                            <p className="text-[13px] font-black uppercase tracking-[0.4em] text-black mb-6">{order.shippingAddress?.fullName}</p>
                            <p className="text-[11px] text-black/30 font-black uppercase tracking-[0.3em] leading-loose">
                                {order.shippingAddress?.addressLine},<br />
                                {order.shippingAddress?.city} // {order.shippingAddress?.state},<br />
                                REGION PC: {order.shippingAddress?.pincode}
                            </p>
                            <div className="mt-10 flex items-center gap-4 bg-black/[0.02] p-4 rounded-2xl border border-black/[0.03]">
                                <span className="material-symbols-outlined text-black/20 text-sm">phone</span>
                                <p className="text-[11px] font-black uppercase tracking-[0.4em] text-black/60">{order.shippingAddress?.phone}</p>
                            </div>
                        </div>
                    </div>

                    {/* PAYMENT METHOD */}
                    <div className="bg-white border border-black/[0.03] rounded-[2.5rem] overflow-hidden group/payment shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
                        <div className="px-10 py-6 border-b border-black/[0.03] bg-black/[0.01] flex justify-between items-center text-black/40">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em]">Funding Source</h3>
                            <span className="material-symbols-outlined text-sm">payments</span>
                        </div>
                        <div className="p-10">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-10 bg-black text-white rounded-xl flex items-center justify-center text-[9px] font-black uppercase tracking-[0.2em] shadow-[0_5px_15px_rgba(0,0,0,0.2)]">
                                    {order.paymentMethod === 'COD' ? 'CASH' : 'DPAL'}
                                </div>
                                <div>
                                    <p className="text-[11px] font-black uppercase tracking-[0.3em] text-black">
                                        {order.paymentMethod === 'COD' ? 'Physical Currency' : 'Digital Protocol'}
                                    </p>
                                    <p className={`text-[10px] font-black uppercase tracking-[0.4em] mt-3 ${order.paymentStatus === 'paid' ? 'text-emerald-600' : 'text-[#8b7e6d]'}`}>Status: {order.paymentStatus}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
