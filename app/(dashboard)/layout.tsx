'use client'
import React from 'react'
import Cookies from 'js-cookie'
import Header from '@/components/Header'
import SideBar from '@/components/sidebar'
import { useRouter } from 'next/navigation'
import { UserProvider } from '@/src/contexts/UserContext'

const LayoutDashboard = (props: { children: React.ReactNode }) => {
    const router = useRouter()
    const token = Cookies.get('token')
    if (!token) {
        router.replace('/login')
    }

    return (
        <UserProvider>
            <div className='w-full h-full'>
                <main className='lg:bg-[#fcfcfd] flex'>
                    {/* SideBar cố định */}
                    <SideBar
                        className='bg-[#0CBBF0] w-80 h-screen hidden lg:block fixed top-0 left-0'
                    />
                    {/* Nội dung chính có cuộn riêng */}
                    <div
                        className='bg-background w-full lg:rounded-3xl lg:ml-80 lg:overflow-auto'
                    >
                        <div className='w-full h-full'>
                            <header className='sticky top-0 z-10'>
                                <Header />
                            </header>
                            <div className="flex-grow overflow-auto">{props.children}</div>
                        </div>
                    </div>
                </main>
            </div>
        </UserProvider>

    )
}

export default LayoutDashboard
