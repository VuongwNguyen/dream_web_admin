"use client";
import {
    EllipsisVertical,
    SquareChevronLeft,
    SquareChevronRight,
} from "lucide-react";
import React, { useEffect, useState } from "react";

const UserReportPage = () => {
    const [data, setData] = useState(fakeDataUserReport);
    const [showDialog, setShowDialog] = useState(false);

    const pageTotal = Math.ceil(data.length / 10);
    const [pageSelected, setPageSelected] = useState(1);
    const [indexS, setIndexS] = useState(0);
    const [indexE, setIndexE] = useState(data.length < 9 ? data.length : 9);

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
    interface Report {
        reporter: string;
        reported: string;
        content: string;
        desc: string;
        create_at: string;
        status: string;
    }
    const initialData: Report = {
        reporter: "",
        reported: "",
        content: "",
        desc: "",
        create_at: "",
        status: "",
    };
    const [dataDialog, setDataDialog] = useState(initialData);
    const dialog = (item: Report) => {
        return (
            <>
                <div className="fixed inset-0 bg-black bg-opacity-50 z-1"></div>
                <div className="w-[70%] py-5 px-10 fixed top-5 left-60 bg-[#fff] h-auto z-2">
                    <h2 className="text-lg font-bold uppercase text-center">
                        Detail report
                    </h2>
                    <div className="flex flex-col gap-2 my-5">
                        <div className="flex flex-row gap-[200px] items-center">
                            <div>
                                <span className="text-base text-[#000] font-semibold">
                                    Reporter:
                                </span>
                                <span className="text-base text-[#000] ml-10">
                                    {item.reporter}
                                </span>
                            </div>
                            <div>
                                <span className="text-base text-[#000] font-semibold">
                                    Reported user:
                                </span>
                                <span className="text-base text-[#000] ml-10">
                                    {item.reported}
                                </span>
                            </div>
                        </div>
                        <div>
                            <span className="text-base text-[#000] font-semibold">
                                Content:
                            </span>
                            <span className="text-base text-[#000] ml-10">
                                {item.content}
                            </span>
                        </div>
                        <div>
                            <span className="text-base text-[#000] font-semibold">
                                Description:
                            </span>
                            <span className="text-base text-[#000] ml-10">
                                {item.desc}
                            </span>
                        </div>
                        <div>
                            <span className="text-base text-[#000] font-semibold">
                                Data of reported user:
                            </span>
                            <div className="w-full bg-[#e5e7e9] p-10 h-[350px] overflow-auto mt-2">
                                <p>Log data of user reported</p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Phasellus eget facilisis
                                    ligula. Duis non nulla tellus. Nulla
                                    facilisi. Integer volutpat euismod ligula
                                    sed vestibulum. Praesent at leo id urna
                                    viverra vestibulum in quis erat.
                                </p>
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
                    </div>
                    <div className="flex justify-end gap-5">
                        <button
                            className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded"
                            onClick={() => {
                                item.status = "Warming";
                                setShowDialog(false);
                            }}
                        >
                            Warning
                        </button>

                        <button
                            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                            onClick={() => {
                                item.status = "Blocking";
                                setShowDialog(false);
                            }}
                        >
                            Blocking
                        </button>

                        <button
                            className="bg-black hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded"
                            onClick={() => {
                                item.status = "Permanent Ban";
                                setShowDialog(false);
                            }}
                        >
                            Permanent Ban
                        </button>
                        <button
                            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
                            onClick={() => {
                                item.status = "Dismiss";
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
                <div className="flex-[2] text-center text-lg font-bold">
                    Description
                </div>

            </div>
            <div className="flex flex-col gap-4">
                {data.slice(indexS, indexE).map((item, index) => (
                    <button
                        key={index}
                        className={`flex flex-row w-full pt-2 pb-2 justify-between items-center pr-5 pl-5 border-[1px] rounded-2xl 
                            ${
                                item?.status
                                    ? item.status === "Dismiss"
                                        ? "border-green-500"
                                        : "border-red-500"
                                    : "border-[#C2D3FF]"
                            }`}
                        onClick={() => {
                            setShowDialog(true);
                            setDataDialog(item);
                        }}
                    >
                        <div className="text-base font-regular text-[#797D8C] flex-[1] text-center">
                            {item.create_at}
                        </div>
                        <div className="text-base font-regular text-[#797D8C] flex-[1] text-center truncate">
                            {item.reporter}
                        </div>
                        <div className="text-sm font-semibold text-[#797D8C] flex-[1] text-center truncate">
                            {item.reported}
                        </div>
                        <div className="text-sm font-regular text-[#797D8C] flex-[2]  truncate px-5 text-left">
                            {item.content}
                        </div>
                        <div className="text-sm font-regular text-[#797D8C] flex-[2]  truncate ">
                            {item.desc}
                        </div>
                    </button>
                ))}
            </div>
            <div className="flex flex-row items-center justify-center my-5  ">
                {pagination()}
            </div>
            {showDialog && dialog(dataDialog)}
        </div>
    );
};

export default UserReportPage;

const fakeDataUserReport = [
    {
        reporter: "abc@gmail.com",
        reported: "123@gmail.com",
        content: "This user has violated community standards.",
        desc: "abc",
        create_at: "02/12/2010",
        status: "",
    },
    {
        reporter: "abcdefg@gmail.com",
        reported: "123@gmail.com",
        content:
            "This account has harassing behavior, unhealthy content, the user has violated privacy policy and community standards.",
        desc: "abc",
        create_at: "02/12/2010",
        status: "",
    },
    {
        reporter: "abc@gmail.com",
        reported: "123@gmail.com",
        content: "This user has violated community standards.",
        desc: "abc",
        create_at: "02/12/2010",
        status: "",
    },
    {
        reporter: "abc@gmail.com",
        reported: "123@gmail.com",
        content:
            "This account has harassing behavior, unhealthy content, the user has violated privacy policy and community standards.",
        desc: "abc",
        create_at: "02/12/2010",
        status: "",
    },
    {
        reporter: "abc@gmail.com",
        reported: "123@gmail.com",
        content: "This user has violated community standards.",
        desc: "abc",
        create_at: "02/12/2010",
        status: "",
    },
    {
        reporter: "abc@gmail.com",
        reported: "123@gmail.com",
        content:
            "This account has harassing behavior, unhealthy content, the user has violated privacy policy and community standards.",
        desc: "abc",
        create_at: "02/12/2010",
        status: "",
    },
    {
        reporter: "abc@gmail.com",
        reported: "123@gmail.com",
        content: "This user has violated community standards.",
        desc: "abc",
        create_at: "02/12/2010",
        status: "",
    },
    {
        reporter: "abc@gmail.com",
        reported: "123@gmail.com",
        content: "This user has violated community standards.",
        desc: "abc",
        create_at: "02/12/2010",
        status: "",
    },
    {
        reporter: "abc@gmail.com",
        reported: "123@gmail.com",
        content:
            "This account has harassing behavior, unhealthy content, the user has violated privacy policy and community standards.",
        desc: "abc",
        create_at: "02/12/2010",
        status: "",
    },
    {
        reporter: "abc@gmail.com",
        reported: "123@gmail.com",
        content: "This user has violated community standards.",
        desc: "abc",
        create_at: "02/12/2010",
        status: "",
    },
    {
        reporter: "abc@gmail.com",
        reported: "123@gmail.com",
        content:
            "This account has harassing behavior, unhealthy content, the user has violated privacy policy and community standards.",
        desc: "abc",
        create_at: "02/12/2010",
        status: "",
    },
    {
        reporter: "a@gmail.com",
        reported: "1@gmail.com",
        content: "This user has violated community standards.",
        desc: "abc",
        create_at: "02/12/2010",
        status: "",
    },
    {
        reporter: "abc@gmail.com",
        reported: "123@gmail.com",
        content:
            "This account has harassing behavior, unhealthy content, the user has violated privacy policy and community standards.",
        desc: "abc",
        create_at: "02/12/2010",
        status: "",
    },
    {
        reporter: "abc@gmail.com",
        reported: "123@gmail.com",
        content: "This user has violated community standards.",
        desc: "abc",
        create_at: "02/12/2010",
        status: "",
    },
    {
        reporter: "abc@gmail.com",
        reported: "123@gmail.com",
        content:
            "This account has harassing behavior, unhealthy content, the user has violated privacy policy and community standards.",
        desc: "abc",
        create_at: "02/12/2010",
        status: "",
    },
];
