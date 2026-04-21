import React from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const Login = () => {
    // const {  setShowUserLogin, setUser } = useAppContext();
    const [state, setState] = React.useState("login");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate()

   const [loading, setLoading] = useState(false);
   const {signin, user} = useAuth()

const onSubmitHandler = async (e) => {
  e.preventDefault();
  setLoading(true);

 
    const res = await signin({ email, password });
    navigate("/")
  

  setLoading(false);
}

    return (
        <div
            // onClick={() => setShowUserLogin(false)}
            className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all duration-300"
        >
            <form
                onSubmit={onSubmitHandler}
                onClick={(e) => e.stopPropagation()}
                className="relative w-[90%] max-w-md overflow-hidden rounded-3xl bg-white/95 p-8 shadow-2xl backdrop-blur-md transition-all duration-300 animate-in fade-in zoom-in"
            >
                {/* Decorative gradient accent */}
                <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-linear-to-br from-primary/20 to-primary-middle/20 blur-3xl" />
                <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-linear-to-tr from-primary-dull/20 to-primary-light/20 blur-3xl" />

                <div className="relative space-y-6">
                    {/* Header */}
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-800">
                            <span className="bg-linear-to-r from-primary to-primary-middle bg-clip-text text-transparent">
                                Glow
                            </span>
                            <span className="text-gray-700">Guide</span>
                        </h2>
                        <p className="mt-2 text-sm text-gray-500">
                            {/* {state === "login" ?*/}
                                 Welcome back! Please sign in.
                                {/* : "Create your account to get started."} */}
                        </p>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-4">
                        {/* {state === "register" && ( */}
                            {/* <div className="space-y-1.5">
                                <label className="text-sm font-medium text-gray-700">Full Name</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                    <input
                                        onChange={(e) => setName(e.target.value)}
                                        value={name}
                                        placeholder="John Doe"
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-2.5 pl-10 pr-4 text-gray-700 placeholder:text-gray-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-dull transition-all duration-200"
                                        type="text"
                                        required
                                    />
                                </div>
                            </div>
                        )} */}

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-gray-700">Email Address</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                </span>
                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    placeholder="you@example.com"
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-2.5 pl-10 pr-4 text-gray-700 placeholder:text-gray-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-dull transition-all duration-200"
                                    type="email"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-gray-700">Password</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                <input
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    placeholder="••••••••"
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-2.5 pl-10 pr-4 text-gray-700 placeholder:text-gray-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-dull transition-all duration-200"
                                    type="password"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Toggle Link */}
                    <div className="text-center text-sm">
                        {/* {state === "register" ? (
                            <p className="text-gray-600">
                                Already have an account?{" "}
                                <button
                                    type="button"
                                    onClick={() => setState("login")}
                                    className="font-medium text-primary transition-colors hover:text-primary-light"
                                >
                                    Sign in
                                </button>
                            </p>
                        ) : ( */}
                            <p className="text-gray-600">
                                New to GlowGuide?{" "}
                                <button
                                    type="button"
                                    onClick={()=> navigate("/signup")}
                                    className="font-medium text-primary transition-colors hover:text-primary-light"
                                >
                                    Create account
                                </button>
                            </p>
                        {/* )} */}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="group relative w-full overflow-hidden rounded-xl bg-linear-to-r from-primary to-primary-middle py-3 font-medium text-white shadow-lg shadow-primary-dull/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                        <span className="relative z-10">
                            {loading ? "Please wait..." : "Sign In"}
                        </span>
                        <div className="absolute inset-0 z-0 bg-linear-to-r from-primary-middle to-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </button>

                    {/* Demo Hint */}
                    {/* <p className="text-center text-xs text-gray-400">
                        Demo: Use any email/password
                    </p> */}
                </div>
            </form>
        </div>
    );
};

export default Login;