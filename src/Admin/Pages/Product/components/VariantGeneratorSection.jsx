// VariantSection.jsx

import { SkuTable } from "./SkuTable";

export default function VariantSection({ selectedColors, setSelectedColors, selectedSizes, setSelectedSizes, generatedSkus }) {
    const allSizes = ['S', 'M', 'L', 'XL', 'XXL'];

    const toggleSize = (size) => {
        setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]);
    };

    return (
        <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-primary/5 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold flex items-center gap-2 dark:text-white">
                    <span className="material-icons text-primary">layers</span> Variants & SKU Generator
                </h2>
                <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">Auto-Generating</span>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-3">Selected Colors</label>
                    <div className="flex flex-wrap gap-3">
                        {selectedColors.map(color => (
                            <div key={color.code} className="flex items-center px-4 py-2 rounded-full border border-primary bg-primary/5 dark:bg-primary/10">
                                <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: color.hex }}></span>
                                <span className="text-sm font-medium dark:text-slate-200">{color.name}</span>
                            </div>
                        ))}
                        <button className="flex items-center px-4 py-2 rounded-full border border-dashed border-slate-300 dark:border-slate-600 text-slate-400 hover:text-primary transition-all">
                            <span className="material-icons text-sm mr-1">add</span> Add Color
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-3">Selected Sizes</label>
                    <div className="flex flex-wrap gap-3">
                        {allSizes.map(size => (
                            <button
                                key={size}
                                onClick={() => toggleSize(size)}
                                className={`min-w-[3rem] px-3 py-2 rounded-lg border transition-all font-semibold text-sm ${selectedSizes.includes(size)
                                        ? 'border-primary bg-primary text-white'
                                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                <SkuTable skus={generatedSkus} />
            </div>
        </section>
    );
}

