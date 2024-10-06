'use client'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { AvatarFallback } from '@radix-ui/react-avatar'
import { EllipsisVertical, ScrollText, TriangleAlert, User, UserRound, UserRoundCheck, UsersRound } from 'lucide-react'
import React, { useState } from 'react'



const DashboardPage = () => {
    const [data, setData] = useState(fakeDataTopUser);
    return (
        <div className='pl-12 pr-12 w-full'>
            <div className='pt-8 pb-8'>
                <span className='font-bold text-[20px]'>Top Featured Users</span>
            </div>
            <div className='flex flex-col gap-4'>
                {
                    data.map((item, index) => (
                        <div key={index} className='flex w-full h-16 justify-between items-center pr-14 pl-14 border-[1px] border-[#C2D3FF] rounded-2xl'>
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className='text-base font-semibold text-[#797D8C]'>Nicholas Patrick</div>
                            <div className='text-base font-extrabold text-[#04103B]'> 2540.58 Follows</div>
                            <div className='text-sm font-semibold text-[#797D8C]'>150 Posts</div>
                            <div className='text-sm font-semibold text-[#797D8C]'>From 02/12/2010</div>
                            <EllipsisVertical size={24} color='#0CBBF0' />
                        </div>
                    ))
                }
            </div>
            <div className='mt-12 flex justify-between gap-5'>
                <div className='flex-1 h-40 p-4 shadow-xl items-center border-[1px] border-[#98CBF9] rounded-2xl'>
                    <div className='flex w-full h-full items-center justify-between'>
                        <div className='flex flex-col items-center'>
                            <div className='text-[16px] font-bold text-[#1D4E89]'>User Subscribe</div>
                            <div className='text-[32px] font-bold'>25.1k</div>
                        </div>
                        <UsersRound size={80} color='black' />
                    </div>
                </div>
                <div className='flex-1 h-40 p-4 shadow-xl border-[1px] border-[#98CBF9] rounded-2xl'>
                    <div className='flex w-full h-full items-center justify-between'>
                        <div className='flex flex-col items-center'>
                            <div className='text-[16px] font-bold text-[#1D4E89]'>Total Post</div>
                            <div className='text-[32px] font-bold'>2,435k</div>
                        </div>
                        <ScrollText size={80} color='black' />
                    </div>
                </div>
                <div className='flex-1 h-40 p-4 shadow-xl border-[1px] border-[#98CBF9] rounded-2xl'>
                    <div className='flex w-full h-full items-center justify-between'>
                        <div className='flex flex-col items-center'>
                            <div className='text-[16px] font-bold text-[#1D4E89]'>Total Post Report</div>
                            <div className='text-[32px] font-bold'>3.5M</div>
                        </div>
                        <TriangleAlert size={80} color='black' />
                    </div>
                </div>
                <div className='flex-1 h-40 p-4 shadow-xl border-[1px] border-[#98CBF9] rounded-2xl'>
                    <div className='flex w-full h-full items-center justify-between'>
                        <div className='flex flex-col items-center'>
                            <div className='text-[16px] font-bold text-[#1D4E89]'>Total Violator</div>
                            <div className='text-[32px] font-bold'>1M</div>
                        </div>
                        <User size={80} color='black' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage;

const fakeDataTopUser = [
    {
        avatar: 'https://github.com/shadcn.png',
        name: 'Nicholas Patrick',
        follows: 2540.58,
        posts: 150,
        joined: '02/12/2010',
    },
    {
        avatar: 'https://github.com/shadcn.png',
        name: 'Nicholas Patrick',
        follows: 2540.58,
        posts: 150,
        joined: '02/12/2010',
    },
    {
        avatar: 'https://github.com/shadcn.png',
        name: 'Nicholas Patrick',
        follows: 2540.58,
        posts: 150,
        joined: '02/12/2010',
    },
    {
        avatar: 'https://github.com/shadcn.png',
        name: 'Nicholas Patrick',
        follows: 2540.58,
        posts: 150,
        joined: '02/12/2010',
    },
    {
        avatar: 'https://github.com/shadcn.png',
        name: 'Nicholas Patrick',
        follows: 2540.58,
        posts: 150,
        joined: '02/12/2010',
    },
]