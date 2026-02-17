// SkuTable.jsx
export function SkuTable({ skus }) {
    return (
        <div className="mt-8">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">Generated SKUs</h3>
            <div className="overflow-x-auto border border-slate-100 dark:border-slate-800 rounded-xl">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                        <tr>
                            <th className="px-4 py-3 font-semibold">Variant</th>
                            <th className="px-4 py-3 font-semibold">Color</th>
                            <th className="px-4 py-3 font-semibold">Size</th>
                            <th className="px-4 py-3 font-semibold">Generated SKU</th>
                            <th className="px-4 py-3 text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {skus.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                <td className="px-4 py-3 font-medium dark:text-slate-200">{item.id}</td>
                                <td className="px-4 py-3 dark:text-slate-400">{item.color}</td>
                                <td className="px-4 py-3 dark:text-slate-400">{item.size}</td>
                                <td className="px-4 py-3">
                                    <code className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-primary">{item.sku}</code>
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <span className="w-2 h-2 inline-block rounded-full bg-emerald-500"></span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}