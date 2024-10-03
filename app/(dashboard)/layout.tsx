'use client'
import SideBar from '@/components/sidebar'
import React from 'react'

const LayoutDashboard = (props: { children: React.ReactNode }) => {
    return (
        <div className='w-full h-full'>
            <main className='lg:bg-[#fcfcfd] flex lg:overflow-hidden'>
                <SideBar className='bg-[#0CBBF0] w-80 h-screen hidden lg:block' />
                <div className='bg-background h-full lg:rounded-3xl'>
                    <div className='w-full h-full'>
                        {/* <header className='h-16'>
                            <h1 className='text-2xl text-white'>Dreams Admin</h1>
                        </header> */}
                        {props.children}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default LayoutDashboard