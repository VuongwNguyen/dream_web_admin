"use client";
import AxiosInstance from "@/constants/AxiosInstance";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { EllipsisVertical } from "lucide-react";
import React, { use, useEffect, useState } from "react";
import DialogIF from "@/components/DialogIF";

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
    const [selectedId, setSelectedId] = useState<string>()



    const fetchDataUser = async () => {
        try {
            setIsLoading(true);
            setDataUser([]);
            const response = await AxiosInstance().get(`/statistical/celebrity?_page=${currentPage}&_limit=8&_sort=-1&sort_type=post`);
            setDataUser(response.data.list);
            setMaxPage(response.data.page.max);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchDataUser();
    }, [currentPage]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString); // Chuyển đổi chuỗi thành đối tượng Date
        return date.toLocaleDateString("vi-VN"); // Định dạng theo vùng Việt Nam
    };


    const pageNumbers = Array.from({ length: maxPage }, (_, index) => index + 1);

    return (
        <div className="pl-12 pr-12 w-full">
            <div className="w-full">
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
                        Email
                    </div>
                    <div className="w-1/5 text-center text-base font-bold">
                        Created Date
                    </div>
                    <div className="w-1/5 text-center font-bold">Actions</div>
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
                                {item.email}
                            </div>
                            <div className="w-1/5 text-center text-sm font-semibold text-[#797D8C]">
                                From {formatDate(item.createdAt)}
                            </div>
                            <EllipsisVertical
                                size={24}
                                color="#0CBBF0"
                                className="w-1/5"
                                onClick={() => console.log("Hello")}
                            />
                        </div>
                    ))}
                </div>
                {/* Pagination */}
                <div className="flex items-center justify-center gap-2 mt-4">
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
