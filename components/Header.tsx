'use client'
import React, { useState } from 'react'
import { Input } from './ui/input'
import { Bell, Search } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { DropdownMenu, DropdownMenuLabel } from './ui/dropdown-menu'
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        alert('You have been logged out!');
        // Thêm logic logout, ví dụ như chuyển hướng đến trang đăng xuất:
        // router.push('/logout');
    };
    return (
        <div className='w-full h-20 pl-14 pr-14 pt-7 pb-7 mb-8'>
            <div className='flex justify-between items-center'>
                <div className='text-3xl font-bold'>Overview</div>
                <div className='flex items-center gap-10'>
                    <div className='relative w-[412px]'>
                        <Input
                            className='rounded-3xl bg-[#D9F6FF] placeholder:text-[#0cbbf0] focus-visible:outline-none focus-visible:outline-[#0cbbf0]'
                            type='search'
                            placeholder='Search'
                        />
                        <Search className='absolute right-3 top-2'
                            size={24}
                            color='#0CBBF0' />
                    </div>
                    <Bell size={24} color='#0cbbf0' />

                    <div className='flex gap-2'>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="flex items-center justify-center">
                            <div className="relative inline-block text-left">
                                <button
                                    type="button"
                                    className="inline-flex justify-center w-full"
                                    onClick={toggleDropdown}
                                >
                                    Account
                                    <svg
                                        className="-mr-1 ml-2 h-5 w-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 01.02-1.06z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>

                                {isOpen && (
                                    <div
                                        className="origin-top-right absolute right-0 mt-4 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                        role="menu"
                                        aria-orientation="vertical"
                                        aria-labelledby="menu-button"
                                    >
                                        <div className="py-1" role="none">
                                            <a
                                                href="#"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                role="menuitem"
                                            >
                                                Profile
                                            </a>
                                            <a
                                                href="#"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                role="menuitem"
                                            >
                                                Settings
                                            </a>
                                            <a
                                                href="#"
                                                onClick={handleLogout}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                role="menuitem"
                                            >
                                                Logout
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
