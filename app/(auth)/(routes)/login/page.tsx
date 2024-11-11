"use client";
import React, { useState } from "react";
import Cookies from "js-cookie";
import AxiosInstance from "@/constants/AxiosInstance";
const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            const res = await AxiosInstance().post('/admin/login-admin',{email,password});
            console.log(res);

            if (res?.status) {
                Cookies.set("token", res.data.accessToken);
                Cookies.set("role", res.data.role);
                Cookies.set("fullname", res.data.fullname);
                Cookies.set("avatar", res.data.avatar);
                alert('Đăng nhập thành công!')
                window.location.href = "dashboard";
            } else {
                setError("Login failed. Please try again.");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
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
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00C3FE]"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-left">
                            {error}
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            className="w-full bg-[#0CBBF0] text-white py-2 rounded-lg hover:bg-[#00C3FE] transition-colors text-lg font-bold mt-2"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
