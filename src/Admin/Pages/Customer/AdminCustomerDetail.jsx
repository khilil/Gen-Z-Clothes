import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

/**
 * AdminCustomerDetail Component
 * Recreates a full Detailed Customer Profile page.
 */
const AdminCustomerDetail = () => {
    const { customerId } = useParams();
    const navigate = useNavigate();

    // --- STATE ---
    const [currentPage, setCurrentPage] = useState(1);
    
    // Mock Customer Data
    const [customer] = useState({
        id: customerId || 'CUST-1024',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (234) 567-890',
        joinedDate: 'October 12, 2023',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
        status: 'VIP Customer',
        address: {
            line1: '123 Creative Studio Way',
            line2: 'Design District, Apt 4B',
            city: 'San Francisco',
            state: 'CA',
            zip: '94103',
            country: 'United States'
        },
        stats: {
            totalSpent: 1240.00,
            growth: '+12%',
            totalOrders: 15,
            avgValue: 82.67
        },
        notes: "Prefer heavy cotton fabrics. Size Large. Always uses express shipping. Interested in limited edition seasonal drops."
    });

    // Mock Order History
    const [orders] = useState([
        { id: 'TS-98231', date: 'Jan 14, 2024', amount: 124.50, status: 'Delivered' },
        { id: 'TS-98115', date: 'Dec 28, 2023', amount: 45.00, status: 'Shipped' },
        { id: 'TS-97842', date: 'Dec 12, 2023', amount: 210.30, status: 'Processing' },
        { id: 'TS-97550', date: 'Nov 22, 2023', amount: 89.99, status: 'Delivered' },
        { id: 'TS-97102', date: 'Nov 05, 2023', amount: 64.20, status: 'Cancelled' },
    ]);

    const getStatusBadge = (status) => {
        const styles = {
            Delivered: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
            Shipped: 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
            Processing: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
            Cancelled: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
        };
        return styles[status] || styles.Cancelled;
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#101622] text-slate-900 dark:text-slate-100 transition-colors">
            <main className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 py-8">
                
                {/* --- TOP SECTION: Breadcrumb + Actions --- */}
                <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                    <div>
                        <nav className="mb-2 flex items-center gap-2 text-sm text-slate-500">
                            <button 
                                onClick={() => navigate('/admin/customers')}
                                className="hover:text-[#1152d4] transition-colors"
                            >
                                Customers
                            </button>
                            <span className="material-icons text-sm">chevron_right</span>
                            <span className="font-medium text-slate-900 dark:text-slate-200">{customer.name}</span>
                        </nav>
                        <h1 className="text-3xl font-extrabold tracking-tight">Customer Profile</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm font-bold shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                            <span className="material-icons text-[20px]">edit</span>
                            Edit Profile
                        </button>
                        <button className="flex items-center gap-2 rounded-lg bg-[#1152d4] px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#1152d4]/20 hover:bg-[#1152d4]/90 transition-all">
                            <span className="material-icons text-[20px]">mail</span>
                            Send Email
                        </button>
                    </div>
                </div>

                {/* --- MAIN LAYOUT GRID --- */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    
                    {/* LEFT COLUMN */}
                    <aside className="lg:col-span-4 flex flex-col gap-6">
                        {/* Summary Card */}
                        <section className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
                            <div className="mb-6 flex flex-col items-center text-center">
                                <img 
                                    src={customer.avatar} 
                                    alt={customer.name}
                                    className="mb-4 h-32 w-32 rounded-full border-4 border-white dark:border-slate-800 shadow-md ring-1 ring-slate-200 dark:ring-slate-700 object-cover"
                                />
                                <h3 className="text-xl font-bold">{customer.name}</h3>
                                <span className="mt-2 rounded-full bg-[#1152d4]/10 px-3 py-1 text-xs font-bold text-[#1152d4] uppercase tracking-wider">
                                    {customer.status}
                                </span>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <span className="material-icons text-slate-400">email</span>
                                    <div>
                                        <p className="text-xs font-semibold text-slate-500 uppercase">Email Address</p>
                                        <p className="text-sm font-medium">{customer.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="material-icons text-slate-400">call</span>
                                    <div>
                                        <p className="text-xs font-semibold text-slate-500 uppercase">Phone Number</p>
                                        <p className="text-sm font-medium">{customer.phone}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="material-icons text-slate-400">calendar_today</span>
                                    <div>
                                        <p className="text-xs font-semibold text-slate-500 uppercase">Joined Date</p>
                                        <p className="text-sm font-medium">{customer.joinedDate}</p>
                                    </div>
                                </div>
                                
                                <div className="mt-6 border-t border-slate-100 dark:border-slate-800 pt-6">
                                    <div className="flex items-start gap-3">
                                        <span className="material-icons text-slate-400">location_on</span>
                                        <div>
                                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-tighter">Primary Shipping Address</p>
                                            <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                                                {customer.address.line1}<br/>
                                                {customer.address.line2}<br/>
                                                {customer.address.city}, {customer.address.state} {customer.address.zip}<br/>
                                                {customer.address.country}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Admin Notes */}
                        <section className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
                            <div className="mb-4 flex items-center justify-between">
                                <h4 className="text-sm font-bold">Internal Admin Notes</h4>
                                <button className="text-[#1152d4] text-xs font-bold hover:underline">Edit</button>
                            </div>
                            <div className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-4 border border-slate-100 dark:border-slate-800">
                                <p className="text-sm italic leading-relaxed text-slate-600 dark:text-slate-400">
                                    "{customer.notes}"
                                </p>
                            </div>
                        </section>
                    </aside>

                    {/* RIGHT COLUMN */}
                    <div className="lg:col-span-8 flex flex-col gap-8">
                        
                        {/* Lifetime Statistics */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-md transition-shadow group">
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Spent</p>
                                <div className="mt-2 flex items-baseline gap-2">
                                    <span className="text-2xl font-black text-[#1152d4] tracking-tight">${customer.stats.totalSpent.toFixed(2)}</span>
                                    <span className="text-xs font-bold text-emerald-600">{customer.stats.growth}</span>
                                </div>
                            </div>
                            <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-md transition-shadow">
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Orders</p>
                                <div className="mt-2">
                                    <span className="text-2xl font-black tracking-tight">{customer.stats.totalOrders}</span>
                                    <span className="ml-1 text-sm text-slate-500 font-medium uppercase tracking-tighter">orders</span>
                                </div>
                            </div>
                            <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-md transition-shadow">
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Avg. Order Value</p>
                                <div className="mt-2">
                                    <span className="text-2xl font-black tracking-tight">${customer.stats.avgValue.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Order History Table */}
                        <section className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
                            <div className="border-b border-slate-100 dark:border-slate-800 px-6 py-4">
                                <h3 className="text-lg font-bold">Order History</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-slate-50 dark:bg-slate-800/50 text-xs font-bold uppercase tracking-wider text-slate-500">
                                            <th className="px-6 py-4">Order ID</th>
                                            <th className="px-6 py-4">Date</th>
                                            <th className="px-6 py-4">Amount</th>
                                            <th className="px-6 py-4 text-center">Status</th>
                                            <th className="px-6 py-4"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm tabular-nums">
                                        {orders.map((order) => (
                                            <tr 
                                                key={order.id} 
                                                className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group"
                                                onClick={() => navigate(`/admin/orders/${order.id}`)}
                                            >
                                                <td className="px-6 py-4 font-bold text-[#1152d4] group-hover:underline">#{order.id}</td>
                                                <td className="px-6 py-4 text-slate-600 dark:text-slate-400 font-medium">{order.date}</td>
                                                <td className="px-6 py-4 font-bold">${order.amount.toFixed(2)}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex justify-center">
                                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${getStatusBadge(order.status)}`}>
                                                            {order.status}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button className="text-slate-400 hover:text-[#1152d4] transition-colors p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700">
                                                        <span className="material-icons">more_vert</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Table Pagination */}
                            <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-4">
                                <p className="text-xs font-bold uppercase tracking-tighter text-slate-500">
                                    Showing <span className="text-slate-900 dark:text-white">1</span> to <span className="text-slate-900 dark:text-white">5</span> of <span className="text-slate-900 dark:text-white">15</span> orders
                                </p>
                                <div className="flex gap-1.5">
                                    <button className="rounded-lg border border-slate-200 dark:border-slate-800 p-2 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-30 transition-all">
                                        <span className="material-icons text-sm leading-none">chevron_left</span>
                                    </button>
                                    <button className={`rounded-lg px-3 py-1 text-xs font-black shadow-sm ${currentPage === 1 ? 'bg-[#1152d4]/10 text-[#1152d4] ring-1 ring-[#1152d4]/20' : 'text-slate-500'}`}>
                                        1
                                    </button>
                                    <button className="rounded-lg px-3 py-1 text-xs font-bold text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                                        2
                                    </button>
                                    <button className="rounded-lg px-3 py-1 text-xs font-bold text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                                        3
                                    </button>
                                    <button className="rounded-lg border border-slate-200 dark:border-slate-800 p-2 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                                        <span className="material-icons text-sm leading-none">chevron_right</span>
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminCustomerDetail;