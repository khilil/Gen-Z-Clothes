import AddAddressModal from "./AddAddressModal";
import "./Addresses.css";
import { useState } from "react";

const addresses = [
    {
        id: 1,
        label: "Home",
        name: "Vikram Sharma",
        phone: "+91 98765 43210",
        address: `Flat 402, Sea View Apartments,
Juhu Tara Road, Juhu,
Mumbai, Maharashtra - 400049`,
        isDefault: true,
    },
    {
        id: 2,
        label: "Work",
        name: "Vikram Sharma",
        phone: "+91 98765 43210",
        address: `Building 5, 12th Floor, Tech Hub North,
Bandra Kurla Complex,
Mumbai, Maharashtra - 400051`,
    },
    {
        id: 3,
        label: "Parents' House",
        name: "Sunita Sharma",
        phone: "+91 91234 56789",
        address: `14/B, Residency Road,
Opposite Central Mall, Richmond Town,
Bengaluru, Karnataka - 560025`,
    },
];

const Addresses = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className="addresses">

            {/* HEADER */}
            <header className="addresses-header">
                <h1>Saved Addresses</h1>
                <p>
                    Manage your shipping addresses for a faster checkout experience.
                </p>
            </header>

            {/* GRID */}
            <div className="addresses-grid" onClick={() => setOpen(true)}>
                {/* ADD NEW */}
                <button className="address-add" onClick={() => setOpen(true)}>
                    <div className="add-icon">
                        <span className="material-symbols-outlined">add</span>
                    </div>
                    <span>Add New Address</span>
                </button>

                {/* ADDRESS CARDS */}
                {addresses.map((addr) => (
                    <div
                        key={addr.id}
                        className={`address-card ${addr.isDefault ? "default" : ""
                            }`}
                    >
                        {addr.isDefault && (
                            <span className="default-badge">Default</span>
                        )}

                        <div className="address-content">
                            <h3>{addr.label}</h3>

                            <div className="address-field">
                                <label>Name</label>
                                <p>{addr.name}</p>
                            </div>

                            <div className="address-field">
                                <label>Mobile</label>
                                <p>{addr.phone}</p>
                            </div>

                            <div className="address-field">
                                <label>Address</label>
                                <p className="muted">
                                    {addr.address.split("\n").map((line, i) => (
                                        <span key={i}>
                                            {line}
                                            <br />
                                        </span>
                                    ))}
                                </p>
                            </div>
                        </div>

                        <div className="address-actions">
                            <button>
                                <span className="material-symbols-outlined">edit</span>
                                Edit
                            </button>
                            <button className="danger">
                                <span className="material-symbols-outlined">delete</span>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <AddAddressModal
                open={open}
                onClose={() => setOpen(false)}
                onSave={(data) => console.log(data)}
            />
        </div>
    );
};

export default Addresses;
