'use client'
import DialogIF from '@/components/DialogIF'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import AxiosInstance from '@/constants/AxiosInstance'
import { AvatarFallback } from '@radix-ui/react-avatar'
import { EllipsisVertical, ScrollText, TriangleAlert, User, UserRound, UserRoundCheck, UsersRound } from 'lucide-react'
import React, { useEffect, useState } from 'react'

interface StatisticalInfo {
    users: number,
    posts: number,
    reports: number,
    violators: number,
}
interface UserProps {
    _id: string;
    fullname: string;
    avatar: string;
    email: string;
    count_follower: number;
    count_post: string;
    createdAt: string;
}


const DashboardPage = () => {
    const [dataStatisticalInfo, setDataStatisticalInfo] = useState<StatisticalInfo>();
    const [dataUsers, setDataUsers] = useState<UserProps[]>([]);
    const [showDialog, setShowDialog] = useState(false);
    const [selectedUser, setSelectedUser] = useState<string>();
    const [sortType, setSortType] = useState<string>('');
    const [RefreshDataUser, setRefreshDataUser] = useState<boolean>(false)


    const handleSortTypeChange = (value: string) => {
        setSortType(value)
    }


    const fecthStatisticalInfo = async () => {
        try {
            const response = await AxiosInstance().get('/statistical/info');
            setDataStatisticalInfo(response.data);
        } catch (error) {
            console.error(error);
        }
    }
    const fetchTopUsers = async () => {
        try {
            const response = await AxiosInstance().get(`/statistical/celebrity?_page=1&_limit=5&_sort=-1&sort_type=${sortType}`);
            setDataUsers(response.data.list);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        fecthStatisticalInfo()
    }, []);
    useEffect(() => {
        fetchTopUsers()
    }, [sortType]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString); // Chuyển đổi chuỗi thành đối tượng Date
        return date.toLocaleDateString("vi-VN"); // Định dạng theo vùng Việt Nam
    };
    return (
        <div className='pl-12 pr-12 w-full'>
            <div className='pt-8 pb-8 flex items-center justify-between'>
                <span className='font-bold text-[20px]'>Top Featured Users</span>
                <Select value={sortType} onValueChange={handleSortTypeChange}>
                    <SelectTrigger className="w-52">
                        <SelectValue placeholder={sortType || 'Sort type'} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Sort type</SelectLabel>
                            <SelectItem value='celebrity'>Follow sort</SelectItem>
                            <SelectItem value="post">Post sort</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className='flex flex-col gap-4'>
                {
                    dataUsers.map((item, index) => (
                        <div
                            key={index}
                            className='flex w-full h-16 justify-between items-center pr-14 pl-14 border-[1px] border-[#C2D3FF] rounded-2xl'
                            onClick={() => {
                                setShowDialog(true);
                                setSelectedUser(item._id);
                            }}
                        >
                            {/* Avatar */}
                            <div className="flex-none">
                                <Avatar>
                                    <AvatarImage src={item.avatar} alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </div>

                            {/* Full Name */}
                            <div className='flex-1 text-base font-semibold text-[#797D8C] text-center'>
                                {item.fullname}
                            </div>

                            {/* Follower Count */}
                            <div className='flex-1 text-base font-extrabold text-[#04103B] text-center'>
                                {item.count_follower} Follows
                            </div>

                            {/* Post Count */}
                            <div className='flex-1 text-sm font-semibold text-[#797D8C] text-center'>
                                {item.count_post} Posts
                            </div>

                            {/* Created At */}
                            <div className='flex-1 text-sm font-semibold text-[#797D8C] text-center'>
                                From {formatDate(item.createdAt)}
                            </div>

                            {/* Options Icon */}
                            <div className="flex-none">
                                <EllipsisVertical size={24} color='#0CBBF0' />
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className='mt-12 flex justify-between gap-5'>
                <div className='flex-1 h-40 p-4 shadow-xl items-center border-[1px] border-[#98CBF9] rounded-2xl'>
                    <div className='flex w-full h-full items-center justify-between'>
                        <div className='flex flex-col items-center'>
                            <div className='text-[16px] font-bold text-[#1D4E89]'>User Subscribe</div>
                            <div className='text-[32px] font-bold'>{dataStatisticalInfo?.users}</div>
                        </div>
                        <UsersRound size={80} color='black' />
                    </div>
                </div>
                <div className='flex-1 h-40 p-4 shadow-xl border-[1px] border-[#98CBF9] rounded-2xl'>
                    <div className='flex w-full h-full items-center justify-between'>
                        <div className='flex flex-col items-center'>
                            <div className='text-[16px] font-bold text-[#1D4E89]'>Total Post</div>
                            <div className='text-[32px] font-bold'>{dataStatisticalInfo?.posts}</div>
                        </div>
                        <ScrollText size={80} color='black' />
                    </div>
                </div>
                <div className='flex-1 h-40 p-4 shadow-xl border-[1px] border-[#98CBF9] rounded-2xl'>
                    <div className='flex w-full h-full items-center justify-between'>
                        <div className='flex flex-col items-center'>
                            <div className='text-[16px] font-bold text-[#1D4E89]'>Total Post Report</div>
                            <div className='text-[32px] font-bold'>{dataStatisticalInfo?.reports}</div>
                        </div>
                        <TriangleAlert size={80} color='black' />
                    </div>
                </div>
                <div className='flex-1 h-40 p-4 shadow-xl border-[1px] border-[#98CBF9] rounded-2xl'>
                    <div className='flex w-full h-full items-center justify-between'>
                        <div className='flex flex-col items-center'>
                            <div className='text-[16px] font-bold text-[#1D4E89]'>Total Violator</div>
                            <div className='text-[32px] font-bold'>{dataStatisticalInfo?.violators}</div>
                        </div>
                        <User size={80} color='black' />
                    </div>
                </div>
            </div>
            {showDialog && (
                <DialogIF _id={selectedUser} setShowDialog={setShowDialog} setRefreshDataUser={setRefreshDataUser} />
            )}
        </div>
    )
}

export default DashboardPage;

