import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * AdminCustomers Component
 * A comprehensive customer management dashboard.
 * Built as a single component with React hooks and Tailwind CSS.
 */
const AdminCustomers = () => {
    const navigate = useNavigate();

    // --- STATE ---
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    // --- STATIC DATA ---
    const [customers] = useState([
        { id: '1', name: 'Alex Rivera', email: 'alex@example.com', location: 'New York, NY', orders: 12, spent: 1200.00, lastOrder: 'Oct 24, 2023', status: 'Active', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
        { id: '2', name: 'Jordan Smith', email: 'j.smith@web.com', location: 'Austin, TX', orders: 5, spent: 450.00, lastOrder: 'Oct 20, 2023', status: 'Active', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
        { id: '3', name: 'Taylor Wong', email: 'taylorw@mail.com', location: 'Seattle, WA', orders: 1, spent: 85.00, lastOrder: 'Sep 15, 2023', status: 'Inactive', img: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop' },
        { id: '4', name: 'Morgan Lee', email: 'mlee@design.io', location: 'Chicago, IL', orders: 8, spent: 920.00, lastOrder: 'Oct 22, 2023', status: 'Active', img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop' },
        { id: '5', name: 'Casey Brown', email: 'casey.b@firm.com', location: 'Miami, FL', orders: 3, spent: 310.00, lastOrder: 'Aug 30, 2023', status: 'Inactive', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop' },
    ]);

    const kpis = [
        { label: 'Total Customers', value: '1,248', trend: '+12%', icon: 'group', color: 'emerald' },
        { label: 'New Customers (30d)', value: '156', trend: '+8%', icon: 'person_add', color: 'emerald' },
        { label: 'Avg. Lifetime Value', value: '$842.50', trend: '-2%', icon: 'payments', color: 'rose' },
    ];

    // --- LOGIC ---
    const filteredCustomers = useMemo(() => {
        return customers.filter(customer => 
            customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.location.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, customers]);

    const handleViewProfile = (id) => {
        navigate(`/admin/customers/${id}`);
    };

    return (
        <div className="flex-1 flex flex-col min-h-screen bg-slate-50 dark:bg-[#101622] font-sans">
            
            {/* --- HEADER SECTION --- */}
            {/* <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between px-4 md:px-8 sticky top-0 z-10">
                <div className="max-w-md w-full relative group">
                    <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px] group-focus-within:text-[#1152d4] transition-colors">search</span>
                    <input 
                        type="text" 
                        placeholder="Search customers, emails, or orders..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#1152d4] dark:text-white transition-all outline-none"
                    />
                </div>
                
                <div className="flex items-center gap-2 md:gap-4">
                    <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors relative">
                        <span className="material-icons">notifications</span>
                        <span className="absolute top-2.5 right-2.5 size-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
                    </button>
                    <div className="h-8 w-px bg-slate-200 dark:bg-slate-800"></div>
                    <div className="flex items-center gap-3">
                        <div className="text-right hidden sm:block">
                            <p className="text-xs font-bold leading-none dark:text-white">Admin User</p>
                            <p className="text-[10px] text-slate-500 uppercase tracking-tighter">Super Admin</p>
                        </div>
                        <img 
                            className="size-9 rounded-full object-cover border border-slate-200 dark:border-slate-700" 
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" 
                            alt="Admin" 
                        />
                    </div>
                </div>
            </header> */}   

            <div className="p-4 md:p-8 space-y-8 max-w-[1600px] mx-auto w-full">
                
                {/* --- PAGE TITLE --- */}
                <div>
                    <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Customers</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Manage your customer base and their lifetime value</p>
                </div>

                {/* --- KPI CARDS --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {kpis.map((kpi, idx) => (
                        <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 group-hover:bg-[#1152d4]/10 transition-colors">
                                    <span className="material-icons text-[#1152d4]">{kpi.icon}</span>
                                </div>
                                <span className={`flex items-center px-2 py-1 rounded-lg text-xs font-bold ${
                                    kpi.trend.startsWith('+') 
                                    ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10' 
                                    : 'text-rose-600 bg-rose-50 dark:bg-rose-500/10'
                                }`}>
                                    {kpi.trend} 
                                    <span className="material-icons text-[14px] ml-1">
                                        {kpi.trend.startsWith('+') ? 'trending_up' : 'trending_down'}
                                    </span>
                                </span>
                            </div>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{kpi.label}</p>
                            <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{kpi.value}</p>
                        </div>
                    ))}
                </div>

                {/* --- CUSTOMERS TABLE --- */}
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[800px]">
                            <thead>
                                <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Customer</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Location</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Total Orders</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Total Spent</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Last Order</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                                {filteredCustomers.map((customer) => (
                                    <tr key={customer.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img className="size-10 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-800" src={customer.img} alt={customer.name} />
                                                <div>
                                                    <p className="text-sm font-bold text-slate-900 dark:text-white">{customer.name}</p>
                                                    <p className="text-xs text-slate-500 font-medium">{customer.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 font-medium">{customer.location}</td>
                                        <td className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">{customer.orders}</td>
                                        <td className="px-6 py-4 text-sm font-black text-slate-900 dark:text-white">${customer.spent.toFixed(2)}</td>
                                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{customer.lastOrder}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                                customer.status === 'Active' 
                                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' 
                                                : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-500'
                                            }`}>
                                                {customer.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button 
                                                onClick={() => handleViewProfile(customer.id)}
                                                className="px-4 py-1.5 text-xs font-bold text-[#1152d4] border border-[#1152d4]/30 rounded-lg hover:bg-[#1152d4] hover:text-white transition-all transform active:scale-95"
                                            >
                                                View Profile
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* --- PAGINATION FOOTER --- */}
                    <div className="px-6 py-4 bg-slate-50/50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-tight">
                            Showing <span className="text-slate-900 dark:text-white">1</span> to <span className="text-slate-900 dark:text-white">{filteredCustomers.length}</span> of <span className="text-slate-900 dark:text-white">1,248</span> customers
                        </p>
                        <div className="flex items-center gap-1.5">
                            <button className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 text-slate-400 transition-all disabled:opacity-30" disabled>
                                <span className="material-icons text-[20px]">chevron_left</span>
                            </button>
                            <button className="min-w-[32px] h-8 flex items-center justify-center text-xs font-black bg-[#1152d4] text-white rounded-lg shadow-sm">1</button>
                            <button className="min-w-[32px] h-8 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-all">2</button>
                            <button className="min-w-[32px] h-8 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-all">3</button>
                            <button className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 text-slate-500 transition-all">
                                <span className="material-icons text-[20px]">chevron_right</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminCustomers;