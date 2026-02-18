import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

/**
 * AdminOrderDetails Component
 * A comprehensive order detail view for an e-commerce admin panel.
 * Includes status tracking, item details, customer info, and production workflow.
 */
const AdminOrderDetails = () => {
    const { orderId } = useParams() || { orderId: '88291' }; // Fallback for demo
    const navigate = useNavigate()
    // --- STATE ---
    const [note, setNote] = useState('');
    const [status, setStatus] = useState('Production');
    const [isQualityChecked, setIsQualityChecked] = useState(false);

    // --- SAMPLE DATA ---
    const orderItems = [
        {
            id: 1,
            name: 'Classic Cotton Tee',
            options: 'Size: L | Color: White',
            sku: 'APP-TEE-WHT-L',
            printType: 'DTF',
            qty: 2,
            price: 24.00,
            img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=150&h=150&fit=crop'
        },
        {
            id: 2,
            name: 'Premium Pullover Hoodie',
            options: 'Size: XL | Color: Black',
            sku: 'APP-HOD-BLK-XL',
            printType: 'Vinyl',
            qty: 1,
            price: 45.00,
            img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=150&h=150&fit=crop'
        },
        {
            id: 3,
            name: 'Eco-Canvas Tote',
            options: 'One Size | Color: Natural',
            sku: 'ACC-TOT-NAT-O',
            printType: 'DTF',
            qty: 1,
            price: 15.00,
            img: 'https://images.unsplash.com/photo-1591337676887-a217a6970c8a?w=150&h=150&fit=crop'
        }
    ];

    const timelineSteps = [
        { label: 'Ordered', icon: 'check', date: 'Oct 24, 14:45', completed: true },
        { label: 'Paid', icon: 'payments', date: 'Oct 24, 15:10', completed: true },
        { label: 'Production', icon: 'precision_manufacturing', date: 'In Progress', active: true },
        { label: 'Shipped', icon: 'local_shipping', date: 'Pending', completed: false },
        { label: 'Delivered', icon: 'done_all', date: 'Pending', completed: false },
    ];

    return (
        <div className="bg-slate-50 dark:bg-[#101622] min-h-screen text-slate-900 dark:text-slate-100 font-sans pb-24 lg:pb-8">
            <div className="max-w-7xl mx-auto px-4 py-8">

                {/* --- HEADER SECTION --- */}
                <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-2">
                        <button
                            onClick={() => navigate('/admin/orders')}
                            className="text-[#1152d4] hover:text-[#1152d4]/80 flex items-center gap-1 transition-colors text-sm font-semibold group"
                        >
                            <span className="material-icons text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
                            Orders List
                        </button>
                        <div className="flex flex-wrap items-center gap-4">
                            <h1 className="text-3xl font-bold tracking-tight">Order #{orderId}</h1>
                            <span className="px-3 py-1 bg-[#1152d4]/10 text-[#1152d4] border border-[#1152d4]/20 rounded-full text-xs font-bold uppercase tracking-wider">
                                {status === 'Production' ? 'In Production' : status}
                            </span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">Placed on October 24, 2026 at 2:45 PM</p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all font-semibold text-sm">
                            <span className="material-icons text-lg">description</span> Generate Invoice
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all font-semibold text-sm">
                            <span className="material-icons text-lg">local_shipping</span> Shipping Label
                        </button>
                        <button className="flex items-center gap-2 px-6 py-2.5 bg-[#1152d4] text-white rounded-lg hover:bg-[#1152d4]/90 transition-all font-semibold text-sm shadow-md">
                            <span className="material-icons text-lg">update</span> Update Status
                        </button>
                    </div>
                </header>

                {/* --- ORDER TIMELINE --- */}
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-8 overflow-x-auto">
                    <div className="min-w-[600px] relative flex items-center justify-between">
                        {/* Timeline Line Background */}
                        <div className="absolute left-0 top-5 w-full h-1 bg-slate-100 dark:bg-slate-700 z-0"></div>
                        {/* Active Progress Line */}
                        <div className="absolute left-0 top-5 w-1/2 h-1 bg-[#1152d4] z-0 transition-all duration-500"></div>

                        {timelineSteps.map((step, idx) => (
                            <div key={idx} className="relative z-10 flex flex-col items-center text-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition-all duration-300 ${step.completed ? 'bg-[#1152d4] text-white' :
                                    step.active ? 'bg-[#1152d4] text-white ring-4 ring-[#1152d4]/20 border-2 border-white dark:border-slate-800 scale-110' :
                                        'bg-slate-100 dark:bg-slate-700 text-slate-400'
                                    }`}>
                                    <span className="material-icons text-lg">{step.completed ? 'check' : step.icon}</span>
                                </div>
                                <div className="space-y-0.5">
                                    <p className={`text-[11px] font-black uppercase tracking-widest ${step.active ? 'text-[#1152d4]' : 'text-slate-500 dark:text-slate-400'}`}>
                                        {step.label}
                                    </p>
                                    <p className="text-[10px] text-slate-400 font-medium">{step.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- MAIN GRID --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT COLUMN */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Order Items Card */}
                        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50/30 dark:bg-slate-800/50 flex items-center justify-between">
                                <h2 className="font-bold text-lg flex items-center gap-2">
                                    <span className="material-icons text-[#1152d4]">inventory_2</span> Order Items
                                </h2>
                                <span className="text-xs font-bold px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-slate-500">3 TOTAL</span>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50/50 dark:bg-slate-800/30 text-slate-400 text-[10px] uppercase tracking-[0.1em] font-black">
                                            <th className="px-6 py-4">Product Details</th>
                                            <th className="px-4 py-4 text-center">Print Type</th>
                                            <th className="px-4 py-4 text-center">Qty</th>
                                            <th className="px-4 py-4 text-right">Price</th>
                                            <th className="px-6 py-4 text-right">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                                        {orderItems.map((item) => (
                                            <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-4">
                                                        <img src={item.img} alt={item.name} className="w-14 h-14 rounded-lg object-cover border border-slate-200 dark:border-slate-600 shadow-sm" />
                                                        <div className="space-y-1">
                                                            <p className="font-bold text-sm leading-none">{item.name}</p>
                                                            <p className="text-xs text-slate-500 font-medium">{item.options}</p>
                                                            <p className="text-[10px] font-mono text-slate-400 bg-slate-50 dark:bg-slate-900 px-1.5 py-0.5 rounded w-fit">{item.sku}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-5 text-center">
                                                    <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider ${item.printType === 'DTF' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' : 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300'
                                                        }`}>
                                                        {item.printType}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-5 text-center text-sm font-bold text-slate-500">0{item.qty}</td>
                                                <td className="px-4 py-5 text-right text-sm font-medium text-slate-600 dark:text-slate-400">${item.price.toFixed(2)}</td>
                                                <td className="px-6 py-5 text-right text-sm font-black text-slate-900 dark:text-white">${(item.qty * item.price).toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="p-6 bg-slate-50/50 dark:bg-slate-800/50 flex flex-col items-end gap-3">
                                <div className="flex justify-between w-full max-w-[280px] text-sm text-slate-500 font-medium">
                                    <span>Subtotal</span>
                                    <span className="text-slate-900 dark:text-white">$108.00</span>
                                </div>
                                <div className="flex justify-between w-full max-w-[280px] text-sm text-slate-500 font-medium">
                                    <span>Shipping Cost</span>
                                    <span className="text-emerald-600 font-bold uppercase text-[11px] tracking-tighter">Calculated: $0.00</span>
                                </div>
                                <div className="flex justify-between w-full max-w-[280px] pt-4 mt-2 border-t border-slate-200 dark:border-slate-700">
                                    <span className="text-base font-bold">Grand Total</span>
                                    <span className="text-2xl font-black text-[#1152d4]">$108.00</span>
                                </div>
                            </div>
                        </div>

                        {/* Shipping Map Preview */}
                        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden relative">
                            <div className="h-64 bg-slate-200 dark:bg-slate-900 flex items-center justify-center relative">
                                {/* Map Placeholder Graphic */}
                                <div className="absolute inset-0 opacity-20 grayscale bg-[url('https://www.google.com/maps/vt/pb=!1m4!1m3!1i12!2i1047!3i1608!2m3!1e0!2sm!3i420120488!3m8!2sen!3sus!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!5f2')] bg-cover"></div>
                                <div className="z-10 bg-[#1152d4] p-3 rounded-full shadow-2xl animate-pulse">
                                    <span className="material-icons text-white text-3xl">local_shipping</span>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-6 left-6 right-6 flex items-center gap-4 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm p-4 rounded-xl shadow-xl border border-white/20">
                                    <div className="bg-[#1152d4]/10 p-2 rounded-lg">
                                        <span className="material-icons text-[#1152d4]">pin_drop</span>
                                    </div>
                                    <div>
                                        <p className="text-xs font-black uppercase text-slate-400 tracking-widest">Target Destination</p>
                                        <p className="text-sm font-bold">123 Tech Avenue, Suite 500, San Francisco, CA 94103</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="space-y-8">

                        {/* Customer Details */}
                        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                                    <span className="material-icons text-[#1152d4]">person</span> Customer Information
                                </h3>
                                <button className="text-[#1152d4] text-[11px] font-black uppercase hover:underline">View CRM</button>
                            </div>
                            <div className="flex items-center gap-4 mb-6 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1152d4] to-blue-400 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-blue-500/20">
                                    JD
                                </div>
                                <div>
                                    <p className="font-bold text-base leading-tight">Johnathan Doe</p>
                                    <p className="text-xs text-slate-500 font-medium">john.doe@example.com</p>
                                </div>
                            </div>
                            <div className="space-y-4 px-1">
                                <div className="flex items-center gap-4 text-sm font-medium">
                                    <span className="material-icons text-slate-400 text-lg">phone</span>
                                    <span>+1 (555) 123-4567</span>
                                </div>
                                <div className="flex items-center gap-4 text-sm font-medium">
                                    <span className="material-icons text-slate-400 text-lg">shopping_bag</span>
                                    <span>12 Successfull Orders</span>
                                </div>
                                <div className="flex items-center gap-4 text-sm font-medium">
                                    <span className="material-icons text-slate-400 text-lg">event_available</span>
                                    <span>Member since Oct 2024</span>
                                </div>
                            </div>
                        </div>

                        {/* Shipping Address */}
                        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                                    <span className="material-icons text-[#1152d4]">map</span> Delivery Address
                                </h3>
                                <button className="text-slate-400 hover:text-[#1152d4] transition-colors p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded">
                                    <span className="material-icons text-base">content_copy</span>
                                </button>
                            </div>
                            <div className="text-sm font-medium space-y-1 text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-900/30 p-4 rounded-lg border border-dashed border-slate-200 dark:border-slate-700">
                                <p className="font-black text-slate-900 dark:text-white">Johnathan Doe</p>
                                <p>123 Tech Avenue</p>
                                <p>Suite 500 - SOMA District</p>
                                <p>San Francisco, CA 94103</p>
                                <p>United States</p>
                            </div>
                            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Shipping Carrier</p>
                                    <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full font-bold">EXPRESS</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg">
                                    <span className="text-xs font-bold">FedEx Priority Mail</span>
                                    <span className="text-[10px] font-mono bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-slate-500">AWAITING_LABEL</span>
                                </div>
                            </div>
                        </div>

                        {/* Internal Notes */}
                        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                            <h3 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-4">
                                <span className="material-icons text-[#1152d4]">sticky_note_2</span> Internal Production Notes
                            </h3>
                            <textarea
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                className="w-full text-sm border-slate-200 dark:border-slate-700 dark:bg-[#101622] rounded-lg focus:ring-2 focus:ring-[#1152d4]/50 focus:border-[#1152d4] transition-all resize-none"
                                placeholder="Type production reminders..."
                                rows="3"
                            ></textarea>
                            <div className="mt-4 flex items-center justify-between">
                                <span className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                                    <span className="material-icons text-[12px]">visibility_off</span> Visible: Admins Only
                                </span>
                                <button
                                    onClick={() => { alert('Note saved!'); setNote(''); }}
                                    className="text-xs font-black text-[#1152d4] px-4 py-2 hover:bg-[#1152d4]/5 rounded-lg transition-colors border border-[#1152d4]/20 uppercase tracking-widest"
                                >
                                    Post Note
                                </button>
                            </div>
                        </div>

                        {/* Production Workflow */}
                        <div className="bg-slate-900 dark:bg-black rounded-xl shadow-2xl p-6 text-white overflow-hidden relative group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#1152d4] blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
                            <h3 className="font-black text-xs uppercase tracking-[0.2em] text-slate-500 mb-6 relative z-10">Production Workflow</h3>
                            <div className="space-y-4 relative z-10">
                                <button className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] border border-white/5 font-bold">
                                    <span className="material-icons">print</span>
                                    <span className="text-sm">Send to Printer Fleet</span>
                                </button>
                                <button
                                    onClick={() => setIsQualityChecked(!isQualityChecked)}
                                    className={`w-full py-4 rounded-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] font-bold ${isQualityChecked ? 'bg-emerald-600 text-white' : 'bg-white text-slate-900 hover:bg-slate-100'
                                        }`}
                                >
                                    <span className="material-icons">{isQualityChecked ? 'verified' : 'check_circle'}</span>
                                    <span className="text-sm">{isQualityChecked ? 'Quality Checked' : 'Mark Quality Check OK'}</span>
                                </button>
                            </div>
                            <p className="mt-6 text-[10px] text-center text-slate-500 font-medium">Last active interaction: 12 mins ago by Admin_01</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- MOBILE STICKY ACTION BAR --- */}
            <div className="fixed bottom-0 left-0 w-full lg:hidden bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-700 p-4 flex gap-3 z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
                <button className="flex-1 py-4 bg-[#1152d4] text-white font-black text-sm rounded-xl shadow-lg active:scale-[0.97] transition-transform">
                    UPDATE ORDER STATUS
                </button>
                <button className="w-14 h-14 bg-slate-100 dark:bg-slate-700 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-300">
                    <span className="material-icons">more_vert</span>
                </button>
            </div>
        </div>
    );
};

export default AdminOrderDetails;