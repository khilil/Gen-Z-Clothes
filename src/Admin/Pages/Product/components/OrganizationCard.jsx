export default function OrganizationCard() {
    return (
        <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-primary/5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">
                Organization
            </h3>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                        Product Status
                    </label>
                    <div className="relative">
                        <select className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg focus:ring-2 focus:ring-primary/40 p-2.5 text-sm dark:text-slate-200 appearance-none cursor-pointer">
                            <option value="active">Active</option>
                            <option value="draft">Draft</option>
                            <option value="archived">Archived</option>
                        </select>
                        <span className="material-icons absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                            expand_more
                        </span>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1.5">
                        Category
                    </label>
                    <div className="relative">
                        <select className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-lg focus:ring-2 focus:ring-primary/40 p-2.5 text-sm dark:text-slate-200 appearance-none cursor-pointer">
                            <option>Apparel</option>
                            <option>T-Shirts</option>
                            <option>Accessories</option>
                        </select>
                        <span className="material-icons absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                            expand_more
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}