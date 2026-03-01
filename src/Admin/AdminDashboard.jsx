import React, { useState, useEffect } from 'react';
import {
  Package, ShoppingCart, BarChart3, AlertCircle,
  MoreHorizontal, Filter, CheckCircle2, Clock
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts';
import { getDashboardStats } from '../services/dashboardService';

// --- Sub-components ---
const KPICard = ({ title, value, trend, icon: Icon, color, chartData }) => (
  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:shadow-md transition-all group">

    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl ${color} bg-opacity-10 text-indigo-600 dark:text-indigo-400`}>
        <Icon size={22} />
      </div>

      <div className={`flex items-center gap-1 text-[12px] font-bold px-2 py-1 rounded-lg ${trend >= 0
        ? 'bg-emerald-50 text-emerald-600'
        : 'bg-rose-50 text-rose-600'
        }`}>
        {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
      </div>
    </div>

    <div>
      <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
        {title}
      </p>
      <h3 className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">
        {value}
      </h3>
    </div>

    {/* FIXED SECTION */}
    <div className="mt-4 opacity-50 group-hover:opacity-100 transition-opacity">
      <ResponsiveContainer width="100%" height={50}>
        <AreaChart data={chartData}>
          <Area
            type="monotone"
            dataKey="sales"
            stroke="#6366f1"
            fill="#818cf8"
            fillOpacity={0.1}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>

  </div>
);


const StatusBadge = ({ status }) => {
  const styles = {
    Shipped: "bg-emerald-50 text-emerald-600 border-emerald-100",
    Delivered: "bg-emerald-50 text-emerald-600 border-emerald-100",
    Processing: "bg-blue-50 text-blue-600 border-blue-100",
    Placed: "bg-amber-50 text-amber-600 border-amber-100",
    Cancelled: "bg-rose-50 text-rose-600 border-rose-100",
  };
  return <span className={`px-3 py-1 rounded-full text-[11px] font-bold border ${styles[status] || styles.Placed}`}>{status}</span>;
};

// --- Main Dashboard Component ---
export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [salesData, setSalesData] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [storeActivity, setStoreActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getDashboardStats();
        setStats(response.data.stats);
        setSalesData(response.data.salesData);
        setRecentOrders(response.data.recentOrders);
        setStoreActivity(response.data.storeActivity);
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
        setError("Failed to load dashboard statistics.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="size-12 border-4 border-[#1152d4] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Generating Dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-rose-50 border border-rose-100 rounded-xl p-8 text-center">
        <p className="text-rose-600 font-bold">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-[#1152d4] text-white rounded-lg font-bold"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">

      {/* 1. Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Total Sales" value={stats.totalSales} trend={12.5} icon={BarChart3} color="bg-indigo-500" chartData={salesData} />
        <KPICard title="Total Orders" value={stats.totalOrders} trend={8.2} icon={ShoppingCart} color="bg-blue-500" chartData={salesData} />
        <KPICard title="Active SKUs" value={stats.activeSKUs} trend={0} icon={Package} color="bg-purple-500" chartData={salesData} />
        <KPICard title="Low Stock" value={stats.lowStockItems} trend={0} icon={AlertCircle} color="bg-rose-500" chartData={salesData} />
      </div>

      {/* 2. Charts & Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h4 className="font-bold text-lg text-slate-900 dark:text-white">Revenue Growth</h4>
              <p className="text-sm text-slate-500">Weekly performance insights</p>
            </div>
            <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold">
              <button className="px-4 py-1.5 bg-white dark:bg-slate-700 shadow-sm rounded-lg">LAST 7 DAYS</button>
            </div>
          </div>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="sales" stroke="#6366f1" strokeWidth={3} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
          <h4 className="font-bold text-lg mb-6">Store Activity</h4>
          <div className="space-y-6">
            {storeActivity.length > 0 ? storeActivity.map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <div className={`w-10 h-10 shrink-0 rounded-full ${item.bg} ${item.color} flex items-center justify-center`}>
                  <CheckCircle2 size={18} />
                </div>
                <div className="flex-1 border-b border-slate-50 dark:border-slate-800 pb-4">
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{item.text}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{item.time}</p>
                </div>
              </div>
            )) : (
              <p className="text-sm text-slate-500 italic">No recent activity detected.</p>
            )}
          </div>
          <button className="w-full mt-6 py-3 text-sm font-bold text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors">
            View All Reports
          </button>
        </div>
      </div>

      {/* 3. Recent Orders Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between">
          <h4 className="font-bold text-lg">Recent Orders</h4>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-all">
            <Filter size={16} /> Filter
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em] bg-slate-50/50 dark:bg-slate-800/30">
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {recentOrders.length > 0 ? recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                  <td className="px-6 py-4 font-bold text-sm text-indigo-600">{order.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600 uppercase">{order.avatar}</div>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{order.fullName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{order.product}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">{order.amount}</td>
                  <td className="px-6 py-4"><StatusBadge status={order.status} /></td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-slate-500 italic">No recent orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
