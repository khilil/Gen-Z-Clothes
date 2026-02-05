import { useEffect, useState } from "react";
import "./AddAddressModal.css";

const AddAddressModal = ({ open, onClose, onSave }) => {
    const [form, setForm] = useState({
        name: "",
        phone: "",
        house: "",
        area: "",
        landmark: "",
        city: "",
        state: "",
        pincode: "",
        isDefault: false,
    });

    const validate = () => {
        const newErrors = {};

        if (!/^[6-9]\d{9}$/.test(form.phone)) {
            newErrors.phone = "Enter a valid 10-digit mobile number";
        }

        if (!/^\d{6}$/.test(form.pincode)) {
            newErrors.pincode = "Enter a valid 6-digit pincode";
        }

        if (!form.name.trim()) newErrors.name = "Name is required";
        if (!form.house.trim()) newErrors.house = "House/Flat is required";
        if (!form.area.trim()) newErrors.area = "Area is required";
        if (!form.city.trim()) newErrors.city = "City is required";
        if (!form.state.trim()) newErrors.state = "State is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const [errors, setErrors] = useState({});

    // 🔒 Lock background scroll
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => (document.body.style.overflow = "");
    }, [open]);

    if (!open) return null;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        onSave?.(form);
        onClose();
    };


    return (
        <div className="address-modal-overlay" onClick={onClose}>
            <div
                className="address-modal"
                onClick={(e) => e.stopPropagation()}
            >
                {/* HEADER */}
                <header className="address-modal-header">
                    <h2>Add New Address</h2>
                    <button className="close-btn" onClick={onClose}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </header>

                {/* BODY */}
                <form className="address-modal-body" onSubmit={handleSubmit}>
                    <div className="grid-2">
                        <div className="field">
                            <label>Full Name</label>
                            <input
                                name="name"
                                placeholder="e.g. Vikram Sharma"
                                value={form.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="field">
                            <label>Mobile Number</label>    
                            <input
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                className={errors.phone ? "error" : ""}
                            />
                            {errors.phone && <span className="error-text">{errors.phone}</span>}
                        </div>

                    </div>

                    <div className="field">
                        <label>House / Flat No.</label>
                        <input
                            name="house"
                            placeholder="Flat 402, Sea View Apartments"
                            value={form.house}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="field">
                        <label>Area / Street / Locality</label>
                        <input
                            name="area"
                            placeholder="Juhu Tara Road"
                            value={form.area}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="field">
                        <label>Landmark (Optional)</label>
                        <input
                            name="landmark"
                            placeholder="Near Juhu Beach"
                            value={form.landmark}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="grid-3">
                        <div className="field">
                            <label>City</label>
                            <input
                                name="city"
                                placeholder="Mumbai"
                                value={form.city}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="field">
                            <label>State</label>
                            <input
                                name="state"
                                placeholder="Maharashtra"
                                value={form.state}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="field">
                            <label>Pincode</label>
                            <input
                                name="pincode"
                                placeholder="400049"
                                value={form.pincode}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* TOGGLE */}
                    <div className="default-toggle">
                        <label className="switch">
                            <input
                                type="checkbox"
                                name="isDefault"
                                checked={form.isDefault}
                                onChange={handleChange}
                            />
                            <span className="slider" />
                        </label>
                        <span>Set as Default Address</span>
                    </div>

                    {/* ACTIONS */}
                    <div className="modal-actions">
                        <button type="submit" className="btn-primary">
                            Save Address
                        </button>
                        <button
                            type="button"
                            className="btn-secondary"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddAddressModal;
