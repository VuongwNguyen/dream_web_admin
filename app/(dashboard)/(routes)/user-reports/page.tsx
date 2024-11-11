"use client";
import axios from "axios";
import {
    EllipsisVertical,
    SquareChevronLeft,
    SquareChevronRight,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import  AxiosInstance from "../../../config/axiosInstance";
import { Select } from "@radix-ui/react-select";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const UserReportPage = () => {
    //useState Report[]
    const [data, setData]  = useState<Report[]>([]);
    const [showDialog, setShowDialog] = useState(false);

    const pageTotal = Math.ceil((data?.length || 0) / 10);
    const [pageSelected, setPageSelected] = useState(1);
    const [indexS, setIndexS] = useState(0);
    const [indexE, setIndexE] = useState(data?.length < 9 ? data?.length : 9);
    const [judge, setJudge] = useState("0");

    useEffect(() => {
        AxiosInstance().get("/report/reports?report_type=user")
        .then((res) => {
                setData(res.data.list)
            });
    }, []);

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
        _id: string;
        reason: string;
        status: string;
        description: string;
        createdAt: string;
        reported_user: any;
        reported_content: any
    }
    const initialData: Report = {
        _id: "",
        reason: "",
        status: "",
        description: "",
        createdAt: "",
        reported_user: {},
        reported_content: {}
    };
    const [dataDialog, setDataDialog] = useState(initialData);
    const dialog = (item: Report) => {
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
                    today = null
                    break;
            }
            console.log(today);
            console.log(judge);
            
            const body = {
                report_id: item._id,
                status: judge === "0" ? "rejected" : "resolved",
                date_of_judge: today
            }
            AxiosInstance().put('/report/report',body)
                .then((res) => {
                    setShowDialog(false);                    
                    setData(data.filter((i) => i._id !== item._id));
                })
        };
        return (
            <>
                <div className="fixed inset-0 bg-black bg-opacity-50 z-1"></div>
                <div className="w-[70%] py-5 px-10 fixed top-5 left-60 bg-[#fff] h-auto z-2">
                    <h2 className="text-lg font-bold uppercase text-center">
                        Detail report
                    </h2>
                    <div className="flex flex-row gap-[200px] items-center mb-4 mt-5">
                        <div>
                            <span className="text-base text-[#000] font-semibold">
                                Reporter:
                            </span>
                            <span className="text-base text-[#000] ml-10">
                                {item.reported_user.fullname}
                            </span>
                        </div>
                        <div>
                            <span className="text-base text-[#000] font-semibold">
                                Reported user:
                            </span>
                            <span className="text-base text-[#000] ml-10">
                                {item.reported_content.email}
                            </span>
                        </div>
                    </div>
                    <div className="mb-4">
                        <span className="text-base text-[#000] font-semibold">
                            Content:
                        </span>
                        <span className="text-base text-[#000] ml-10">
                            {item.reason}
                        </span>
                    </div>
                    <div className="mb-5">
                        <span className="text-base text-[#000] font-semibold">
                            Data of reported user:
                        </span>
                        <div className="w-full bg-[#e5e7e9] p-10 h-[400px] overflow-auto mt-2">
                            <p>Log data of user reported</p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Phasellus eget facilisis
                                ligula. Duis non nulla tellus. Nulla facilisi.
                                Integer volutpat euismod ligula sed vestibulum.
                                Praesent at leo id urna viverra vestibulum in
                                quis erat.
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-end gap-5">
                <div className='flex  items-center gap-10'>
                    <div className='w-60'>
                        <span className='text-lg font-semibold'>Date of judge</span>
                    </div>
                    <Select 
                        // value={newAdmin.role} 
                        onValueChange={(value) => setJudge(value)}
                    >
                        <SelectTrigger className="w-4/5">
                            <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="0">No Infringement</SelectItem>
                            <SelectItem value="1">1 day</SelectItem>
                            <SelectItem value="2">3 days</SelectItem>
                            <SelectItem value="3">7 days</SelectItem>
                            <SelectItem value="4">1 month</SelectItem>
                            <SelectItem value="5">Permanent</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <button onClick={() => handleRoleChange()} className="bg-green-400 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded">
                    Handle
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
            </div>
            <div className="flex flex-col gap-4">
                {(data && data.length > 0)&& data.slice(indexS, indexE).map((item, index) => {
                    return (
                        <button
                            key={index}
                            className = { 
                                item.status === "pending" 
                                    ? "flex flex-row w-full pt-2 pb-2 justify-between items-center pr-5 pl-5 border-[1px] border-[#C2D3FF] rounded-2xl" 
                                    : (
                                        item.status === "rejected" 
                                            ? "flex flex-row w-full pt-2 pb-2 justify-between items-center pr-5 pl-5 border-[1px] border-[#FFC0C0] rounded-2xl" 
                                            : "flex flex-row w-full pt-2 pb-2 justify-between items-center pr-5 pl-5 border-[1px] border-[#46f646] rounded-2xl"
                                        )
                            }
                            onClick={() => {
                                setShowDialog(true);
                                setDataDialog(item);
                            }}
                >
                    <div className="text-base font-regular text-[#797D8C] flex-[1] text-center">
                        {item.createdAt}
                    </div>
                    <div className="text-base font-regular text-[#797D8C] flex-[1] text-center truncate">
                        {item.reported_user.fullname}
                    </div>
                    <div className="text-sm font-semibold text-[#797D8C] flex-[1] text-center truncate">
                        {item.reported_content.email}
                    </div>
                    <div className="text-sm font-regular text-[#797D8C] flex-[2]  truncate text-left">
                        {item.reason}
                    </div>
                </button>
                    )
                })}
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
        create_at: "02/12/2010",
    },
    {
        reporter: "abcdefg@gmail.com",
        reported: "123@gmail.com",
        content:
            "This account has harassing behavior, unhealthy content, the user has violated privacy policy and community standards.",
        create_at: "02/12/2010",
    },
    {
        reporter: "abc@gmail.com",
        reported: "123@gmail.com",
        content: "This user has violated community standards.",
        create_at: "02/12/2010",
    },
    {
        reporter: "abc@gmail.com",
        reported: "123@gmail.com",
        content:
            "This account has harassing behavior, unhealthy content, the user has violated privacy policy and community standards.",
        create_at: "02/12/2010",
    },
    {
        reporter: "abc@gmail.com",
        reported: "123@gmail.com",
        content: "This user has violated community standards.",
        create_at: "02/12/2010",
    },
    {
        reporter: "abc@gmail.com",
        reported: "123@gmail.com",
        content:
            "This account has harassing behavior, unhealthy content, the user has violated privacy policy and community standards.",
        create_at: "02/12/2010",
    },
    {
        reporter: "abc@gmail.com",
        reported: "123@gmail.com",
        content: "This user has violated community standards.",
        create_at: "02/12/2010",
    },
    {
        reporter: "abc@gmail.com",
        reported: "123@gmail.com",
        content: "This user has violated community standards.",
        create_at: "02/12/2010",
    },
    {
        reporter: "abc@gmail.com",
        reported: "123@gmail.com",
        content:
            "This account has harassing behavior, unhealthy content, the user has violated privacy policy and community standards.",
        create_at: "02/12/2010",
    },
    {
        reporter: "abc@gmail.com",
        reported: "123@gmail.com",
        content: "This user has violated community standards.",
        create_at: "02/12/2010",
    },
    {
        reporter: "abc@gmail.com",
        reported: "123@gmail.com",
        content:
            "This account has harassing behavior, unhealthy content, the user has violated privacy policy and community standards.",
        create_at: "02/12/2010",
    },
    {
        reporter: "a@gmail.com",
        reported: "1@gmail.com",
        content: "This user has violated community standards.",
        create_at: "02/12/2010",
    },
    {
        reporter: "abc@gmail.com",
        reported: "123@gmail.com",
        content:
            "This account has harassing behavior, unhealthy content, the user has violated privacy policy and community standards.",
        create_at: "02/12/2010",
    },
    {
        reporter: "abc@gmail.com",
        reported: "123@gmail.com",
        content: "This user has violated community standards.",
        create_at: "02/12/2010",
    },
    {
        reporter: "abc@gmail.com",
        reported: "123@gmail.com",
        content:
            "This account has harassing behavior, unhealthy content, the user has violated privacy policy and community standards.",
        create_at: "02/12/2010",
    },
];
