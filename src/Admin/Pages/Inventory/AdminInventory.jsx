import React, { useState } from 'react';

const Inventory = () => {
  // --- State Management ---
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sizeFilter, setSizeFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Modal Form State
  const [adjustmentType, setAdjustmentType] = useState('Add'); // Add, Subtract, Set
  const [quantity, setQuantity] = useState(0);
  const [note, setNote] = useState('');

  // --- Hardcoded Data ---
  const inventoryData = [
    { id: 'SKU-TSH-WHT-L', name: "Men's Essential Tee", color: 'White', hex: '#ffffff', size: 'L', stock: 45, status: 'In Stock' },
    { id: 'SKU-TSH-NVY-M', name: "Classic V-Neck", color: 'Navy Blue', hex: '#1e3a8a', size: 'M', stock: 8, status: 'Low Stock' },
    { id: 'SKU-TSH-BLK-XL', name: "Premium Cotton Crew", color: 'Midnight Black', hex: '#000000', size: 'XL', stock: 0, status: 'Out of Stock' },
    { id: 'SKU-TSH-GRY-S', name: "Heather Sport Tee", color: 'Heather Grey', hex: '#94a3b8', size: 'S', stock: 124, status: 'In Stock' },
    { id: 'SKU-TSH-RED-L', name: "Graphic Series Tee", color: 'Crimson Red', hex: '#ef4444', size: 'L', stock: 12, status: 'Low Stock' },
  ];

  // --- Handlers ---
  const openUpdateModal = (product) => {
    setSelectedProduct(product);
    setQuantity(0);
    setNote('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <main className="p-4 md:p-8 bg-background-light dark:bg-background-dark min-h-screen transition-colors duration-300">
      
      {/* 📌 MAIN HEADER */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight dark:text-white">Inventory Stock Management</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage and monitor warehouse T-shirt stock by SKU.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors dark:text-slate-200">
            <span className="material-icons-round text-sm">file_download</span>
            Export CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium shadow-lg shadow-primary/20 hover:bg-opacity-90 transition-all">
            <span className="material-icons-round text-sm">add</span>
            New SKU
          </button>
        </div>
      </header>

      {/* 📊 METRICS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard icon="inventory_2" label="Total SKUs" value="1,240" trend="+4.2%" color="primary" />
        <MetricCard icon="warning" label="Low Stock Alerts" value="12" color="orange" isAlert />
        <MetricCard icon="error_outline" label="Out of Stock" value="3" color="red" isAlert />
        <MetricCard icon="update" label="Last 24h Updates" value="158" color="blue" />
      </div>

      {/* 📋 INVENTORY TABLE SECTION */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        
        {/* Controls Bar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input 
              type="text"
              placeholder="Search by SKU, Color, or Size..."
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm transition-all dark:text-slate-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <select 
              className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none dark:text-slate-300"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>Status: All</option>
              <option>In Stock</option>
              <option>Low Stock</option>
              <option>Out of Stock</option>
            </select>
            <select 
              className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none dark:text-slate-300"
              value={sizeFilter}
              onChange={(e) => setSizeFilter(e.target.value)}
            >
              <option>Size: All</option>
              <option>S</option><option>M</option><option>L</option><option>XL</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-6 py-4">SKU ID</th>
                <th className="px-6 py-4">Product Name</th>
                <th className="px-6 py-4">Color</th>
                <th className="px-6 py-4">Size</th>
                <th className="px-6 py-4">Available Stock</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {inventoryData.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                  <td className="px-6 py-4 font-mono text-sm font-semibold dark:text-slate-300">{item.id}</td>
                  <td className="px-6 py-4 text-sm dark:text-slate-400">{item.name}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm dark:text-slate-400">
                      <span className="w-3 h-3 rounded-full border border-slate-200" style={{ backgroundColor: item.hex }}></span>
                      {item.color}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm dark:text-slate-400">{item.size}</td>
                  <td className="px-6 py-4 text-sm font-medium dark:text-slate-200">{item.stock} units</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => openUpdateModal(item)}
                      className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                    >
                      <span className="material-icons-round text-lg leading-none">edit_note</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 📌 PAGINATION */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs font-medium text-slate-500">Showing 1-5 of 1,240 SKUs</span>
          <div className="flex gap-1">
            <PaginationButton label="Previous" />
            <PaginationButton label="1" active />
            <PaginationButton label="2" />
            <PaginationButton label="3" />
            <PaginationButton label="Next" />
          </div>
        </div>
      </div>

      {/* 🪟 STOCK UPDATE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold dark:text-white">Update Stock</h3>
                <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                  <span className="material-icons-round">close</span>
                </button>
              </div>
              <p className="text-sm text-slate-500 mt-1">Adjust inventory for <span className="font-mono font-bold text-primary">{selectedProduct?.id}</span></p>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-between border border-slate-100 dark:border-slate-700">
                <span className="text-sm text-slate-500">Current Stock</span>
                <span className="text-xl font-bold dark:text-white">{selectedProduct?.stock} Units</span>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 dark:text-slate-300">Adjustment Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Add', 'Subtract', 'Set Fixed'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setAdjustmentType(type)}
                      className={`py-2 rounded-lg text-sm font-medium transition-all ${
                        adjustmentType === type 
                        ? 'bg-primary text-white shadow-md' 
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 dark:text-slate-300">Quantity</label>
                <input 
                  type="number"
                  className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all dark:text-white"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 dark:text-slate-300">Reason / Note</label>
                <textarea 
                  className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary outline-none h-24 transition-all dark:text-white"
                  placeholder="e.g. Restock from vendor"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
            </div>

            <div className="p-6 bg-slate-50 dark:bg-slate-800/50 flex gap-3">
              <button onClick={closeModal} className="flex-1 px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors dark:text-slate-300">
                Cancel
              </button>
              <button className="flex-1 px-4 py-3 bg-primary text-white rounded-lg font-semibold shadow-lg shadow-primary/20 hover:opacity-90 transition-all active:scale-95">
                Confirm Update
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

// --- Sub-Components (Internal) ---

const MetricCard = ({ icon, label, value, trend, color, isAlert }) => {
  const colorClasses = {
    primary: "bg-primary/10 text-primary",
    orange: "bg-orange-100 text-orange-600",
    red: "bg-red-100 text-red-600",
    blue: "bg-blue-100 text-blue-600"
  };

  return (
    <div className={`bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:-translate-y-1 ${isAlert ? `border-l-4 ${label.includes('Low') ? 'border-l-orange-500' : 'border-l-red-500'}` : ''}`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          <span className="material-icons-round">{icon}</span>
        </div>
        {trend && <span className="text-xs font-semibold text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">{trend}</span>}
      </div>
      <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{label}</p>
      <h3 className={`text-2xl font-bold mt-1 dark:text-white ${color === 'red' ? 'text-red-600' : color === 'orange' ? 'text-orange-600' : ''}`}>{value}</h3>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    'In Stock': "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    'Low Stock': "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
    'Out of Stock': "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
      {status}
    </span>
  );
};

const PaginationButton = ({ label, active }) => (
  <button className={`px-3 py-1 rounded-md text-sm transition-colors ${
    active 
    ? 'bg-primary text-white shadow-md shadow-primary/20' 
    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
  }`}>
    {label}
  </button>
);

export default Inventory;