import React, { memo, useEffect, useState } from "react";
import AxiosInstance from "@/constants/AxiosInstance";
import { Select } from "@radix-ui/react-select";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Post } from "@/interfaces/post";
import ItemPost from "./ItemPost";

interface DialogProps {
    item: Report;
    setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
    setRefreshDataReport: React.Dispatch<React.SetStateAction<boolean>>
}

const DialogReport: React.FC<DialogProps> = ({ item, setShowDialog, setRefreshDataReport }) => {
    const [loading, setLoading] = useState(false);
    const [dataPost, setDataPost] = useState<Post[]>([]);
    const [maxPage, setMaxPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [judge, setJudge] = useState("0");

    const handleRoleChange = () => {
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

        const body = {
            report_id: item._id,
            status: judge === "0" ? "rejected" : "resolved",
            date_of_judge: today,
        };

        AxiosInstance().put("/report/report", body).then(() => {
            setShowDialog(false);
            setRefreshDataReport(true)
        });
    };

    const fetchData = async () => {
        try {
            setLoading(true);
            setDataPost([]);
            const response = await AxiosInstance().get(
                `statistical/posts?user_id=${item.reported_content._id}&_page=${currentPage}&_limit=12`
            );
            setDataPost(response.data.list);
            setMaxPage(response.data.page.max);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [currentPage, item.reported_content._id]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString("vi-VN");
        const formattedTime = date.toLocaleTimeString("vi-VN", { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        return `${formattedDate} ${formattedTime}`;
    };

    // Tạo danh sách các trang từ 1 đến maxPage
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
                    <span key={index} className="font-bold text-base">...</span>
                </div>
            ) : (
                <button
                    key={`ellipsis-${index}`}
                    className={`w-10 h-10 ${currentPage === page ? "bg-[#0cbbf0] text-white" : "bg-[#d9f6ff]"} rounded-lg`}
                    onClick={() => setCurrentPage(page)}
                >
                    {page}
                </button>
            )
        );
    };



    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50"></div>
            <div className="w-[70%] py-5 fixed px-10 top-1 left-60 bg-[#fff] h-[98%] z-50 overflow-auto">
                <h2 className="text-lg font-bold uppercase text-center">Detail report</h2>
                <div className="flex flex-row gap-[200px] items-center mb-4 mt-5">
                    <div className="flex flex-col gap-4">
                        <div>
                            <span className="text-base text-[#000] font-semibold">Reporter:</span>
                            <span className="text-base text-[#000] ml-10">{item.reported_user.fullname}</span>
                        </div>
                        <div>
                            <span className="text-base text-[#000] font-semibold">Content:</span>
                            <span className="text-base text-[#000] ml-10">{item.reason}</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div>
                            <span className="text-base text-[#000] font-semibold">Reported user:</span>
                            <span className="text-base text-[#000] ml-10">{item.reported_content.fullname}</span>
                        </div>
                        <div >
                            <span className="text-base text-[#000] font-semibold">Reporting time:</span>
                            <span className="text-base text-[#000] ml-10">{formatDate(item.createdAt)}</span>
                        </div>
                    </div>

                </div>
                <div className="mb-5">
                    <span className="text-base text-[#000] font-semibold">Data of reported user:</span>
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
                    {renderPagination()}
                    <button
                        className="w-10 h-10 bg-[#d9f6ff] rounded-lg"
                        onClick={() => setCurrentPage(currentPage < maxPage ? currentPage + 1 : maxPage)}
                        disabled={currentPage === maxPage}
                    >
                        <div className="text-[#0cbbf0]">{`>>`}</div>
                    </button>
                </div>

                <div className="flex justify-end gap-5 mt-4">
                    <div className="flex-1">
                        {!!item?.status && (
                            <div>
                                <span className="text-xl text-[#000] font-semibold">
                                    Status:
                                </span>
                                <span className={`text-xl ${item.status == 'pending' ? 'text-[#0CBBF0]' : item.status == 'rejected' ? 'text-red-500' : 'text-green-500'} ml-5`}>
                                    {item.status}
                                </span>
                            </div>
                        )}
                        {item?.status !== "pending" && (
                            <div>
                                <span className="text-xl text-[#000] font-semibold">
                                    Judger:
                                </span>
                                <span className="text-xl text-[#000] ml-5">
                                    {item.judger.fullname}
                                </span>
                            </div>
                        )}
                        {item?.status !== "pending" && (
                            <div>
                                <span className="text-xl text-[#000] font-semibold">
                                    Processing time:
                                </span>
                                <span className="text-xl text-[#000] ml-5">
                                    {formatDate(item.updatedAt)}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex items-center justify-end gap-5">
                    {
                        item.status === 'pending' &&
                        <div className="flex items-center gap-5">
                            <div className="w-60">
                                <span className="text-lg font-semibold">Day of judge</span>
                            </div>
                            <Select
                                onValueChange={(value) => setJudge(value)}
                            >
                                <SelectTrigger className="w-4/5">
                                    <SelectValue placeholder={judge === '0' && 'No processing'} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0">No processing</SelectItem>
                                    <SelectItem value="1">1 day</SelectItem>
                                    <SelectItem value="2">3 days</SelectItem>
                                    <SelectItem value="3">7 days</SelectItem>
                                    <SelectItem value="4">1 month</SelectItem>
                                    <SelectItem value="5">Permanent</SelectItem>
                                </SelectContent>
                            </Select>
                            <button
                                onClick={handleRoleChange}
                                className={item.status === "pending" ? "bg-green-500 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded" : "bg-green-400 text-white font-semibold py-2 px-4 rounded"}
                            >
                                Resolve
                            </button>
                        </div>
                    }
                    <button
                        className="h-12 border-[2px] border-[#6d6e6f] hover:bg-gray-200 text-black font-semibold py-2 px-4 rounded"
                        onClick={() => setShowDialog(false)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </>
    );
};

export default memo(DialogReport);
