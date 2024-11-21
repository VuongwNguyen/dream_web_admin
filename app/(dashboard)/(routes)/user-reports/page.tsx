"use client";
import { SquareChevronLeft, SquareChevronRight  } from "lucide-react";
import React, { useEffect, useState } from "react";
import AxiosInstance from "@/constants/AxiosInstance";
import DialogReport from "@/components/DialogReport";

const UserReportPage = () => {
    //useState Report[]
    const [data, setData] = useState<Report[]>([]);
    const [showDialog, setShowDialog] = useState(false);
    const [dataDialog, setDataDialog] = useState<Report>();
    const pageTotal = Math.ceil((data?.length || 0) / 10);
    const [pageSelected, setPageSelected] = useState(1);
    const [RefreshDateReport, setRefreshDateReport] = useState(false);
    const [indexS, setIndexS] = useState(0);
    const [indexE, setIndexE] = useState(data?.length < 9 ? data?.length : 9);
    const [judge, setJudge] = useState("0");

    useEffect(() => {
        AxiosInstance()
            .get("/report/reports?report_type=user")
            .then((res) => {
                setData(res.data.list);
                setRefreshDateReport(false);
            });
    }, [RefreshDateReport]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString); // Chuyển đổi chuỗi thành đối tượng Date
        return date.toLocaleDateString("vi-VN"); // Định dạng theo vùng Việt Nam
    };

    const pagination = () => {
        const handlePrevious = () => {
            if (pageSelected * 9 < data.length) {
                setIndexE(indexE - 9);
            } else {
                setIndexE(indexE - 9 + (pageSelected * 9 - data.length));
            }
            setPageSelected((prev) => prev - 1);
            setIndexE(indexE - 9);
            setIndexS(indexS - 9);
            console.log("prev", pageSelected, indexS, indexE);
        };

        const handleNext = () => {
            setPageSelected((prev) => prev + 1);
            if (pageSelected * 9 < data.length) {
                setIndexE((prev) => prev + 9);
            } else setIndexE(data.length);
            setIndexS(indexS + 9);
            console.log("next", pageSelected, indexS, indexE);
        };

        const getVisiblePages = () => {
            if (pageTotal <= 3) {
                return Array.from({ length: pageTotal }, (_, i) => i + 1);
            }
            if (pageSelected === 1) {
                return [1, 2, 3];
            } else if (pageSelected === pageTotal) {
                return [pageTotal - 2, pageTotal - 1, pageTotal];
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
                            if (page * 9 < data.length) {
                                setIndexE(page * 9);
                            } else {
                                setIndexE(data.length);
                            }
                            setIndexS(page * 9 - 9);
                        }}
                        className={`py-1 px-3 rounded-lg ${
                            page === pageSelected
                                ? "bg-[#0CBBF0] text-white"
                                : "bg-[#D9F6FF] text-[#0CBBF0] hover:bg-[#96E7FF] transition"
                        } transition`}
                    >
                        {page}
                    </button>
                ))}

                {pageTotal > 3 && (
                    <button onClick={handleNext}>
                        <SquareChevronRight size={30} color="#0CBBF0" />
                    </button>
                )}
            </div>
        );
    };

    return (
        <div className="h-full w-full pl-12 pr-12">
            <div className="flex w-full mb-4 border-[1px] border-[#C2D3FF] py-2 px-5">
                <div className="flex-1 text-center text-lg font-bold">Date</div>
                <div className="flex-1 text-center text-lg font-bold">
                    Reporter
                </div>
                <div className="flex-1 text-center text-lg font-bold">
                    Reported user
                </div>
                <div className="flex-[2] text-center text-lg font-bold">
                    Reasons
                </div>
            </div>
            <div className="flex flex-col w-full gap-4">
                {data &&
                    data.length > 0 &&
                    data.map((item, index) => {
                        return (
                            <button
                                key={index}
                                className={
                                    item.status === "pending"
                                        ? "flex flex-row w-full pt-2 pb-2 justify-between items-center pr-5 pl-5 border-[1px] border-[#C2D3FF] rounded-2xl"
                                        : item.status === "rejected"
                                        ? "flex flex-row w-full pt-2 pb-2 justify-between items-center pr-5 pl-5 border-[1px] border-[#FFC0C0] rounded-2xl"
                                        : "flex flex-row w-full pt-2 pb-2 justify-between items-center pr-5 pl-5 border-[1px] border-[#46f646] rounded-2xl"
                                }
                                onClick={() => {
                                    setShowDialog(true);
                                    setDataDialog(item);
                                }}
                            >
                                <div className="text-base font-regular text-[#797D8C] flex-[1] text-center">
                                    {formatDate(item.createdAt)}
                                </div>
                                <div className="text-base font-regular text-[#797D8C] flex-[1] text-center truncate">
                                    {item.reported_user.fullname}
                                </div>
                                <div className="text-sm font-semibold text-[#797D8C] flex-[1] text-center truncate">
                                    {item.reported_content.email}
                                </div>
                                <div className="text-sm font-regular text-[#797D8C] flex-[2]  truncate text-center">
                                    {item.reason}
                                </div>
                            </button>
                        );
                    })}
            </div>
            <div className="fixed bottom-2 left-1/2 transform -translate-x-1/2">
                {pagination()}
            </div>
            {showDialog && dataDialog && (
                <DialogReport
                    item={dataDialog}
                    setShowDialog={setShowDialog}
                    setRefreshDateReport={setRefreshDateReport}
                />
            )}
        </div>
    );
};

export default UserReportPage;
