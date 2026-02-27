import AddAddressModal from "./AddAddressModal";
import "./Addresses.css";
import { useState, useEffect } from "react";
import {
    getAddressesAPI,
    setDefaultAddressAPI
} from "../../../features/address/addressService";
import api from "../../../services/api";

const Addresses = () => {
    const [open, setOpen] = useState(false);
    const [addresses, setAddresses] = useState([]);
    const [editingAddress, setEditingAddress] = useState(null);



    const fetchAddresses = async () => {
        try {
            const data = await getAddressesAPI();
            setAddresses(data);
        } catch (err) {
            console.error("Fetch address error:", err);
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, []);

    const handleSetDefault = async (id) => {
        await setDefaultAddressAPI(id);
        await fetchAddresses();
    };

    const handleDelete = async (id) => {
        await api.delete(`/users/address/${id}`);
        await fetchAddresses();
    };

    return (
        <div className="addresses">

            {/* 📍 ARCHIVES: GEOLOCATION REGISTRY */}
            <header className="mb-20 border-b-2 border-black pb-10 flex justify-between items-end">
                <div>
                    <h1 className="font-[Oswald] text-7xl font-bold uppercase tracking-tighter leading-[0.85]">
                        Addresses
                    </h1>
                    <p className="text-[10px] uppercase tracking-[0.4em] font-black text-black/40 mt-4">
                        Geolocation Registry & Shipping Protocols
                    </p>
                </div>

                <div className="hidden md:block text-[8px] uppercase tracking-widest font-black text-black/20">
                    Active Nodes: {addresses.length}
                </div>
            </header>

            <div className="addresses-grid">

                {/* ADD NEW */}
                <button
                    className="address-add"
                    onClick={() => {
                        setEditingAddress(null); // 🔥 important
                        setOpen(true);
                    }}
                >
                    <div className="add-icon">
                        <span className="material-symbols-outlined">add</span>
                    </div>
                    <span>Add New Address</span>
                </button>

                {/* ADDRESS CARDS */}
                {addresses.map((addr) => (
                    <div
                        key={addr._id}
                        className={`address-card ${addr.isDefault ? "default" : ""}`}
                    >
                        {addr.isDefault && (
                            <span className="default-badge">Default</span>
                        )}

                        <div className="address-content">
                            <h3>Address</h3>

                            <div className="address-field">
                                <label>Name</label>
                                <p>{addr.fullName}</p>
                            </div>

                            <div className="address-field">
                                <label>Address</label>
                                <p className="muted">
                                    {addr.streetAddress} <br />
                                    {addr.city} - {addr.pinCode}
                                </p>
                            </div>
                        </div>

                        <div className="address-actions">
                            <button
                                onClick={() => {
                                    setEditingAddress(addr);
                                    setOpen(true);
                                }}
                            >
                                <span className="material-symbols-outlined">edit</span>
                                Edit
                            </button>

                            {!addr.isDefault && (
                                <button onClick={() => handleSetDefault(addr._id)}>
                                    <span className="material-symbols-outlined">star</span>
                                    Set Default
                                </button>
                            )}

                            <button
                                className="danger"
                                onClick={() => handleDelete(addr._id)}
                            >
                                <span className="material-symbols-outlined">delete</span>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* 🔥 REUSABLE MODAL */}
            <AddAddressModal
                open={open}
                onClose={() => {
                    setOpen(false);
                    setEditingAddress(null);
                }}
                onSave={fetchAddresses}
                initialData={editingAddress}
                addressId={editingAddress?._id}
            />
        </div>
    );
};

export default Addresses;