"use client";
import AxiosInstance from "@/constants/AxiosInstance";
import React, { useEffect, useState } from "react";
import DialogIF from "@/components/DialogIF";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

interface UserProps {
    _id: string;
    fullname: string;
    email: string;
    count_follower: number;
    count_post: string;
    isBanned: boolean;
    createdAt: string;
}

const UserPage = () => {
    const [dataUser, setDataUser] = useState<UserProps[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [showDialog, setShowDialog] = useState(false);
    const [selectedId, setSelectedId] = useState<string>();
    const [sort, setSort] = useState<string>('');
    const [sortType, setSortType] = useState<string>('');
    const [isBanned, setIsBanned] = useState<boolean>(false);
    const [sortStatus, setSortStatus] = useState<string>('2');
    const [RefreshDataUser, setRefreshDataUser] = useState<boolean>(false)

    const fetchDataUser = async () => {
        try {
            setIsLoading(true);
            setDataUser([]);
            const params: Record<string, any> = {
                _page: currentPage,
                _limit: 7,
            };
            if (sort) params._sort = sort;
            if (sortType) params.sort_type = sortType;
            if (sortStatus) params.ban = sortStatus
            const response = await AxiosInstance().get('/statistical/celebrity', { params });
            setDataUser(response.data.list);
            setMaxPage(response.data.page.max);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
            setRefreshDataUser(false);
        }
    };

    useEffect(() => {
        fetchDataUser();
    }, [currentPage, sort, sortType, sortStatus, RefreshDataUser]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("vi-VN");
    };

    const renderPagination = () => {
        const pageNumbers: number[] = [];
        const visiblePages = 5;

        const startPage = Math.max(currentPage - Math.floor(visiblePages / 2), 1);
        const endPage = Math.min(startPage + visiblePages - 1, maxPage);

        if (startPage > 1) {
            pageNumbers.push(1);
            if (startPage > 2) pageNumbers.push(-1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        if (endPage < maxPage) {
            if (endPage < maxPage - 1) pageNumbers.push(-1);
            pageNumbers.push(maxPage);
        }

        return pageNumbers.map((page, index) =>
            page === -1 ? (
                <div key={`ellipsis-${index}`} className="w-10 h-10 flex items-end justify-center">
                    <span className="font-bold text-base">...</span>
                </div>
            ) : (
                <button
                    key={`page-${page}`}
                    className={`w-10 h-10 ${currentPage === page ? "bg-[#0cbbf0] text-white" : "bg-[#d9f6ff]"} rounded-lg`}
                    onClick={() => setCurrentPage(page)}
                >
                    {page}
                </button>
            )
        );
    };

    return (
        <div className="pl-12 pr-12 w-full">
            <div className="w-full mb-4 mt-4 flex justify-end gap-4">
                <Select value={sort} onValueChange={(value) => setSort(value)}>
                    <SelectTrigger className="w-52">
                        <SelectValue placeholder="Sort" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Sort</SelectLabel>
                            <SelectItem value='-1'>Ascending</SelectItem>
                            <SelectItem value="1">Descending</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Select value={sortType} onValueChange={(value) => setSortType(value)}>
                    <SelectTrigger className="w-52">
                        <SelectValue placeholder="Sort type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Sort type</SelectLabel>
                            <SelectItem value='celebrity'>Follow</SelectItem>
                            <SelectItem value="post">Post</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Select value={sortStatus} onValueChange={(value) => {
                    setSortStatus(value)
                    setCurrentPage(1)
                }}>
                    <SelectTrigger className="w-52">
                        <SelectValue placeholder="Sort status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Sort status</SelectLabel>
                            <SelectItem value="2">All</SelectItem>
                            <SelectItem value="0">Active</SelectItem>
                            <SelectItem value="1">Locked</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            {/* Header table */}
            <div className="w-full border h-16 flex border-[#c2d3ff] items-center">
                <div className="w-1/5 text-center font-bold">No.</div>
                <div className="w-1/5 text-center font-bold">Name</div>
                <div className="w-1/5 text-center font-bold">Follows</div>
                <div className="w-1/5 text-center font-bold">Posts</div>
                <div className="w-1/5 text-center font-bold">Email</div>
                <div className="w-1/5 text-center font-bold">Created Date</div>
                <div className="w-1/5 text-center font-bold">Status</div>
            </div>

            {/* Item list */}
            <div className="w-full flex flex-col gap-4 mt-4">
                {dataUser.map((item, index) => (
                    <div
                        key={index}
                        className="flex w-full h-16 items-center border border-[#C2D3FF] rounded-2xl"
                        onClick={() => {
                            setShowDialog(true);
                            setSelectedId(item._id);
                            setIsBanned(item.isBanned);
                        }}
                    >
                        <div className="w-1/5 text-center">{(currentPage - 1) * 7 + index + 1}</div>
                        <div className="w-1/5 text-center">{item.fullname}</div>
                        <div className="w-1/5 text-center">{item.count_follower} Followers</div>
                        <div className="w-1/5 text-center">{item.count_post} Posts</div>
                        <div className="w-1/5 text-center">{item.email}</div>
                        <div className="w-1/5 text-center">{formatDate(item.createdAt)}</div>
                        <div className="w-1/5 text-center">
                            {item.isBanned ? <span className="text-red-600">Locked</span> : <span className="text-green-500">Active</span>}
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {!isLoading && (
                <div className="flex items-center justify-center gap-2 mt-4 mb-4">
                    <button
                        className="w-10 h-10 bg-[#d9f6ff] rounded-lg"
                        onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
                        disabled={currentPage === 1}
                    >
                        {`<<`}
                    </button>
                    {renderPagination()}
                    <button
                        className="w-10 h-10 bg-[#d9f6ff] rounded-lg"
                        onClick={() => setCurrentPage(currentPage < maxPage ? currentPage + 1 : maxPage)}
                        disabled={currentPage === maxPage}
                    >
                        {`>>`}
                    </button>
                </div>
            )}

            {/* Dialog */}
            {showDialog && (
                <DialogIF
                    _id={selectedId}
                    isBanned={isBanned}
                    setShowDialog={setShowDialog}
                    setRefreshDataUser={setRefreshDataUser}
                />
            )}
        </div>
    );
};

export default UserPage;
