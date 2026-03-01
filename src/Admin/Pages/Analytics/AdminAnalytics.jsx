import React, { useState, useEffect } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import {
    TrendingUp, Users, ShoppingBag, DollarSign,
    ArrowUpRight, ArrowDownRight, Calendar, Filter
} from 'lucide-react';
import { getAnalyticsData } from '../../../services/analyticsService';

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316', '#eab308'];

const AdminAnalytics = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [timeRange, setTimeRange] = useState('30D');

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                setLoading(true);
                const response = await getAnalyticsData();
                setData(response.data);
            } catch (err) {
                console.error("Error fetching analytics:", err);
                setError("Failed to load analytics data.");
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[600px]">
                <div className="flex flex-col items-center gap-4">
                    <div className="size-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Crunching numbers...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-rose-50 border border-rose-100 rounded-2xl p-12 text-center max-w-2xl mx-auto mt-20">
                <div className="size-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Filter size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{error}</h3>
                <p className="text-slate-500 mb-8">We encountered an issue while fetching the latest performance metrics.</p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                >
                    Retry Fetch
                </button>
            </div>
        );
    }

    const { stats, revenueByDate, ordersByStatus, topCategories, customerGrowth, topProducts } = data;

    return (
        <div className="space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* --- HEADER --- */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Business Intelligence</h2>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Deep dive into your store's performance metrics.</p>
                </div>
                <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    {['7D', '30D', '90D', '12M'].map((range) => (
                        <button
                            key={range}
                            onClick={() => setTimeRange(range)}
                            className={`px-5 py-2 text-xs font-black rounded-xl transition-all ${timeRange === range
                                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-none'
                                    : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
                                }`}
                        >
                            {range}
                        </button>
                    ))}
                </div>
            </div>

            {/* --- KPI GRID --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KPICard title="Total Revenue" value={stats.totalRevenue} trend="+12.5%" icon={DollarSign} color="indigo" />
                <KPICard title="Total Orders" value={stats.totalOrders} trend="+8.2%" icon={ShoppingBag} color="emerald" />
                <KPICard title="Avg Order Value" value={stats.avgOrderValue} trend="-2.4%" icon={TrendingUp} color="violet" />
                <KPICard title="Conversion Rate" value={stats.conversionRate} trend="+0.5%" icon={Users} color="pink" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* --- REVENUE TREND (LINE CHART) --- */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h4 className="font-bold text-xl text-slate-900 dark:text-white">Revenue Analysis</h4>
                            <p className="text-sm text-slate-500">Daily financial performance for the selected period.</p>
                        </div>
                    </div>
                    <div className="h-[400px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueByDate}>
                                <defs>
                                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
                                />
                                <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* --- ORDER STATUS (PIE CHART) --- */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
                    <h4 className="font-bold text-xl mb-2">Order Fulfillment</h4>
                    <p className="text-sm text-slate-500 mb-8">Breakdown of order statuses.</p>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={ordersByStatus}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={8}
                                    dataKey="value"
                                >
                                    {ordersByStatus.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} cornerRadius={8} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="space-y-3 mt-4">
                        {ordersByStatus.map((status, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="size-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{status.name}</span>
                                </div>
                                <span className="text-sm font-bold text-slate-900 dark:text-white">{status.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* --- TOP CATEGORIES (BAR CHART) --- */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
                    <h4 className="font-bold text-xl mb-2">Category Performance</h4>
                    <p className="text-sm text-slate-500 mb-8">Revenue generation by product category.</p>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={topCategories} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700, fill: '#475569' }} width={100} />
                                <Tooltip cursor={{ fill: 'transparent' }} />
                                <Bar dataKey="revenue" fill="#6366f1" radius={[0, 8, 8, 0]} barSize={24} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* --- CUSTOMER GROWTH (LINE CHART) --- */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
                    <h4 className="font-bold text-xl mb-2">User Acquisition</h4>
                    <p className="text-sm text-slate-500 mb-8">Monthly new customer registrations.</p>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={customerGrowth}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                                <Tooltip />
                                <Line type="stepAfter" dataKey="customers" stroke="#ec4899" strokeWidth={4} dot={{ r: 6, fill: '#ec4899', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* --- TOP PRODUCTS TABLE --- */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
                <div className="p-8 border-b border-slate-50 dark:border-slate-800">
                    <h4 className="font-bold text-xl tracking-tight">Best Selling Products</h4>
                    <p className="text-sm text-slate-500 font-medium">Top performing products by generated revenue.</p>
                </div>
                <div className="overflow-x-auto text-sm">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 dark:bg-slate-800/50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                <th className="px-8 py-4">Rank</th>
                                <th className="px-8 py-4">Product Name</th>
                                <th className="px-8 py-4">Units Sold</th>
                                <th className="px-8 py-4">Total Revenue</th>
                                <th className="px-8 py-4 text-right">Performance</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                            {topProducts.map((product, idx) => (
                                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                                    <td className="px-8 py-5">
                                        <span className={`inline-flex items-center justify-center size-6 rounded-lg text-[10px] font-black ${idx === 0 ? 'bg-amber-100 text-amber-600' :
                                                idx === 1 ? 'bg-slate-100 text-slate-600' :
                                                    idx === 2 ? 'bg-orange-100 text-orange-600' : 'text-slate-400'
                                            }`}>
                                            #{idx + 1}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 font-bold text-slate-900 dark:text-white">{product.title}</td>
                                    <td className="px-8 py-5 text-slate-500 font-medium">{product.quantity}</td>
                                    <td className="px-8 py-5 font-black text-indigo-600 dark:text-indigo-400">${product.revenue.toLocaleString()}</td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                                            <ArrowUpRight size={12} />
                                            TRENDING
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const KPICard = ({ title, value, trend, icon: Icon, color }) => {
    const colorVariants = {
        indigo: 'text-indigo-600 bg-indigo-50 border-indigo-100 dark:bg-indigo-500/10 dark:border-indigo-500/20',
        emerald: 'text-emerald-600 bg-emerald-50 border-emerald-100 dark:bg-emerald-500/10 dark:border-emerald-500/20',
        violet: 'text-violet-600 bg-violet-50 border-violet-100 dark:bg-violet-500/10 dark:border-violet-500/20',
        pink: 'text-pink-600 bg-pink-50 border-pink-100 dark:bg-pink-500/10 dark:border-pink-500/20',
    };

    const isPositive = trend.startsWith('+');

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-6">
                <div className={`p-4 rounded-2xl ${colorVariants[color] || colorVariants.indigo} transition-transform group-hover:scale-110 duration-300`}>
                    <Icon size={24} strokeWidth={2.5} />
                </div>
                <div className={`flex items-center gap-0.5 text-[10px] font-black px-2 py-1 rounded-lg ${isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                    }`}>
                    {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {trend}
                </div>
            </div>
            <div>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-[0.1em] mb-1">{title}</p>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{value}</h3>
            </div>
        </div>
    );
};

export default AdminAnalytics;
