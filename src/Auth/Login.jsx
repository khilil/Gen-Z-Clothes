import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { motion, AnimatePresence } from "framer-motion";
import { googleLoginUser, loginUser, registerUser } from "../features/auth/authSlice";

export default function LoginAuth() {
    const [isLogin, setIsLogin] = useState(true);

    // 🔥 Redux & Navigation
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 🔥 Form State
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    // 🔥 Handle Input Change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // 🔥 Handle Submit Logic
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isLogin) {
            const result = await dispatch(
                loginUser({
                    email: formData.email,
                    password: formData.password
                })
            );

            if (result.meta.requestStatus === "fulfilled") {
                const role = result.payload.data.role;
                if (role === "admin") {
                    navigate("/admin");
                } else {
                    navigate("/account/dashboard");
                }
            }
        } else {
            const result = await dispatch(
                registerUser({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                })
            );

            if (result.meta.requestStatus === "fulfilled") {
                navigate("/account/dashboard");
            }
        }
    };

    return (
        <div className="flex min-h-screen w-full bg-[#0a0a0a] text-white font-sans selection:bg-[#d4c4b1] selection:text-black overflow-hidden selection:bg-indigo-500/30">

            {/* Left Side: Image Content (Desktop Only) */}
            <div className="hidden lg:block lg:w-1/2 relative group overflow-hidden">
                <motion.img
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    src="https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?q=80&w=2070&auto=format&fit=crop"
                    alt="Luxury Lifestyle"
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="absolute top-12 left-12"
                >
                    <a href="/" className="text-3xl font-['Oswald'] tracking-tighter text-white uppercase border-b-2 border-white/20 pb-1 hover:border-[#d4c4b1] transition-colors duration-500">
                        Modern Men
                    </a>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="absolute bottom-12 left-12 max-w-sm"
                >
                    <h3 className="text-4xl font-['Bodoni_Moda'] italic text-[#d4c4b1] mb-2 leading-tight">Define Your Legacy</h3>
                    <p className="text-[10px] uppercase tracking-[0.4em] text-white/40">The Curator for Modern Elegance</p>
                </motion.div>
            </div>

            {/* Right Side: Auth Form Container */}
            <div className="w-full lg:w-1/2 bg-[#0d0d0d] flex flex-col justify-between relative border-l border-white/5 overflow-y-auto">

                {/* Mobile Header */}
                <div className="lg:hidden p-8">
                    <motion.a
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-2xl font-['Oswald'] tracking-tighter text-white"
                        href="/"
                    >
                        MODERN MEN
                    </motion.a>
                </div>

                <div className="flex-1 flex items-center justify-center px-8 md:px-16 lg:px-24 py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full max-w-md"
                    >

                        {/* Heading Section */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={isLogin ? 'login-head' : 'signup-head'}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                transition={{ duration: 0.4 }}
                                className="mb-12"
                            >
                                <h2 className="text-5xl md:text-6xl font-['Oswald'] tracking-tighter mb-4 text-white uppercase leading-[0.85]">
                                    {isLogin ? (
                                        <>Access The <br /><span className="text-[#d4c4b1]">Collective</span></>
                                    ) : (
                                        <>Join The <br /><span className="text-[#d4c4b1]">Collective</span></>
                                    )}
                                </h2>
                                <div className="h-0.5 w-12 bg-[#d4c4b1] mb-6"></div>
                                <p className="text-[11px] font-medium text-white/50 tracking-[0.2em] leading-relaxed uppercase max-w-xs">
                                    {isLogin
                                        ? "Settle for nothing less than absolute distinction."
                                        : "Experience the pinnacle of luxury menswear and exclusive access."}
                                </p>
                            </motion.div>
                        </AnimatePresence>

                        {/* Auth Form */}
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <AnimatePresence mode="popLayout">
                                {/* Full Name (Only for Signup) */}
                                {!isLogin && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                                        animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
                                        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                        className="text-left overflow-hidden"
                                    >
                                        <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2 ml-1">
                                            Signature Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="James St. Patrick"
                                            className="w-full bg-white/5 border border-white/10 rounded-none py-4 px-6 text-white text-sm focus:bg-white/[0.08] focus:border-[#d4c4b1] transition-all placeholder:text-white/10 outline-none ring-0"
                                            required
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Email Address */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-left"
                            >
                                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2 ml-1">
                                    Digital Signature (Email)
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="james@atelier.com"
                                    className="w-full bg-white/5 border border-white/10 rounded-none py-4 px-6 text-white text-sm focus:bg-white/[0.08] focus:border-[#d4c4b1] transition-all placeholder:text-white/10 outline-none ring-0"
                                    required
                                />
                            </motion.div>

                            {/* Password */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-left"
                            >
                                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2 ml-1">
                                    Private Key (Password)
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full bg-white/5 border border-white/10 rounded-none py-4 px-6 text-white text-sm focus:bg-white/[0.08] focus:border-[#d4c4b1] transition-all placeholder:text-white/10 outline-none ring-0"
                                    required
                                />
                            </motion.div>

                            {/* Primary Submit Button */}
                            <motion.button
                                whileHover={{ backgroundColor: "#d4c4b1", color: "#000" }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full py-5 mt-6 bg-white text-black text-[11px] font-black uppercase tracking-[0.4em] rounded-none transition-all duration-500 shadow-2xl shadow-white/5"
                            >
                                {isLogin ? "Authenticate" : "Establish Account"}
                            </motion.button>
                        </form>

                        {/* Divider */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="mt-12 relative"
                        >
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/10"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-[#0d0d0d] px-6 text-white/20 tracking-[0.5em] font-bold text-[8px]">Selection</span>
                            </div>
                        </motion.div>


                        {/* Social Auth */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="mt-10 flex justify-center"
                        >
                            <div className="w-full max-w-[350px] overflow-hidden rounded-none border border-white/5 hover:border-white/20 transition-colors duration-500">
                                <GoogleLogin
                                    onSuccess={async (credentialResponse) => {
                                        const result = await dispatch(googleLoginUser(credentialResponse.credential));
                                        if (result.meta.requestStatus === "fulfilled") {
                                            const role = result.payload.data.role;
                                            if (role === "admin") {
                                                navigate("/admin");
                                            } else {
                                                navigate("/account/dashboard");
                                            }
                                        }
                                    }}
                                    onError={() => {
                                        console.log("Login Failed");
                                    }}
                                    theme="filled_black"
                                    shape="square"
                                    width="350"
                                    text={isLogin ? "signin_with" : "signup_with"}
                                />
                            </div>
                        </motion.div>

                        {/* Toggle Logic */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="mt-12 pt-8 border-t border-white/5 flex flex-col items-center gap-4"
                        >
                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className="group relative text-[10px] font-bold text-white/30 tracking-[0.2em] uppercase hover:text-white transition-all duration-500 pb-1"
                            >
                                {isLogin ? "New to the atelier? Join Now" : "Already registered? Sign In"}
                                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#d4c4b1] transition-all duration-500 group-hover:w-full"></span>
                            </button>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Footer */}
                <footer className="p-8 lg:px-24">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="flex flex-col md:flex-row justify-between items-center gap-6 opacity-30 group"
                    >
                        <p className="text-[7px] uppercase tracking-[0.6em] group-hover:opacity-100 transition-opacity duration-700">© 2024 MODERN MEN CURATION LTD.</p>
                        <div className="flex gap-8">
                            <a className="text-[7px] uppercase tracking-[0.6em] hover:text-[#d4c4b1] transition-all duration-300" href="#privacy">Privacy</a>
                            <a className="text-[7px] uppercase tracking-[0.6em] hover:text-[#d4c4b1] transition-all duration-300" href="#terms">Terms</a>
                        </div>
                    </motion.div>
                </footer>
            </div>
        </div>
    );
}