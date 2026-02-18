import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * AdminOrders Component
 * Updated with React Router Links for navigation to Order Details.
 */
const AdminOrders = () => {
    // --- STATE ---
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('All Orders');
    const [selectedRows, setSelectedRows] = useState([]);

    // --- STATIC DATA ---
    const stats = [
        { label: 'Pending Orders', value: '42', trend: '+12%', icon: 'hourglass_empty', color: 'blue' },
        { label: 'In Printing', value: '18', trend: '+8%', icon: 'print', color: 'amber' },
        { label: 'Shipped Today', value: '156', trend: 'Stable', icon: 'local_shipping', color: 'green' },
        { label: 'Failed / Hold', value: '5', trend: '3 flagged', icon: 'error_outline', color: 'red' },
    ];

    const ordersData = [
        { id: 'ORD-12845', customer: 'Sarah Jenkins', email: 'sarah.j@example.com', date: 'Oct 24, 2026', payment: 'Paid', status: 'Printing', total: '$89.00', img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop' },
        { id: 'ORD-12844', customer: 'Marcus Miller', email: 'm.miller@corp.com', date: 'Oct 24, 2026', payment: 'Pending', status: 'Queued', total: '$124.50', img: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=100&h=100&fit=crop' },
        { id: 'ORD-12840', customer: 'Elena Rodriguez', email: 'elena.rod@webmail.com', date: 'Oct 23, 2026', payment: 'Paid', status: 'Shipped', total: '$45.00', img: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=100&h=100&fit=crop' },
        { id: 'ORD-12838', customer: 'David Kim', email: 'dkim.designs@studio.co', date: 'Oct 23, 2026', payment: 'Paid', status: 'Hold', total: '$210.00', img: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=100&h=100&fit=crop' },
        { id: 'ORD-12835', customer: 'Julia Chen', email: 'j.chen@design.io', date: 'Oct 22, 2026', payment: 'Paid', status: 'Printing', total: '$67.20', img: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=100&h=100&fit=crop' },
    ];

    const tabs = ['All Orders', 'Pending', 'Printing', 'Shipped', 'Cancelled'];

    // --- LOGIC ---
    const toggleSelectAll = () => {
        if (selectedRows.length === ordersData.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(ordersData.map((o) => o.id));
        }
    };

    const toggleSelectRow = (id) => {
        setSelectedRows((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const getStatusStyles = (status) => {
        switch (status) {
            case 'Paid': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
            case 'Pending': case 'Queued': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
            case 'Printing': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
            case 'Shipped': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
            case 'Hold': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
            default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#101622] text-slate-900 dark:text-slate-100 p-4 md:p-8 transition-colors duration-200">

            {/* --- HEADER SECTION --- */}
            <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Orders Fulfillment Overview</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Manage and track custom T-shirt orders in real-time.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative group">
                        <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg group-focus-within:text-[#1152d4]">search</span>
                        <input
                            type="text"
                            placeholder="Search orders..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1152d4]/20 focus:border-[#1152d4] w-full md:w-64 text-sm transition-all"
                        />
                    </div>
                    <button className="bg-[#1152d4] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#1152d4]/90 transition-colors flex items-center gap-2 shadow-sm whitespace-nowrap">
                        <span className="material-icons text-lg">add</span> New Order
                    </button>
                </div>
            </header>

            {/* --- SUMMARY STATS --- */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-2 rounded-lg ${stat.color === 'blue' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30' :
                                    stat.color === 'amber' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30' :
                                        stat.color === 'green' ? 'bg-green-100 text-green-600 dark:bg-green-900/30' :
                                            'bg-red-100 text-red-600 dark:bg-red-900/30'
                                }`}>
                                <span className="material-icons">{stat.icon}</span>
                            </div>
                            <span className={`text-xs font-semibold flex items-center ${stat.trend.includes('+') ? 'text-green-500' : 'text-slate-400'}`}>
                                {stat.trend.includes('+') && <span className="material-icons text-xs">arrow_upward</span>} {stat.trend}
                            </span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mb-1 font-medium">{stat.label}</p>
                        <h3 className="text-2xl font-bold">{stat.value}</h3>
                    </div>
                ))}
            </section>

            {/* --- ORDERS TABLE SECTION --- */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">

                {/* Tabs */}
                <div className="flex border-b border-slate-200 dark:border-slate-800 px-6 overflow-x-auto no-scrollbar">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-4 border-b-2 text-sm whitespace-nowrap transition-colors duration-200 font-medium ${activeTab === tab
                                    ? 'border-[#1152d4] text-[#1152d4] font-semibold'
                                    : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                                }`}
                        >
                            {tab} {tab === 'All Orders' ? '(240)' : ''}
                        </button>
                    ))}
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800/30 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-semibold">
                                <th className="px-6 py-4">
                                    <input
                                        type="checkbox"
                                        className="rounded border-slate-300 text-[#1152d4] focus:ring-[#1152d4] dark:bg-slate-800 dark:border-slate-700"
                                        onChange={toggleSelectAll}
                                        checked={selectedRows.length === ordersData.length}
                                    />
                                </th>
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Design</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Total</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                            {ordersData.map((order) => (
                                <tr key={order.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <input
                                            type="checkbox"
                                            className="rounded border-slate-300 text-[#1152d4] focus:ring-[#1152d4] dark:bg-slate-800 dark:border-slate-700"
                                            checked={selectedRows.includes(order.id)}
                                            onChange={() => toggleSelectRow(order.id)}
                                        />
                                    </td>
                                    {/* Order ID clickable Link */}
                                    <td className="px-6 py-4 font-bold text-[#1152d4]">
                                        <Link to={`/admin/orders/${order.id}`} className="hover:underline flex items-center gap-1">
                                            #{order.id}
                                            <span className="material-icons text-[14px] opacity-0 group-hover:opacity-100 transition-opacity">open_in_new</span>
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-sm">{order.customer}</span>
                                            <span className="text-xs text-slate-500">{order.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm">
                                            <img src={order.img} alt="Design" className="w-full h-full object-cover" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-500">{order.date}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${getStatusStyles(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-sm">{order.total}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <Link
                                                to={`/admin/orders/${order.id}`}
                                                className="p-2 hover:bg-[#1152d4]/10 hover:text-[#1152d4] rounded-lg text-slate-400 transition-all"
                                                title="View Details"
                                            >
                                                <span className="material-icons text-xl">visibility</span>
                                            </Link>
                                            <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 transition-all" title="Print Invoice">
                                                <span className="material-icons text-xl">receipt</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 flex flex-col sm:flex-row items-center justify-between border-t border-slate-200 dark:border-slate-800 gap-4 bg-slate-50/30 dark:bg-transparent">
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-widest">
                        Page <span className="text-slate-900 dark:text-white">1</span> of 24
                    </p>
                    <div className="flex items-center gap-2">
                        <button className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold text-slate-400 cursor-not-allowed uppercase">Prev</button>
                        <button className="px-4 py-2 bg-[#1152d4] text-white rounded-lg text-xs font-bold uppercase shadow-md shadow-[#1152d4]/20">1</button>
                        <button className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 uppercase transition-all">2</button>
                        <button className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 uppercase transition-all">Next</button>
                    </div>
                </div>
            </div>

            {/* --- RECOMMENDATION BANNERS --- */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-[#1152d4] to-blue-600 rounded-2xl p-6 text-white shadow-xl shadow-blue-500/20 relative overflow-hidden group">
                    <span className="material-icons absolute -right-4 -bottom-4 text-9xl opacity-10 group-hover:scale-110 transition-transform">auto_awesome</span>
                    <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                        <span className="material-icons text-sm">tips_and_updates</span> Smart Batching
                    </h4>
                    <p className="text-blue-100 text-sm mb-4 max-w-md">12 pending orders detected with same fabric & color. Process them together to save 20 mins.</p>
                    <button className="bg-white text-[#1152d4] px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-blue-50 transition-colors">Start Batch</button>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <h4 className="font-bold mb-4 flex items-center gap-2">
                        <span className="material-icons text-amber-500">warning</span> Urgent Attention
                    </h4>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-xl">
                            <span className="text-xs font-bold text-red-600 dark:text-red-400">#ORD-12838: Low Res Design File</span>
                            <button className="text-[10px] font-black uppercase text-red-600 hover:underline">Fix Now</button>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                            <span className="text-xs font-bold text-slate-600 dark:text-slate-400 font-mono">Stock Alert: Blue XL T-Shirts (4 left)</span>
                            <button className="text-[10px] font-black uppercase text-[#1152d4] hover:underline">Restock</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminOrders;