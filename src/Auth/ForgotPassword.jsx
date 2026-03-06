import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, ArrowLeft, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { forgotPasswordAPI } from "../features/auth/authService";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("idle"); // idle, loading, success, error
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("loading");
        try {
            await forgotPasswordAPI(email);
            setStatus("success");
            setMessage("A reset link has been sent to your email.");
        } catch (err) {
            setStatus("error");
            setMessage(err.response?.data?.message || "Failed to send reset link.");
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#8b7e6d]/5 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#8b7e6d]/5 blur-[120px] rounded-full" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="backdrop-blur-2xl bg-white/[0.03] border border-white/[0.08] rounded-3xl p-8 lg:p-12 shadow-[0_24px_80px_-12px_rgba(0,0,0,0.5)]">
                    <div className="mb-10 text-center">
                        <Link to="/login" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 hover:text-white transition-colors mb-8 group">
                            <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
                            Back to Sign In
                        </Link>
                        <h1 className="text-4xl font-['Oswald'] tracking-[-0.05em] text-white uppercase leading-none mb-4">
                            Recover <span className="text-[#8b7e6d]">Vault</span>
                        </h1>
                        <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-bold">
                            Enter your email to receive a reset link
                        </p>
                    </div>

                    <AnimatePresence mode="wait">
                        {status === "success" ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-8"
                            >
                                <div className="w-16 h-16 bg-[#8b7e6d]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Send className="text-[#8b7e6d]" size={24} />
                                </div>
                                <p className="text-sm text-white/60 mb-8">{message}</p>
                                <Link
                                    to="/login"
                                    className="block w-full py-4 bg-[#8b7e6d] rounded-xl text-[11px] font-black uppercase tracking-[0.6em] text-white hover:bg-[#a39584] transition-colors"
                                >
                                    Return to Login
                                </Link>
                            </motion.div>
                        ) : (
                            <motion.form
                                key="form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                onSubmit={handleSubmit}
                                className="space-y-6"
                            >
                                {status === "error" && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        className="p-4 bg-red-950/20 border border-red-500/30 rounded-lg flex items-center gap-3"
                                    >
                                        <AlertCircle className="text-red-500" size={18} />
                                        <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest leading-none mt-0.5">{message}</p>
                                    </motion.div>
                                )}

                                <div className="group/input relative flex flex-col gap-2">
                                    <label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 group-focus-within/input:text-[#8b7e6d] transition-colors ml-1">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-5 py-4 text-white text-xs tracking-wider focus:outline-none focus:border-[#8b7e6d]/50 focus:bg-white/[0.06] transition-all placeholder:text-white/10"
                                        placeholder="Enter your credential"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className="w-full group relative h-[52px] bg-white rounded-xl overflow-hidden active:scale-[0.98] transition-all disabled:opacity-50"
                                >
                                    <div className="absolute inset-0 bg-[#8b7e6d] w-0 group-hover:w-full transition-all duration-700 ease-[0.16, 1, 0.3, 1]" />
                                    <span className="relative z-10 text-[11px] font-black uppercase tracking-[0.6em] text-black group-hover:text-white transition-colors duration-500">
                                        {status === "loading" ? "Processing..." : "Send Reset Link"}
                                    </span>
                                </button>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}
