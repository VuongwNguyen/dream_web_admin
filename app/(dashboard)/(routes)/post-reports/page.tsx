"use client";
import { SquareChevronLeft, SquareChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import AxiosInstance from "../../../../constants/AxiosInstance";
import moment from "moment";

const PostReportPage = () => {
    const [loading, setLoading] = useState(false);
    const [showDialog, setShowDialog] = useState(false);

    // const windowHeight = window.innerHeight
    interface Report {
        _id: string;
        reason: string;
        description: string;
        createAt: string;
        status: string;
        reported_user: {
            _id: string;
            fullname: string;
            email: string;
        };
        judger: {
            _id: string;
            fullname: string;
            email: string;
        };
        reported_content: {
            title: string;
            content: string;
            images: [string];
            videos: [string];
            tagUsers: [string];
            hashtags: [string];
            author: {
                _id: string;
                fullname: string;
                email: string;
            };
        };
    }
    const initialData: Report = {
        _id: "",
        reason: "",
        description: "",
        createAt: "",
        status: "",
        reported_user: {
            _id: "",
            fullname: "",
            email: "",
        },
        judger: {
            _id: "",
            fullname: "",
            email: "",
        },
        reported_content: {
            title: "",
            content: "",
            images: [""],
            videos: [""],
            tagUsers: [""],
            hashtags: [""],
            author: {
                _id: "",
                fullname: "",
                email: "",
            },
        },
    };
    const [data, setData] = useState([initialData]);
    const [maxPage, setMaxPage] = useState(1);
    const [pageSelected, setPageSelected] = useState(1);
    interface BodyJudge {
        report_id: string;
        status: string;
    }
    const handleReport = async ({ report_id, status }: BodyJudge) => {
        try {
            const response = await AxiosInstance().put("/report/report", {
                report_id,
                status,
            });
            alert("Cập nhật trạng thái thành công!");
            fetchData(pageSelected);
        } catch (error) {
            alert("Cập nhật trạng thái thất bại!");
            console.error("Error handling report:", error);
        }
    };
    const fetchData = async (pageNumber: number) => {
        try {
            setLoading(true);
            const response = await AxiosInstance().get(
                `/report/reports?report_type=post&_limit=8&_page=${pageNumber}`
            );
            setData(response.data.list);
            setMaxPage(response.data.page.maxPage);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData(pageSelected);
    }, []);

    const pagination = () => {
        const handlePrevious = () => {
            fetchData(pageSelected - 1);

            setPageSelected((prev) => prev - 1);
        };

        const handleNext = () => {
            fetchData(pageSelected + 1);

            setPageSelected((prev) => prev + 1);
        };

        const getVisiblePages = () => {
            if (maxPage <= 3) {
                return Array.from({ length: maxPage }, (_, i) => i + 1);
            }
            if (pageSelected === 1) {
                return [1, 2, 3];
            } else if (pageSelected === maxPage) {
                return [maxPage - 2, maxPage - 1, maxPage];
            } else {
                return [pageSelected - 1, pageSelected, pageSelected + 1];
            }
        };

        const visiblePages = getVisiblePages();

        return (
            <div className="flex space-x-2">
                {pageSelected > 3 && (
                    <button onClick={handlePrevious}>
                        <SquareChevronLeft size={30} color="#0CBBF0" />
                    </button>
                )}

                {visiblePages.map((page) => (
                    <button
                        key={page}
                        onClick={() => {
                            setPageSelected(page);
                            fetchData(page);
                        }}
                        className={`py-1 px-3 rounded-lg ${page === pageSelected
                                ? "bg-[#0CBBF0] text-white"
                                : "bg-[#D9F6FF] text-[#0CBBF0] hover:bg-[#96E7FF] transition"
                            } transition`}
                    >
                        {page}
                    </button>
                ))}

                {maxPage > 3 && (
                    <button onClick={handleNext}>
                        <SquareChevronRight size={30} color="#0CBBF0" />
                    </button>
                )}
            </div>
        );
    };
    const [dataDialog, setDataDialog] = useState(initialData);
    const dialog = (item: Report) => {
        const handleDisable = item.status !== "pending";
        return (
            <>
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50"></div>
                <div className="w-[70%] py-5 px-10 fixed top-5 left-60 bg-[#fff] h-auto z-50">
                    <h2 className="text-lg font-bold uppercase text-center">
                        Detail report
                    </h2>

                    <div className="flex flex-col gap-2 my-5">
                        <div>
                            <span className="text-base text-[#000] font-semibold">
                                Reporter:
                            </span>
                            <span className="text-base text-[#000] ml-10">
                                {item.reported_user.email}
                            </span>
                        </div>
                        <div className="flex flex-row gap-[200px] items-center ">
                            <div>
                                <span className="text-base text-[#000] font-semibold">
                                    Reported user:
                                </span>
                                <span className="text-base text-[#000] ml-10">
                                    {item.reported_content.author.email}
                                </span>
                            </div>
                            <div>
                                <span className="text-base text-[#000] font-semibold">
                                    Post ID:
                                </span>
                                <span className="text-base text-[#000] ml-10">
                                    {item._id}
                                </span>
                            </div>
                        </div>
                        <div>
                            <span className="text-base text-[#000] font-semibold">
                                Reason:
                            </span>
                            <span className="text-base text-[#000] ml-10">
                                {item.reason}
                            </span>
                        </div>
                        <div>
                            <span className="text-base text-[#000] font-semibold">
                                Description:
                            </span>
                            <span className="text-base text-[#000] ml-10">
                                {item.description}
                            </span>
                        </div>
                        <div>
                            <span className="text-base text-[#000] font-semibold">
                                Data of reported post:
                            </span>
                            <div className="w-full bg-[#e5e7e9] p-4 max-h-[300px] overflow-auto mt-2 flex flex-col gap-[5px]">
                                <div className="flex flex-row gap-[10px]">
                                    <span className="text-base text-[#000] font-medium">
                                        Title:
                                    </span>
                                    <span>{item.reported_content.title}</span>
                                </div>

                                <div className="flex flex-row gap-[10px]">
                                    <span className="text-base text-[#000] font-medium">
                                        Content:
                                    </span>
                                    <span>{item.reported_content.content}</span>
                                </div>

                                {item?.reported_content?.images?.length > 0 && (
                                    <div>
                                        <span className="text-base text-[#000] font-medium">
                                            Images:
                                        </span>
                                        <div className="grid grid-cols-6 gap-4">
                                            {item?.reported_content?.images.map(
                                                (image, index) => (
                                                    <img
                                                        key={index}
                                                        src={image}
                                                        alt={`Image ${index}`}
                                                        className="w-32 h-32 object-coverrounded-md"
                                                    />
                                                )
                                            )}
                                        </div>
                                    </div>
                                )}
                                {item?.reported_content?.hashtags?.length >
                                    0 && (
                                        <div className="flex flex-row gap-[10px]">
                                            <span className="text-base text-[#000] font-medium">
                                                Hashtag:
                                            </span>
                                            <div>
                                                {item?.reported_content?.hashtags.map(
                                                    (tag, index) => (
                                                        <span>#{tag} </span>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    )}
                            </div>
                        </div>
                        {!!item?.status && (
                            <div>
                                <span className="text-base text-[#000] font-semibold">
                                    Status:
                                </span>
                                <span className="text-base text-[#000] ml-10">
                                    {item.status}
                                </span>
                            </div>
                        )}
                        {item?.status !== "pending" && (
                            <div>
                                <span className="text-base text-[#000] font-semibold">
                                    Judger:
                                </span>
                                <span className="text-base text-[#000] ml-10">
                                    {item.judger.email}
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="flex justify-end gap-5">
                        <button
                            disabled={handleDisable}
                            className={`bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded ${handleDisable && "opacity-50"
                                }`}
                            onClick={() => {
                                handleReport({
                                    report_id: item._id,
                                    status: "resolved",
                                });
                                setShowDialog(false);
                            }}
                        >
                            Remove post
                        </button>
                        <button
                            disabled={handleDisable}
                            className={`bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded ${handleDisable && "opacity-50"
                                }`}
                            onClick={() => {
                                handleReport({
                                    report_id: item._id,
                                    status: "rejected",
                                });
                                setShowDialog(false);
                            }}
                        >
                            Dismiss
                        </button>
                        <button
                            className="border-[2px] border-[#6d6e6f] hover:bg-gray-200 text-black font-semibold py-2 px-4 rounded"
                            onClick={() => {
                                setShowDialog(false);
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </>
        );
    };

    return (
        <div className="pl-12 pr-12 w-full">
            <div className="flex w-full mb-4 border-[1px] border-[#C2D3FF] pt-2 pb-2 pr-5 pl-5">
                <div className="flex-[1] text-left text-lg font-bold">Date</div>

                <div className="flex-[2] text-center text-lg font-bold">
                    Reporter
                </div>

                <div className="flex-[2] text-center text-lg font-bold">
                    Reported user
                </div>

                <div className="flex-[2] text-center text-lg font-bold">
                    Post ID
                </div>

                <div className="flex-[2] text-center text-lg font-bold">
                    Reasons
                </div>
                <div className="flex-[2] text-center text-lg font-bold">
                    Description
                </div>
            </div>
            {loading ? (
                <div className=" mt-50  text-center">Loading...</div>
            ) : (
                <div>
                    <div className="flex flex-col gap-4">
                        {data.map((item, index) => (
                            <button
                                key={index}
                                className={`flex flex-row w-full pt-2 pb-2 justify-between items-center pr-5 pl-5 border-[1px] rounded-2xl 
                            ${item?.status === "rejected"
                                        ? "border-green-500"
                                        : item?.status === "resolved"
                                            ? "border-red-500"
                                            : "border-[#C2D3FF]"
                                    }
                            `}
                                onClick={() => {
                                    setShowDialog(true);
                                    setDataDialog(item);
                                }}
                            >
                                <div className="text-base font-regular text-[#797D8C] flex-[1] text-left">
                                    {moment(item.createAt).format("DD/MM/YYYY")}
                                </div>
                                <div className="text-base font-regular text-[#797D8C] flex-[2] text-center truncate">
                                    {item?.reported_user.email}
                                </div>
                                <div className="text-sm font-regular text-[#797D8C] flex-[2] text-center truncate">
                                    {item.reported_content.author.email}
                                </div>
                                <div className="text-sm font-semibold text-[#797D8C] flex-[2] text-center px-2">
                                    {item._id}
                                </div>
                                <div className="text-sm font-regular text-[#797D8C] flex-[2] text-center truncate px-5">
                                    {item.reason}
                                </div>
                                <div className="text-sm font-regular text-[#797D8C] flex-[2] text-center truncate pf-5">
                                    {!!item.description
                                        ? item.description
                                        : "Null"}
                                </div>
                            </button>
                        ))}
                    </div>
                    <div className="fixed bottom-2 left-1/2 transform -translate-x-1/2 ">
                        {pagination()}
                    </div>
                </div>
            )}
            {showDialog && dialog(dataDialog)}
        </div>
    );
};

export default PostReportPage;
