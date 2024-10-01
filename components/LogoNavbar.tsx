import React from 'react'

interface LogoNavbarProps {
    className?: string;
}
const LogoNavbar: React.FC<LogoNavbarProps> = ({ className }) => {
    return (
        <div className={`flex items-center ${className}`}>
            <img src='/icon-navbar/iconapp.png' className='w-14 h-14' />
            <span className='text-white font-extrabold text-2xl'>Dreams Admin</span>
        </div>
    )
}

export default LogoNavbar
