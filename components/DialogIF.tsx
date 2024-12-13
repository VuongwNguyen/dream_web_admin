import React, { memo, useEffect, useState } from "react";
import AxiosInstance from "@/constants/AxiosInstance";
import { Select } from "@radix-ui/react-select";
import { SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Post } from "@/interfaces/post";
import ItemPost from "./ItemPost";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

interface DialogProps {
    _id?: string;
    isBanned?: boolean
    setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
    setRefreshDateUser: React.Dispatch<React.SetStateAction<boolean>>
}

interface UserIF {
    _id: string;
    fullname: string;
    followingCount: number;
    followerCount: number;
    postCount: number;
    avatar: string;
    isBanned: boolean
}


const DialogIF: React.FC<DialogProps> = ({ _id, isBanned, setShowDialog, setRefreshDateUser }) => {
    const [loading, setLoading] = useState(false);
    const [dataPost, setDataPost] = useState<Post[]>([]);
    const [userIF, setUserIF] = useState<UserIF>()
    const [maxPage, setMaxPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [judge, setJudge] = useState("0");
    const [selectReason, setSelectReason] = useState<string>('');
    const [selectDay, setSelectDay] = useState<string>('')


    const fetchData = async () => {
        try {
            setLoading(true);
            setDataPost([]);
            const response = await AxiosInstance().get(
                `statistical/posts?user_id=${_id}&_page=${currentPage}&_limit=12`
            );
            setDataPost(response.data.list);
            setMaxPage(response.data.page.max);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const fecthDataUser = async () => {
        try {
            setLoading(true);
            const response = await AxiosInstance().get(`/infomation/get-infomation?user_id_view=${_id}`);
            setUserIF(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [currentPage, _id]);

    useEffect(() => {
        fecthDataUser();
    }, [_id]);

    const handleSelectReason = (value: string) => {
        setSelectReason(value);
    }
    const handleSelecDay = (value: string) => {
        setSelectDay(value);;
    }

    const handleLockUnLockUser = async () => {
        try {
            let today: Date | null = new Date();
            switch (judge) {
                case "1":
                    today.setDate(today.getDate() + 1);
                    break;
                case "2":
                    today.setDate(today.getDate() + 3);
                    break;
                case "3":
                    today.setDate(today.getDate() + 7);
                    break;
                case "4":
                    today.setDate(today.getDate() + 30);
                    break;
                case "5":
                    today = null;
                    break;
            }
            if (!isBanned) {
                if (!selectDay || !selectDay) {
                    alert("Please select reason and date of ban");
                    return;
                }
            }
            const body = {
                user_id: _id,
                date_of_judge: today,
                reason: selectReason
            }
            const response = await AxiosInstance().put(`/admin/lock-unlock-user`, body)
            if (response.status) {
                alert("Cập nhật trạng thái thành công!");
                setShowDialog(false);
                setRefreshDateUser(true)
            }
        } catch (error) {

        }
    }




    // Tạo danh sách các trang từ 1 đến maxPage
    const pageNumbers = Array.from({ length: maxPage }, (_, index) => index + 1);

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50"></div>
            <div className="w-[70%] py-5 px-10 fixed top-1 left-60 bg-[#fff] h-[98%] z-50 overflow-auto">
                <h2 className="text-lg font-bold uppercase text-center">Detail User</h2>
                <div className="flex flex-row gap-5 items-center mb-4 mt-5">
                    <div>
                        <Avatar className="w-14 h-14">
                            <AvatarImage src={userIF?.avatar} alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="flex gap-5">
                        <div>
                            <div className="font-bold text-lg">Followers</div>
                            <div className="text-center text-base">{userIF?.followerCount}</div>
                        </div>
                        <div>
                            <div className="font-bold text-lg">Following</div>
                            <div className="text-center text-base">{userIF?.followingCount}</div>
                        </div>
                        <div>
                            <div className="font-bold text-lg">Posts</div>
                            <div className="text-center text-base">{userIF?.postCount}</div>
                        </div>
                    </div>
                </div>
                <div className="mb-4">
                    <span className="text-lg text-[#000] font-semibold">{userIF?.fullname}</span>

                </div>
                <div className="mb-5">
                    <span className="text-base text-[#000] font-semibold">Data of user:</span>
                    <div className="w-full flex flex-wrap gap-3 bg-[#e5e7e9] p-10 h-[500px] overflow-auto mt-2">
                        {dataPost.map((post, index) => (
                            <div className="w-[calc(33.3%-10px)]" key={index}>
                                <ItemPost
                                    author={post.author}
                                    title={post.title}
                                    content={post.content}
                                    createdAt={post.createdAt}
                                    privacy_status={post.privacy_status}
                                    images={post.images}
                                    likeCount={post.likeCount}
                                    commentCount={post.commentCount}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pagination Controls */}
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

                <div className="flex justify-end gap-5 mt-4">
                    <div className="flex items-center gap-10">
                        {
                            isBanned ?
                                <div>
                                    <Button className="bg-green-500 hover:bg-green-500" onClick={handleLockUnLockUser}>
                                        Unlock
                                    </Button>
                                </div>
                                :
                                <div className="flex items-center gap-3">
                                    <Select value={selectReason} onValueChange={handleSelectReason}>
                                        <SelectTrigger className="w-52">
                                            <SelectValue placeholder="Select Reason" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Select Reason</SelectLabel>
                                                <SelectItem value='Impersonating someone else'>Impersonating someone else</SelectItem>
                                                <SelectItem value='Fake account Descending sort'>Fake account Descending sort</SelectItem>
                                                <SelectItem value='Fake name'>Fake name</SelectItem>
                                                <SelectItem value='Harassment or bullying'>Harassment or bullying</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <Select value={selectDay} onValueChange={handleSelecDay}>
                                        <SelectTrigger className="w-52">
                                            <SelectValue placeholder="Date of judge" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Date of judge</SelectLabel>
                                                <SelectItem value="1">1 day</SelectItem>
                                                <SelectItem value="2">3 days</SelectItem>
                                                <SelectItem value="3">7 days</SelectItem>
                                                <SelectItem value="4">1 month</SelectItem>
                                                <SelectItem value="5">Permanent</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <Button className="bg-red-500 hover:bg-red-500" onClick={handleLockUnLockUser}>
                                        Lock
                                    </Button>
                                </div>
                        }
                    </div>
                    <Button variant='outline' onClick={() => setShowDialog(false)}>
                        Cancel
                    </Button>
                </div>
            </div>
        </>
    );
};

export default memo(DialogIF);
