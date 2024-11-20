"use client";
import AxiosInstance from "@/constants/AxiosInstance";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { EllipsisVertical } from "lucide-react";
import React, { use, useEffect, useState } from "react";
import DialogIF from "@/components/DialogIF";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

interface UserProps {
    _id: string;
    fullname: string;
    email: string;
    count_follower: number;
    count_post: string;
    createdAt: string;
}

const UserPage = () => {
    const [dataUser, setDataUser] = useState<UserProps[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [showDialog, setShowDialog] = useState(false);
    const [selectedId, setSelectedId] = useState<string>();
    const [sort, setSort] = useState<string>('-1');
    const [sortType, setSortType] = useState<string>('celebrity');



    const fetchDataUser = async () => {
        try {
            setIsLoading(true);
            setDataUser([]);
            const response = await AxiosInstance().get(`/statistical/celebrity?_page=${currentPage}&_limit=7&_sort=${sort}&sort_type=${sortType}`);
            setDataUser(response.data.list);
            setMaxPage(response.data.page.max);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleSortChange = (value: string) => {
        setSort(value)
    }

    const handleSortTypeChange = (value: string) => {
        setSortType(value)
    }

    useEffect(() => {
        fetchDataUser();
    }, [currentPage, sort, sortType]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString); // Chuyển đổi chuỗi thành đối tượng Date
        return date.toLocaleDateString("vi-VN"); // Định dạng theo vùng Việt Nam
    };


    const pageNumbers = Array.from({ length: maxPage }, (_, index) => index + 1);

    return (
        <div className="pl-12 pr-12 w-full">
            <div className="w-full">
                {/*Sort*/}
                <div className="w-full mb-4 mt-4 flex justify-end gap-4">
                    <Select value={sort} onValueChange={handleSortChange}>
                        <SelectTrigger className="w-52">
                            <SelectValue placeholder="Sort" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Sort</SelectLabel>
                                <SelectItem value='-1'>Ascending sort</SelectItem>
                                <SelectItem value="1">Descending sort</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Select value={sortType} onValueChange={handleSortTypeChange}>
                        <SelectTrigger className="w-52">
                            <SelectValue placeholder="Sort type" />
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
                {/* Header table */}
                <div className="w-full border h-16 flex border-[#c2d3ff] items-center">
                    <div className="w-1/5 text-center text-base font-bold">
                        STT
                    </div>
                    <div className="w-1/5 text-center text-base font-bold">
                        Name
                    </div>
                    <div className="w-1/5 text-center text-base font-bold">
                        Follows
                    </div>
                    <div className="w-1/5 text-center text-base font-bold">
                        Posts
                    </div>
                    <div className="w-1/5 text-center text-base font-bold">
                        Email
                    </div>
                    <div className="w-1/5 text-center font-bold">
                        Created Date
                    </div>
                </div>
                {/* Item  */}
                <div className="w-full flex flex-col gap-4 mt-4">
                    {dataUser.map((item, index) => (
                        <div
                            key={index}
                            className="flex w-full h-16 items-center border border-[#C2D3FF] rounded-2xl"
                            onClick={() => {
                                setShowDialog(true)
                                setSelectedId(item._id)
                            }}
                        >
                            <div className="w-1/5 text-center text-base font-bold">
                                {(currentPage - 1) * 8 + index + 1}
                            </div>
                            <div className="w-1/5 text-center text-base font-semibold text-[#797D8C]">
                                {item.fullname}
                            </div>
                            <div className="w-1/5 text-center text-base font-extrabold text-[#04103B]">
                                {item.count_follower} Follower
                            </div>
                            <div className="w-1/5 text-center text-sm font-semibold text-[#797D8C]">
                                {item.count_post} Posts
                            </div>
                            <div className="w-1/5 text-center text-sm font-semibold text-[#797D8C]">
                                {item.email}
                            </div>
                            <div className="w-1/5 text-center text-sm font-semibold text-[#797D8C]">
                                From {formatDate(item.createdAt)}
                            </div>
                        </div>
                    ))}
                </div>
                {/* Pagination */}
                <div className="flex items-center justify-center gap-2 mt-4 mb-4">
                    <button
                        className="w-10 h-10 bg-[#d9f6ff] rounded-lg"
                        onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
                        disabled={currentPage === 1}
                    >
                        <div className="text-[#0cbbf0]">{`<<`}</div>
                    </button>
                    <div className="flex gap-2">
                        {pageNumbers.map((page) => (
                            <button
                                key={page}
                                className={`w-10 h-10 ${currentPage === page ? "bg-[#0cbbf0] text-white" : "bg-[#d9f6ff]"} rounded-lg`}
                                onClick={() => setCurrentPage(page)}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                    <button
                        className="w-10 h-10 bg-[#d9f6ff] rounded-lg"
                        onClick={() => setCurrentPage(currentPage < maxPage ? currentPage + 1 : maxPage)}
                        disabled={currentPage === maxPage}
                    >
                        <div className="text-[#0cbbf0]">{`>>`}</div>
                    </button>
                </div>
            </div>

            {showDialog && (
                <DialogIF _id={selectedId} setShowDialog={setShowDialog} />
            )}
        </div>
    );
};

export default UserPage;
