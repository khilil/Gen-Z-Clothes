export default function BasicInfoSection({ name, setName, desc, setDesc }) {
    return (
        <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-primary/5 shadow-sm">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2 dark:text-white">
                <span className="material-icons text-primary text-xl">info</span>
                Basic Information
            </h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                        Product Name
                    </label>
                    <input
                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg focus:ring-2 focus:ring-primary/40 p-2.5 dark:text-slate-200 transition-all"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                        Description
                    </label>
                    <div className="border border-slate-100 dark:border-slate-800 rounded-lg overflow-hidden">
                        {/* Toolbar UI */}
                        <div className="bg-slate-50 dark:bg-slate-800 border-b border-slate-100 dark:border-slate-800 p-2 flex gap-2">
                            <button className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded transition-colors">
                                <span className="material-icons text-sm text-slate-500">format_bold</span>
                            </button>
                            <button className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded transition-colors">
                                <span className="material-icons text-sm text-slate-500">format_italic</span>
                            </button>
                            <button className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded transition-colors">
                                <span className="material-icons text-sm text-slate-500">list</span>
                            </button>
                            <button className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded transition-colors">
                                <span className="material-icons text-sm text-slate-500">link</span>
                            </button>
                        </div>
                        <textarea
                            className="w-full bg-transparent border-none focus:ring-0 p-3 text-sm dark:text-slate-300 min-h-[120px]"
                            rows="4"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}