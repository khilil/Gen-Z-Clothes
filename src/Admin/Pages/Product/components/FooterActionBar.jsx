export default function FooterActionBar() {
    return (
        <footer className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-primary/10 px-6 py-4 z-40 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)] transition-colors">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Sync & History Indicators */}
                <div className="hidden md:flex items-center gap-6 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1.5 uppercase tracking-wider">
                        <span className="material-icons text-sm opacity-70">history</span>
                        Last saved 2m ago
                    </span>
                    <span className="flex items-center gap-1.5 uppercase tracking-wider text-emerald-500">
                        <span className="material-icons text-sm">cloud_done</span>
                        All changes synced
                    </span>
                </div>

                {/* Main Action Button */}
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <button className="flex-1 md:flex-none px-6 py-2.5 text-sm font-bold bg-primary text-white rounded-lg hover:shadow-xl hover:shadow-primary/30 transition-all flex items-center justify-center gap-2 active:scale-95">
                        <span className="material-icons text-sm">auto_fix_high</span>
                        Regenerate All SKUs
                    </button>
                </div>
            </div>
        </footer>
    );
}