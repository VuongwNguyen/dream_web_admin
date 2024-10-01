import React from 'react'
import LogoNavbar from '../LogoNavbar'
import Navbar from './navbar'


interface SideBarProps {
    className?: string
}

const SideBar: React.FC<SideBarProps> = ({ className }) => {
    return (
        <div className={`text-black ${className}`}>
            <div className='h-20 pl-7 pr-6 py-7'>
                <div className=' flex items-center w-full'>
                    <LogoNavbar />
                </div>
            </div>
            <div className='px-7 pt-7 pb-4'>
                <div className='border-[1px] w-full' />
            </div>
            {/* Navigation */}
            <div className='grow overflow-y-auto scroll-smooth scrollbar-none'>
                <Navbar />
            </div>
        </div>
    )
}

export default SideBar
