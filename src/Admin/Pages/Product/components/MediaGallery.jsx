export default function MediaGallery() {
    const dummyImages = [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAU51wE6zZ0Hx3qzoIWCfkL35OIX4HUdqyoxh4W9GypaIBUIzlDTrkCkVZNpXPSIgRo0YCSdCCG4MmPPMNZRMhQp-uQt_yAVaB5XJ_pCqzvhwRHxlIe6OvTPw6zKv9SEWiDmqqhoACxJXbYBLWNaI0VAg1HW6cKNVrQT-lBLHqjaQCjMQ89ocRYOSRxCHz5_SyhGd1VA4_PP4nedjzX1WezaHPhQolf4SANZRn5LCiA3eDWQC2wQlsrvYHwynnv-8mTKlIfsdCxvuo",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBhYRV5DMjKajwt4-Y8hgI6Nj9RvcElgYpfWduj9B-3WKC48OuXBk8PMdAIkLgFcnO73cjTrbrQlX2z2uaXwJ1llFzSUOLz2XZ13p84bpg4ScOx4YW6mJjPDeLomOyURaC29-TaAqvAC0n8eusDGAieiZf1-WISZSeaIdJARYWqo97WE0I-UzMjkOMJKlIebcesysdNisLgyAitloo-3y8A5dzzW0m9pQeMBfJmmKhHes5vBLWnj-jCmDb76RD4EKTk0rp7aB-Vh5w"
    ];

    return (
        <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-primary/5 shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest">
                    Media
                </h3>
                <button className="text-xs text-primary font-medium hover:underline">Manage</button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
                {dummyImages.map((img, idx) => (
                    <div key={idx} className="aspect-square rounded-lg overflow-hidden border border-slate-100 dark:border-slate-800 group relative">
                        <img
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            src={img}
                            alt="Product"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button className="p-1.5 bg-white rounded-full shadow-lg">
                                <span className="material-icons text-sm text-red-500">delete</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="border-2 border-dashed border-primary/20 rounded-lg p-6 text-center hover:bg-primary/5 transition-all cursor-pointer group">
                <span className="material-icons text-primary/40 text-3xl mb-2 group-hover:scale-110 transition-transform">
                    cloud_upload
                </span>
                <p className="text-xs text-slate-500 font-medium">
                    Click to upload or drag and drop
                </p>
            </div>
        </section>
    );
}