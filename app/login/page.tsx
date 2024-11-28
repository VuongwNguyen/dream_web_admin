"use client";
import React, { useState } from "react";
import Cookies from "js-cookie";
import AxiosInstance from "@/constants/AxiosInstance";
import { useRouter } from "next/navigation";
const LoginPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            setIsLoading(true);
            const res = await AxiosInstance().post("/admin/login-admin", {
                email,
                password,
            });
            console.log(res);
            if (res?.status) {
                Cookies.set("token", res.data.accessToken);
                Cookies.set("role", res.data.role);
                Cookies.set("fullname", res.data.fullname);
                Cookies.set("avatar", res.data.avatar);
                router.replace('/dashboard');
            } else {
                setError("Login failed. Please try again.");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
            setIsLoading(false);
        }
        finally {
            setIsLoading(false);
        }

    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#00C3FE]">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
                <div className="flex flex-col gap-2 justify-center items-center">
                    <img src="/icon-navbar/iconapp.png" className="w-14 h-14" />
                    <h1 className="text-2xl font-bold text-gray-700 mb-6">
                        Dreams Admin
                    </h1>
                </div>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-left text-gray-600 font-semibold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00C3FE]"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-left text-gray-600 font-semibold mb-2">
                            Password
                        </label>
                        <div className="relative w-full">
                            <input
                                type={"password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00C3FE]"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-left">
                            {error}
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            className={`w-full py-2 rounded-lg transition-colors text-lg font-bold mt-2 ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#00C3FE] hover:[#00C3FE]'} text-white`}
                            disabled={isLoading}
                        >
                            <div className="w-full h-full flex justify-center">
                                {
                                    isLoading ? (
                                        <svg aria-hidden="true" className="w-8 h-8 self-center text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                    ) : (
                                        'Login'
                                    )
                                }
                            </div>

                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
