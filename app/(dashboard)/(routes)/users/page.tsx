"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { EllipsisVertical } from "lucide-react";
import React, { useState } from "react";

interface DataItem {
    id: number;
    name: string;
    follows: number;
    email: string;
    date: string;
}

const UserPage = () => {
    const data: DataItem[] = [
        {
            id: 1,
            name: "Nicholas Patrick",
            follows: 2540.58,
            email: "abc@gmail.com",
            date: "02/12/2010",
        },
        {
            id: 2,
            name: "Cordell Edwards",
            follows: 1567.8,
            email: "abc@gmail.com",
            date: "03/10/2012",
        },
        {
            id: 3,
            name: "Derrick Spencer",
            follows: 1640.26,
            email: "abc@gmail.com",
            date: "02/07/2011",
        },
        {
            id: 4,
            name: "Larissa Burton",
            follows: 2340.58,
            email: "abc@gmail.com",
            date: "12/09/2010",
        },
        {
            id: 5,
            name: "Nicholas Patrick",
            follows: 2540.58,
            email: "abc@gmail.com",
            date: "02/12/2010",
        },
        {
            id: 6,
            name: "Nicholas Patrick",
            follows: 2540.58,
            email: "abc@gmail.com",
            date: "02/12/2010",
        },
        {
            id: 7,
            name: "Nicholas Patrick",
            follows: 2540.58,
            email: "abc@gmail.com",
            date: "02/12/2010",
        },
        {
            id: 8,
            name: "Nicholas Patrick",
            follows: 2540.58,
            email: "abc@gmail.com",
            date: "02/12/2010",
        },
    ];

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
                    {data.map((item, index) => (
                        <div
                            key={index}
                            className="flex w-full h-16 items-center border border-[#C2D3FF] rounded-2xl"
                        >
                            <div className="w-1/5 text-center text-base font-bold">
                                {index + 1}
                            </div>
                            <div className="w-1/5 text-center text-base font-semibold text-[#797D8C]">
                                {item.name}
                            </div>
                            <div className="w-1/5 text-center text-base font-extrabold text-[#04103B]">
                                {item.follows}
                            </div>
                            <div className="w-1/5 text-center text-sm font-semibold text-[#797D8C]">
                                {item.email}
                            </div>
                            <div className="w-1/5 text-center text-sm font-semibold text-[#797D8C]">
                                From {item.date}
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
            </div>
        </div>
    );
};

export default UserPage;
