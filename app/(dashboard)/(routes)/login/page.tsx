"use client";
import React from "react";

const LoginPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
                <div className="flex flex-col gap-2 justify-center items-center">
                    <img src="/icon-navbar/iconapp.png" className="w-14 h-14" />
                    <h1 className="text-2xl font-bold text-gray-700 mb-6">
                        Dreams Admin
                    </h1>
                </div>
                <form className="space-y-4">
                    <div>
                        <label className="block text-left text-gray-600 font-semibold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label className="block text-left text-gray-600 font-semibold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full bg-[#0CBBF0] text-white py-2 rounded-lg hover:bg-[#00C3FE] transition-colors text-lg font-bold"
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
