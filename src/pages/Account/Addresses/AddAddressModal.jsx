import { useEffect, useState } from "react";
import api from "../../../services/api";
import "./AddAddressModal.css";

const AddAddressModal = ({
    open,
    onClose,
    onSave,
    initialData = null,
    addressId = null,
}) => {

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

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // 🔥 Prefill when editing
    useEffect(() => {
        if (initialData) {
            const parts = initialData.streetAddress?.split(",") || [];

            setForm({
                name: `${initialData.firstName || ""} ${initialData.lastName || ""}`.trim(),
                phone: initialData.phone || "",
                house: parts[0]?.trim() || "",
                area: parts[1]?.trim() || "",
                landmark: parts[2]?.trim() || "",
                city: initialData.city || "",
                state: "",
                pincode: initialData.pinCode || "",
                isDefault: initialData.isDefault || false,
            });
        } else {
            setForm({
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
        }
    }, [initialData, open]);

    // 🔒 Lock scroll
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => (document.body.style.overflow = "");
    }, [open]);

    if (!open) return null;

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

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            setLoading(true);

            const [firstName, ...rest] = form.name.trim().split(" ");
            const lastName = rest.length ? rest.join(" ") : "NA";

            const payload = {
                fullName: form.name.trim(),
                phone: form.phone,
                streetAddress: `${form.house}, ${form.area}, ${form.landmark || ""}`,
                city: form.city,
                state: form.state,
                pinCode: form.pincode,
            };
            

            let savedAddressId = addressId;

            // 🔥 ADD
            if (!addressId) {
                const res = await api.post("/users/addresses", payload);
                const addresses = res.data.data;
                savedAddressId = addresses[addresses.length - 1]?._id;
            }
            // 🔥 UPDATE
            else {
                await api.put(`/users/address/${addressId}`, payload);
            }

            // 🔥 Set Default
            if (form.isDefault && savedAddressId) {
                await api.patch(`/users/addresses/${savedAddressId}/default`);
            }

            onSave?.();
            onClose();

        } catch (error) {
            console.error("Address save error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="address-modal-overlay" onClick={onClose}>
            <div
                className="address-modal"
                onClick={(e) => e.stopPropagation()}
            >
                <header className="address-modal-header">
                    <h2>{addressId ? "Edit Address" : "Add New Address"}</h2>
                    <button className="close-btn" onClick={onClose}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </header>

                <form className="address-modal-body" onSubmit={handleSubmit}>
                    <div className="grid-2">
                        <div className="field">
                            <label>Full Name</label>
                            <input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                            />
                            {errors.name && <span className="error-text">{errors.name}</span>}
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
                            value={form.house}
                            onChange={handleChange}
                        />
                        {errors.house && <span className="error-text">{errors.house}</span>}
                    </div>

                    <div className="field">
                        <label>Area / Street / Locality</label>
                        <input
                            name="area"
                            value={form.area}
                            onChange={handleChange}
                        />
                        {errors.area && <span className="error-text">{errors.area}</span>}
                    </div>

                    <div className="field">
                        <label>Landmark (Optional)</label>
                        <input
                            name="landmark"
                            value={form.landmark}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="grid-3">
                        <div className="field">
                            <label>City</label>
                            <input
                                name="city"
                                value={form.city}
                                onChange={handleChange}
                            />
                            {errors.city && <span className="error-text">{errors.city}</span>}
                        </div>

                        <div className="field">
                            <label>State</label>
                            <input
                                name="state"
                                value={form.state}
                                onChange={handleChange}
                            />
                            {errors.state && <span className="error-text">{errors.state}</span>}
                        </div>

                        <div className="field">
                            <label>Pincode</label>
                            <input
                                name="pincode"
                                value={form.pincode}
                                onChange={handleChange}
                                className={errors.pincode ? "error" : ""}
                            />
                            {errors.pincode && <span className="error-text">{errors.pincode}</span>}
                        </div>
                    </div>

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

                    <div className="modal-actions">
                        <button type="submit" className="btn-primary" disabled={loading}>
                            {loading ? "Saving..." : addressId ? "Update Address" : "Save Address"}
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