import React from 'react';
import { Image as ImageIcon, Plus, Trash2, GripVertical, Star } from 'lucide-react';

const Images = ({ images, onAdd, onDelete, onSetMain }) => {
    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
            <div className="border-b border-slate-100 px-6 py-5">
                <h2 className="text-lg font-bold text-slate-900">Product Images</h2>
            </div>
            <div className="p-6">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                    {images.map((img, index) => (
                        <div key={img.id} className={`group relative aspect-square overflow-hidden rounded-xl border-2 transition-all ${img.isMain ? 'border-indigo-500 ring-2 ring-indigo-50 shadow-lg' : 'border-slate-100 hover:border-slate-300'}`}>
                            <div className="flex h-full w-full items-center justify-center bg-slate-50">
                                <ImageIcon size={32} className="text-slate-200 transition-colors group-hover:text-slate-300" strokeWidth={1} />

                                {img.isMain && (
                                    <div className="absolute left-2 top-2 z-20 rounded-md bg-indigo-600 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-white shadow-lg">Main</div>
                                )}

                                <div className="absolute inset-0 z-10 flex items-center justify-center gap-2 bg-slate-900/40 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                                    <button
                                        className={`flex h-8 w-8 items-center justify-center rounded-lg shadow-lg transition-all hover:scale-110 active:scale-95 ${img.isMain ? 'bg-amber-400 text-white' : 'bg-white text-slate-600 hover:bg-amber-400 hover:text-white'}`}
                                        onClick={() => onSetMain(img.id)}
                                    >
                                        <Star size={16} fill={img.isMain ? "currentColor" : "none"} />
                                    </button>
                                    <button
                                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-slate-600 shadow-lg transition-all hover:scale-110 hover:bg-red-500 hover:text-white active:scale-95"
                                        onClick={() => onDelete(img.id)}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                            <div className="absolute bottom-0 flex w-full items-center gap-2 bg-white/90 px-2 py-1.5 backdrop-blur-sm border-t border-slate-100">
                                <GripVertical size={14} className="cursor-grab text-slate-300 hover:text-slate-500" />
                                <span className="truncate text-[10px] font-bold text-slate-500">image_{index + 1}.jpg</span>
                            </div>
                        </div>
                    ))}

                    <button
                        className="flex aspect-square flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 text-slate-400 transition-all hover:border-indigo-500 hover:bg-indigo-50 hover:text-indigo-600"
                        onClick={onAdd}
                    >
                        <Plus size={32} strokeWidth={1.5} />
                        <span className="mt-2 text-xs font-bold">Add Image</span>
                    </button>
                </div>

                <div className="mt-6 flex items-start gap-2 rounded-lg bg-indigo-50/50 p-3 text-[11px] leading-relaxed text-indigo-700 ring-1 ring-indigo-200/50">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-[10px] font-bold">i</span>
                    <p>Drag and drop images to reorder. The first image will be the primary product photo used in search and listings.</p>
                </div>
            </div>
        </div>
    );
};

export default Images;
