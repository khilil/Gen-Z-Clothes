import { useState, useMemo, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser, addUserAddress } from "../../features/auth/authSlice";
import * as orderService from "../../services/orderService";

import * as paymentService from "../../services/paymentService";

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { cart, clearCart } = useCart();
  const { user } = useSelector((state) => state.auth);

  const directBuy = location.state?.directBuy;
  const [isProcessing, setIsProcessing] = useState(false);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [checkoutStep, setCheckoutStep] = useState("shipping"); // "shipping" | "payment"
  const [selectedAddress, setSelectedAddress] = useState(null);

  // 🛡️ Load Razorpay Script Dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // 📝 Form State for New Address
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "COD"
  });

  // 🔄 New Card & Payment State
  const [cardData, setCardData] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
    upiId: "",
    billingSameAsShipping: true
  });

  // 🔄 Auto-fetch profile
  useEffect(() => {
    if (!user) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, user]);

  // 🔄 Handle Initial Selection
  useEffect(() => {
    if (user?.addresses?.length > 0) {
      const defaultAddr = user.addresses.find(a => a.isDefault) || user.addresses[0];
      setSelectedAddressId(defaultAddr._id);
      setSelectedAddress(defaultAddr);
      setShowNewAddressForm(false);
    } else {
      setShowNewAddressForm(true);
    }
  }, [user?.addresses]);

  // Update selectedAddress when selectedAddressId changes
  useEffect(() => {
    if (user?.addresses && selectedAddressId) {
      const addr = user.addresses.find(a => a._id === selectedAddressId);
      if (addr) setSelectedAddress(addr);
    }
  }, [selectedAddressId, user?.addresses]);

  // Calculate Summary
  const checkoutItems = useMemo(() => {
    if (directBuy) {
      return [{
        id: directBuy.productId,
        variantId: directBuy.variantId,
        title: directBuy.title,
        price: directBuy.price,
        qty: directBuy.quantity,
        size: directBuy.size,
        image: directBuy.image
      }];
    }
    return cart;
  }, [cart, directBuy]);

  const subtotal = checkoutItems.reduce((acc, item) => acc + (item.price || 0) * (item.qty || item.quantity || 1), 0);
  const tax = subtotal * 0.082; // 8.2% estimated tax like in mockup
  const total = subtotal + tax;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCardInputChange = (e) => {
    setCardData({ ...cardData, [e.target.name]: e.target.value });
  };

  const goToPayment = () => {
    if (showNewAddressForm) {
      // Validate form
      if (!formData.firstName || !formData.addressLine || !formData.pincode) {
        alert("Please complete the address form");
        return;
      }
      setSelectedAddress({
        fullName: `${formData.firstName} ${formData.lastName}`.trim(),
        phone: formData.phone,
        streetAddress: formData.addressLine,
        city: formData.city,
        state: formData.state,
        pinCode: formData.pincode
      });
    } else if (!selectedAddressId) {
      alert("Please select an existing address or add a new one.");
      return;
    }
    setCheckoutStep("payment");
    window.scrollTo(0, 0);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      let shippingAddress;

      if (showNewAddressForm && !selectedAddressId) {
        // Save new address first
        const newAddrData = {
          fullName: `${formData.firstName} ${formData.lastName}`.trim(),
          phone: formData.phone,
          streetAddress: formData.addressLine,
          city: formData.city,
          state: formData.state,
          pinCode: formData.pincode
        };
        await dispatch(addUserAddress(newAddrData)).unwrap();
        shippingAddress = newAddrData;
      } else {
        const selectedAddr = user.addresses.find(a => a._id === selectedAddressId);
        shippingAddress = {
          fullName: selectedAddr.fullName,
          phone: selectedAddr.phone,
          addressLine: selectedAddr.streetAddress,
          city: selectedAddr.city,
          state: selectedAddr.state,
          pincode: selectedAddr.pinCode
        };
      }

      const orderData = {
        shippingAddress,
        paymentMethod: formData.paymentMethod
      };

      let result;
      if (directBuy) {
        result = await orderService.directBuy({
          ...orderData,
          productId: directBuy.productId,
          variantId: directBuy.variantId,
          quantity: directBuy.quantity
        });
      } else {
        result = await orderService.cartCheckout(orderData);
      }

      // 💳 Razorpay Integration for Online Payments
      if (formData.paymentMethod === "ONLINE" || formData.paymentMethod === "UPI") {
        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) {
          alert("Razorpay SDK failed to load. Are you online?");
          setIsProcessing(false);
          return;
        }

        // Create Razorpay Order in Backend
        const razorpayOrder = await paymentService.createRazorpayOrder({
          orderId: result.data._id
        });

        const options = {
          key: "rzp_test_SKiQG78TfTVFU7", // Test Key ID
          amount: razorpayOrder.data.amount,
          currency: razorpayOrder.data.currency,
          name: "GenZ Cloths",
          description: "Payment for Order #" + result.data._id,
          order_id: razorpayOrder.data.id,
          handler: async function (response) {
            try {
              setIsProcessing(true);
              const verificationData = {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderId: result.data._id
              };

              // Verify Signature in Backend
              await paymentService.verifyRazorpayPayment(verificationData);
              if (!directBuy) clearCart();
              navigate("/account/orders", { state: { orderSuccess: true } });
            } catch (error) {
              console.error("Payment Verification Failed:", error);
              alert("Payment verification failed. Please contact support.");
              navigate("/account/orders", { state: { orderSuccess: false } });
            } finally {
              setIsProcessing(false);
            }
          },
          prefill: {
            name: user.fullName,
            email: user.email,
            contact: shippingAddress.phone
          },
          theme: {
            color: "#000000"
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', function (response) {
          console.error("Payment Failed:", response.error);
          alert("Payment failed: " + response.error.description);
          setIsProcessing(false);
        });
        rzp.open();
      } else {
        // Cash on Delivery flow
        if (!directBuy) clearCart();
        navigate("/account/orders", { state: { orderSuccess: true } });
      }

    } catch (error) {
      console.error("Order Failed:", error);
      alert(error.message || "Something went wrong while placing order");
    } finally {
      if (formData.paymentMethod === "COD") {
        setIsProcessing(false);
      }
    }
  };

  return (
    <div className="bg-white selection:bg-[#d4c4b1] selection:text-black font-sans text-black min-h-screen">

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* PROGRESS STEPPER */}
        <div className="hidden md:flex items-center justify-center mb-16 max-w-2xl mx-auto">
          <div className="flex items-center gap-4 group">
            <span className={`text-[10px] font-black uppercase tracking-widest ${checkoutStep === 'shipping' ? 'text-black' : 'text-gray-400'}`}>Cart</span>
            <div className="w-12 md:w-16 h-[2px] bg-black"></div>
          </div>
          <div className="flex items-center gap-4 px-4">
            <span className={`text-[10px] font-black uppercase tracking-widest ${checkoutStep === 'shipping' ? 'text-black' : 'text-gray-400'}`}>Shipping</span>
            <div className={`w-12 md:w-16 h-[2px] ${checkoutStep === 'payment' ? 'bg-black' : 'bg-gray-200'}`}></div>
          </div>
          <div className="flex items-center gap-4 px-4">
            <span className={`text-[10px] font-black uppercase tracking-widest ${checkoutStep === 'payment' ? 'text-black' : 'text-gray-400'}`}>Payment</span>
            <div className="w-12 md:w-16 h-[2px] bg-gray-200"></div>
          </div>
          <div className="flex items-center gap-4 opacity-30">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Done</span>
          </div>
        </div>

        <form onSubmit={handlePlaceOrder} className="flex flex-col lg:flex-row gap-20">
          <div className="flex-1 space-y-12">
            {checkoutStep === "shipping" ? (
              /* SHIPPING SECTION */
              <section className="relative">
                <div className="flex justify-between items-end mb-8 sticky top-20 bg-white/95 backdrop-blur-sm z-40 py-4 -mx-4 px-4 border-b border-gray-50 md:border-0 md:bg-transparent md:backdrop-blur-none">
                  <h2 className="text-2xl font-[Oswald] uppercase tracking-tight">Shipping Interface</h2>
                  {user?.addresses?.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setShowNewAddressForm(!showNewAddressForm)}
                      className="text-[10px] font-black uppercase tracking-widest text-[#d4c4b1] hover:text-black transition-colors"
                    >
                      {showNewAddressForm ? "Select Existing" : "+ Add New Address"}
                    </button>
                  )}
                </div>

                {!showNewAddressForm && user?.addresses?.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {user.addresses.map((addr) => (
                      <div
                        key={addr._id}
                        onClick={() => setSelectedAddressId(addr._id)}
                        className={`p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 relative group ${selectedAddressId === addr._id ? 'border-black bg-gray-50/50 shadow-lg' : 'border-gray-100 hover:border-gray-200'}`}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <p className="text-[10px] font-black uppercase tracking-widest text-black">{addr.fullName}</p>
                          {selectedAddressId === addr._id && (
                            <span className="material-symbols-outlined text-black text-lg">check_circle</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed uppercase tracking-wider">
                          {addr.streetAddress},<br />
                          {addr.city}, {addr.state} - {addr.pinCode}
                        </p>
                        <p className="mt-4 text-[10px] font-black text-gray-400 tracking-widest">PHONE: {addr.phone}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50/30 p-8 rounded-3xl border border-dashed border-gray-200">
                    <div className="space-y-2 md:col-span-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">First Name</label>
                      <input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required={showNewAddressForm}
                        className="w-full border-gray-100 bg-white rounded-xl py-4 px-5 text-sm focus:border-black focus:ring-0 transition-all outline-none"
                        placeholder="James"
                        type="text"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Last Name</label>
                      <input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required={showNewAddressForm}
                        className="w-full border-gray-100 bg-white rounded-xl py-4 px-5 text-sm focus:border-black focus:ring-0 transition-all outline-none"
                        placeholder="Stirling"
                        type="text"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Digital Contact</label>
                      <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required={showNewAddressForm}
                        className="w-full border-gray-100 bg-white rounded-xl py-4 px-5 text-sm focus:border-black focus:ring-0 transition-all outline-none"
                        placeholder="+91 XXXXX XXXXX"
                        type="tel"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Street Domain</label>
                      <input
                        name="addressLine"
                        value={formData.addressLine}
                        onChange={handleInputChange}
                        required={showNewAddressForm}
                        className="w-full border-gray-100 bg-white rounded-xl py-4 px-5 text-sm focus:border-black focus:ring-0 transition-all outline-none"
                        placeholder="245 Fifth Avenue, Apartment 4B"
                        type="text"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Urban City</label>
                      <input
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required={showNewAddressForm}
                        className="w-full border-gray-100 bg-white rounded-xl py-4 px-5 text-sm focus:border-black focus:ring-0 transition-all outline-none"
                        placeholder="New York"
                        type="text"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Regional State</label>
                      <input
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required={showNewAddressForm}
                        className="w-full border-gray-100 bg-white rounded-xl py-4 px-5 text-sm focus:border-black focus:ring-0 transition-all outline-none"
                        placeholder="New York"
                        type="text"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Zip Protocol</label>
                      <input
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        required={showNewAddressForm}
                        className="w-full border-gray-100 bg-white rounded-xl py-4 px-5 text-sm focus:border-black focus:ring-0 transition-all outline-none"
                        placeholder="100116"
                        type="text"
                      />
                    </div>
                  </div>
                )}
                <div className="mt-12 flex justify-end">
                  <button
                    type="button"
                    onClick={goToPayment}
                    className="h-16 px-12 bg-black text-white text-[12px] font-black uppercase tracking-[0.4em] hover:bg-[#d4c4b1] hover:text-black transition-all rounded-xl shadow-xl shadow-black/10"
                  >
                    Continue to Payment
                  </button>
                </div>
              </section>
            ) : (
              /* PAYMENT SECTION */
              <div className="space-y-12">
                {/* REVIEW CARD */}
                <section className="bg-gray-50/50 p-8 rounded-2xl border border-gray-100 relative">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-[Oswald] uppercase tracking-tight">Review & Pay</h2>
                    <button
                      type="button"
                      onClick={() => setCheckoutStep("shipping")}
                      className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-all border-b border-gray-200 hover:border-black"
                    >
                      Edit Address
                    </button>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-gray-400 text-xl">location_on</span>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Shipping To</p>
                      <p className="text-sm font-bold uppercase">{selectedAddress?.fullName}</p>
                      <p className="text-sm text-gray-500 uppercase tracking-wider mt-1">
                        {selectedAddress?.streetAddress}, {selectedAddress?.city}, {selectedAddress?.state} - {selectedAddress?.pinCode}, IN
                      </p>
                    </div>
                  </div>
                </section>

                <section className="relative">
                  <h2 className="text-2xl font-[Oswald] uppercase tracking-tight mb-8 sticky top-20 bg-white/95 backdrop-blur-sm z-40 py-4 -mx-4 px-4 border-b border-gray-50 md:border-0 md:bg-transparent md:backdrop-blur-none">Payment Methodology</h2>

                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <PaymentOption
                        id="ONLINE"
                        title="Card"
                        desc="Safe & Secure"
                        icon="credit_card"
                        active={formData.paymentMethod === "ONLINE"}
                        onClick={() => setFormData({ ...formData, paymentMethod: "ONLINE" })}
                      />
                      <PaymentOption
                        id="UPI"
                        title="UPI / QR"
                        desc="Instant Transfer"
                        icon="qr_code_2"
                        active={formData.paymentMethod === "UPI"}
                        onClick={() => setFormData({ ...formData, paymentMethod: "UPI" })}
                      />
                      <PaymentOption
                        id="COD"
                        title="Cash"
                        desc="Pay on arrival"
                        icon="payments"
                        active={formData.paymentMethod === "COD"}
                        onClick={() => setFormData({ ...formData, paymentMethod: "COD" })}
                      />
                    </div>

                    {formData.paymentMethod === "UPI" && (
                      <div className="bg-gray-50/30 p-8 rounded-3xl border border-dashed border-gray-200">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">UPI Identifier (VPA)</label>
                          <div className="relative">
                            <input
                              className="w-full border-gray-100 rounded-xl py-4 px-5 text-sm tracking-widest"
                              placeholder="username@bank"
                              name="upiId"
                              value={cardData.upiId}
                              onChange={handleCardInputChange}
                              type="text"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                              <span className="material-symbols-outlined text-gray-400 opacity-50">alternate_email</span>
                            </div>
                          </div>
                          <p className="text-[9px] text-gray-400 uppercase tracking-widest mt-2 px-1">You will receive a request on your UPI app</p>
                        </div>
                      </div>
                    )}

                    {formData.paymentMethod === "ONLINE" && (
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-gray-50/30 p-8 rounded-3xl border border-dashed border-gray-200">
                        <div className="space-y-2 md:col-span-4">
                          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Card Number</label>
                          <div className="relative">
                            <input
                              className="w-full border-gray-100 rounded-xl py-4 px-5 text-sm tracking-[0.2em]"
                              placeholder="0000 0000 0000 0000"
                              name="cardNumber"
                              value={cardData.cardNumber}
                              onChange={handleCardInputChange}
                              type="text"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
                              <span className="material-symbols-outlined text-gray-400 opacity-50">credit_card</span>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2 md:col-span-4">
                          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Name on Card</label>
                          <input
                            className="w-full border-gray-100 rounded-xl py-4 px-5 text-sm uppercase font-bold"
                            placeholder="JAMES STIRLING"
                            name="cardName"
                            value={cardData.cardName}
                            onChange={handleCardInputChange}
                            type="text"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Expiration Date</label>
                          <input
                            className="w-full border-gray-100 rounded-xl py-4 px-5 text-sm"
                            placeholder="MM / YY"
                            name="expiry"
                            value={cardData.expiry}
                            onChange={handleCardInputChange}
                            type="text"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">CVV Protection</label>
                          <input
                            className="w-full border-gray-100 rounded-xl py-4 px-5 text-sm"
                            placeholder="***"
                            name="cvv"
                            value={cardData.cvv}
                            onChange={handleCardInputChange}
                            type="password"
                          />
                        </div>
                        <div className="md:col-span-4 pt-2">
                          <label className="flex items-center gap-3 cursor-pointer group">
                            <input
                              type="checkbox"
                              className="w-5 h-5 rounded border-gray-200 text-black focus:ring-black transition-all"
                              checked={cardData.billingSameAsShipping}
                              onChange={(e) => setCardData({ ...cardData, billingSameAsShipping: e.target.checked })}
                            />
                            <span className="text-[11px] font-black uppercase tracking-widest text-gray-400 group-hover:text-black">Billing address same as shipping</span>
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              </div>
            )}
          </div>

          {/* SUMMARY SIDEBAR */}
          <div className="lg:w-[450px]">
            <div className="sticky top-32 bg-gray-50 border border-gray-100 p-8 md:p-10 rounded-3xl space-y-10 shadow-sm">
              <h3 className="text-2xl font-[Oswald] uppercase tracking-tight">Order Synopsis</h3>

              <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {checkoutItems.map((item, idx) => (
                  <div key={idx} className="flex gap-4 group">
                    <div className="w-20 aspect-[3/4] rounded-xl overflow-hidden bg-white border border-gray-100 flex-shrink-0 relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-all duration-700"
                      />
                    </div>
                    <div className="flex-1 py-1">
                      <p className="text-[11px] font-black uppercase tracking-widest truncate">{item.title}</p>
                      <p className="text-[10px] text-gray-500 uppercase mt-1 tracking-widest">Qty: {item.qty || 1} | Size: {item.size}</p>
                      <p className="text-lg font-[Oswald] tracking-tight mt-2 italic">₹{(item.price * (item.qty || 1)).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-8 border-t border-gray-200">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-500">
                  <span>Subtotal</span>
                  <span className="text-black">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-500">
                  <span>Shipping</span>
                  <span className="text-emerald-600 font-bold uppercase">Free</span>
                </div>
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-500">
                  <span>VAT Estimation</span>
                  <span className="text-black">₹{tax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="pt-8 border-t border-gray-200 flex justify-between items-end">
                  <span className="text-lg font-[Oswald] uppercase tracking-tighter">Total Due</span>
                  <span className="text-4xl font-[Oswald] tracking-tight">₹{total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>

              {checkoutStep === "shipping" ? (
                <button
                  type="button"
                  onClick={goToPayment}
                  className="w-full h-20 bg-black text-white text-[12px] font-black uppercase tracking-[0.4em] hover:bg-[#d4c4b1] hover:text-black transition-all rounded-2xl shadow-2xl shadow-black/10 flex items-center justify-center gap-3"
                >
                  Continue to Payment
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full h-20 bg-black text-white text-[12px] font-black uppercase tracking-[0.4em] hover:bg-[#d4c4b1] hover:text-black transition-all rounded-2xl shadow-2xl shadow-black/10 flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isProcessing ? "Validating..." : "Complete Order"}
                  {!isProcessing && <span className="material-symbols-outlined">shield</span>}
                </button>
              )}

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-col items-center gap-2">
                  <span className="material-symbols-outlined text-[#d4c4b1] text-lg">verified_user</span>
                  <span className="text-[8px] font-black uppercase tracking-widest text-center text-gray-400">Secure SSL</span>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-col items-center gap-2">
                  <span className="material-symbols-outlined text-[#d4c4b1] text-lg">public</span>
                  <span className="text-[8px] font-black uppercase tracking-widest text-center text-gray-400">Global Node</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>

    </div>
  );
}

function PaymentOption({ id, title, desc, icon, active, onClick }) {
  return (
    <label
      onClick={onClick}
      className={`flex items-center justify-between p-6 border-2 rounded-2xl cursor-pointer transition-all duration-500 ${active ? 'border-black bg-gray-50/50 shadow-lg' : 'border-gray-100 hover:border-gray-300'}`}
    >
      <div className="flex items-center gap-4">
        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${active ? 'border-primary' : 'border-gray-200'}`}>
          {active && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-widest">{title}</p>
          <p className="text-[10px] text-gray-500 uppercase mt-1 tracking-wider">{desc}</p>
        </div>
      </div>
      <span className={`material-symbols-outlined ${active ? 'text-black' : 'text-gray-300'}`}>{icon}</span>
    </label>
  );
}
