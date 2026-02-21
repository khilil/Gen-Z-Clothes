import { useState } from "react";

export const AddCategoryModal = ({ isOpen, onClose, onAdd }) => {
    const [categoryName, setCategoryName] = useState("");

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (!categoryName.trim()) return;
        onAdd(categoryName);
        setCategoryName("");
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
            <div className="bg-[#1e293b] w-full max-w-md rounded-xl border border-[#334155] p-6 shadow-2xl">
                <h3 className="text-lg font-bold mb-4">Add New Category</h3>

                <input
                    type="text"
                    placeholder="Enter category name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    className="w-full rounded-lg border-[#334155] bg-[#0f172a] p-3 mb-4 focus:ring-blue-500"
                />

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-semibold text-[#94a3b8] border border-[#334155] rounded-xl hover:bg-[#0f172a]"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-xl hover:bg-blue-500"
                    >
                        Add Category
                    </button>
                </div>
            </div>
        </div>
    );
};