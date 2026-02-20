import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../features/auth/authSlice";

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
        <div className="flex min-h-screen w-full bg-[#0a0a0a] text-white font-sans selection:bg-[#d4c4b1] selection:text-black overflow-hidden">

            {/* Left Side: Image Content (Desktop Only) */}
            <div className="hidden lg:block lg:w-1/2 relative group">
                <img
                    src="https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?q=80&w=2070&auto=format&fit=crop"
                    alt="Luxury Lifestyle"
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-black/20"></div>

                <div className="absolute top-12 left-12">
                    <a href="/" className="text-3xl font-['Oswald'] tracking-tighter text-white uppercase border-b-2 border-white/20 pb-1">
                        Modern Men
                    </a>
                </div>
            </div>

            {/* Right Side: Auth Form Container */}
            <div className="w-full lg:w-1/2 bg-[#121212] flex flex-col justify-between relative border-l border-white/5 overflow-y-auto">

                {/* Mobile Header */}
                <div className="lg:hidden p-8">
                    <a className="text-2xl font-['Oswald'] tracking-tighter text-white" href="/">
                        MODERN MEN
                    </a>
                </div>

                <div className="flex-1 flex items-center justify-center px-8 md:px-16 lg:px-24 py-12">
                    <div className="w-full max-w-md">

                        {/* Heading Section */}
                        <div className="mb-10">
                            <h2 className="text-4xl md:text-5xl font-['Oswald'] tracking-tighter mb-4 text-white uppercase leading-[0.9]">
                                {isLogin ? (
                                    <>Access The <span className="text-[#d4c4b1]">Collective</span></>
                                ) : (
                                    <>Join The <span className="text-[#d4c4b1]">Collective</span></>
                                )}
                            </h2>
                            <p className="text-[11px] font-medium text-white/40 tracking-[0.2em] leading-relaxed uppercase">
                                {isLogin
                                    ? "Premium membership for the modern individual."
                                    : "Experience the pinnacle of luxury menswear and exclusive access."}
                            </p>
                        </div>

                        {/* Auth Form */}
                        <form className="space-y-5" onSubmit={handleSubmit}>

                            {/* Full Name (Only for Signup) */}
                            {!isLogin && (
                                <div className="text-left">
                                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2 ml-1">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="e.g. James St. Patrick"
                                        className="w-full bg-white/5 border border-white/10 rounded-none py-4 px-6 text-white text-sm focus:ring-1 focus:ring-[#d4c4b1] focus:border-[#d4c4b1] transition-all placeholder:text-white/20 outline-none"
                                        required
                                    />
                                </div>
                            )}

                            {/* Email Address */}
                            <div className="text-left">
                                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2 ml-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="e.g. james@atelier.com"
                                    className="w-full bg-white/5 border border-white/10 rounded-none py-4 px-6 text-white text-sm focus:ring-1 focus:ring-[#d4c4b1] focus:border-[#d4c4b1] transition-all placeholder:text-white/20 outline-none"
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div className="text-left">
                                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2 ml-1">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full bg-white/5 border border-white/10 rounded-none py-4 px-6 text-white text-sm focus:ring-1 focus:ring-[#d4c4b1] focus:border-[#d4c4b1] transition-all placeholder:text-white/20 outline-none"
                                    required
                                />
                            </div>

                            {/* Primary Submit Button */}
                            <button
                                type="submit"
                                className="w-full py-5 mt-4 bg-white text-black text-[11px] font-black uppercase tracking-[0.3em] rounded-none hover:bg-[#d4c4b1] transition-all duration-300 transform active:scale-[0.98]"
                            >
                                {isLogin ? "Sign In" : "Create Account"}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="mt-8 relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/10"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-[#121212] px-4 text-white/20 tracking-widest font-bold text-[9px]">Or</span>
                            </div>
                        </div>

                        {/* Social Auth (Optional UI) */}
                        <div className="mt-8">
                            <button className="w-full py-4 bg-transparent border border-white/10 text-white/80 text-[10px] font-bold uppercase tracking-[0.2em] rounded-none hover:bg-white/5 transition-all flex items-center justify-center gap-3">
                                {isLogin ? "Sign in with Google" : "Sign up with Google"}
                            </button>
                        </div>

                        {/* Toggle Logic */}
                        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col items-center gap-4">
                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-[10px] font-bold text-white/40 tracking-[0.2em] uppercase hover:text-[#d4c4b1] transition-colors"
                            >
                                {isLogin ? "Don't have an account? Join Now" : "Already have an account? Sign In"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="p-8 lg:px-24">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 opacity-30">
                        <p className="text-[8px] uppercase tracking-[0.4em]">© 2024 MODERN MEN LTD.</p>
                        <div className="flex gap-6">
                            <a className="text-[8px] uppercase tracking-[0.4em] hover:text-white" href="#privacy">Privacy</a>
                            <a className="text-[8px] uppercase tracking-[0.4em] hover:text-white" href="#terms">Terms</a>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}