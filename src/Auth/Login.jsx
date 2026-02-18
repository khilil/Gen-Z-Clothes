import React, { useState } from "react";

export default function LoginAuth() {
    // State to toggle between Login and Signup
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="flex min-h-screen w-full bg-[#0a0a0a] text-white font-sans selection:bg-[#d4c4b1] selection:text-black overflow-hidden">

            {/* Left Side: Image Content (Desktop Only) */}
            <div className="hidden lg:block lg:w-1/2 relative group">
                <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwsZp-Pn1cf91xCfR0zKcdmcBt88piN2EqmVP9zCCl3Yx0ESZ63MgKxhyhxaFIQpCOEyIa15Iqm4aMMPB_8her15N4ANWbU2CPwY6ECoCf4-9Rfizxu3FWAeZIISVUbRgKZneU-UZhsbxixrWytLLNqlH7PDRkDdZjtTnkqSUAHbMRkc6Mfb1mfBVAxFYjhUaWAPwRZ0uDBiiVRdLxDrRpJy2pRAAM5QjzAgw1T5zZXk7S8Rc3BUrL9aLhcxVFv3Q9Krw26dUDkay1"
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
            <div className="w-full lg:w-1/2 bg-[#121212] flex flex-col justify-between relative border-l border-white/5 overflow-y-auto custom-scrollbar">

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
                        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>

                            {/* Full Name (Only for Signup) */}
                            {!isLogin && (
                                <div className="text-left">
                                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2 ml-1">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. James St. Patrick"
                                        className="w-full bg-white/5 border border-white/10 rounded-none py-4 px-6 text-white text-sm focus:ring-1 focus:ring-[#d4c4b1] focus:border-[#d4c4b1] transition-all placeholder:text-white/20 outline-none"
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
                                    placeholder="e.g. james@atelier.com"
                                    className="w-full bg-white/5 border border-white/10 rounded-none py-4 px-6 text-white text-sm focus:ring-1 focus:ring-[#d4c4b1] focus:border-[#d4c4b1] transition-all placeholder:text-white/20 outline-none"
                                />
                            </div>

                            {/* Password (Always visible in both Login & Signup) */}
                            <div className="text-left">
                                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2 ml-1">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full bg-white/5 border border-white/10 rounded-none py-4 px-6 text-white text-sm focus:ring-1 focus:ring-[#d4c4b1] focus:border-[#d4c4b1] transition-all placeholder:text-white/20 outline-none"
                                />
                            </div>

                            {/* Primary Button */}
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

                        {/* Social Authentication */}
                        <div className="mt-8">
                            <button className="w-full py-4 bg-transparent border border-white/10 text-white/80 text-[10px] font-bold uppercase tracking-[0.2em] rounded-none hover:bg-white/5 transition-all flex items-center justify-center gap-3 group">
                                <svg className="w-4 h-4 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="currentColor"></path>
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="currentColor"></path>
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="currentColor"></path>
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="currentColor"></path>
                                </svg>
                                {isLogin ? "Sign in with Google" : "Sign up with Google"}
                            </button>
                        </div>

                        {/* Toggle Logic & Mobile OTP */}
                        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col items-center gap-4">
                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-[10px] font-bold text-white/40 tracking-[0.2em] uppercase hover:text-[#d4c4b1] transition-colors"
                            >
                                {isLogin ? "Don't have an account? Join Now" : "Already have an account? Sign In"}
                            </button>

                            <button className="group text-[10px] font-bold text-white/40 tracking-[0.2em] uppercase hover:text-[#d4c4b1] transition-colors flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px] opacity-50 group-hover:opacity-100">
                                    smartphone
                                </span>
                                Login with Mobile OTP
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="p-8 lg:px-24">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 opacity-30">
                        <p className="text-[8px] uppercase tracking-[0.4em]">© 2024 MODERN MEN LTD.</p>
                        <div className="flex gap-6">
                            <a className="text-[8px] uppercase tracking-[0.4em] hover:text-white transition-colors" href="#privacy">Privacy</a>
                            <a className="text-[8px] uppercase tracking-[0.4em] hover:text-white transition-colors" href="#terms">Terms</a>
                            <a className="text-[8px] uppercase tracking-[0.4em] hover:text-white transition-colors" href="#support">Support</a>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}