"use client";
import { Button } from "@/components/ui/button";
import { Pencil, Plus, Trash2, AlertTriangle  } from "lucide-react";
import React, { useEffect, useState } from "react";
import AxiosInstance from "@/constants/AxiosInstance";

const CommunicatonStandardPage = () => {
    const [loadingFetchData, setLoadingFetchData] = useState(true);
    const [loadingAdd, setLoadingAdd] = useState(false);
    const [message, setMessage] = useState("");
    const [showAddDialog, setshowAddDialog] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [contentList, setContentList] = useState([""]);
    const [showComfirmDialog, setshowComfirmDialog] = useState(false);
    interface Policy {
        _id: string;
        title: string;
        children: [
            {
                _id: string;
                title: string;
            }
        ];
    }

    const initialData: Policy = {
        _id: "",
        title: "",
        children: [
            {
                _id: "",
                title: "",
            },
        ],
    };
    const [selectedPolicy, setSelectedPolicy] = useState(initialData);

    const [data, setData] = useState([initialData]);

    const fetchData = async () => {
        try {
            setLoadingFetchData(true);
            const response = await AxiosInstance().get("/policy/policy");
            console.log(response);
            setData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoadingFetchData(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    interface BodyDelete {
        policy_id: string;
        children_id: string;
    }
    const handleDelete = async (itemDelete: Policy) => {
        const body = {
            policy_id: itemDelete._id,
            children_id: itemDelete.children[0]._id,
        };
        try {
            const response = await AxiosInstance().delete("/policy/policy", {
                data: body,
            });
            alert("Xóa điều khoản thành công!");
        } catch (error) {
            console.log("Lỗi xóa điều khoản: ", error);
        }
    };

    const handleAddContent = () => {
        if (content.trim()) {
            setContentList([...contentList, content.trim()]);
            setContent("");
        }
    };
    const handleAdd = async () => {
        if (!title.trim() || contentList.length === 0) {
            setMessage("Vui lòng nhập đầy đủ tiêu đề và nội dung!");
            return;
        }

        setLoadingAdd(true);
        setMessage("");

        const body = {
            title: title.trim(),
            children: contentList,
        };
        try {
            const response = await AxiosInstance().post(
                "/policy/upsert-policy",
                body
            );
            console.log(response.status);

            if (response.status) {
                setTitle("");
                setContentList([]);
                setMessage("");
                setshowAddDialog(false);
                alert("Cập nhật điều khoản thành công!");
                fetchData();
            }
        } catch (error) {
            console.log("Lỗi thêm điều khoản:", error);
            setMessage("Đã xảy ra sự cố.");
        } finally {
            setLoadingAdd(false);
        }
    };
    const dialogAdd = () => {
        return (
            <>
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50"></div>
                <div className="w-[50%] p-10 fixed top-40 left-100 bg-[#fff] h-auto z-50 rounded-md">
                    <h2 className="text-xl font-bold text-center mb-4">
                        Thêm điều khoản mới
                    </h2>
                    <form>
                        {/* Tiêu đề */}
                        <div className="mb-4">
                            <label
                                htmlFor="title"
                                className="block text-sm font-semibold text-gray-700"
                            >
                                Tiêu đề
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Nhập tiêu đề"
                                className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0CBBF0]"
                            />
                        </div>

                        {/* Nội dung */}
                        <div className="mb-4">
                            <label
                                htmlFor="content"
                                className="block text-sm font-semibold text-gray-700"
                            >
                                Nội dung
                            </label>
                            <div className="flex items-center gap-2 mt-1">
                                <input
                                    type="text"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Nhập nội dung"
                                    className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0CBBF0]"
                                />
                                <button
                                    onClick={handleAddContent}
                                    type="button"
                                    className="w-10 h-8 border border-[#0CBBF0] bg-[#D9F6FF] text-[#0CBBF0] flex items-center justify-center rounded-sm hover:bg-[#9be7fe]"
                                >
                                    <span className="font-medium text-xl">
                                        {" "}
                                        +
                                    </span>
                                </button>
                            </div>
                            {contentList.length > 1 && (
                                <ul className="list-disc list-inside mb-4">
                                    {contentList.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-row gap-[200px] items-center justify-center mt-6">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-[#0CBBF0] text-white font-semibold rounded hover:border hover:border-[#0CBBF0] hover:bg-[#9be7fe] hover:text-[#0CBBF0]"
                                onClick={handleAdd}
                                disabled={loadingAdd}
                            >
                                {loadingAdd ? "Đang gửi..." : "Add"}
                            </button>
                            <button
                                type="button"
                                className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-100"
                                onClick={() => {
                                    setshowAddDialog(false);
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                        {message && (
                            <p className="mt-4 text-center text-sm text-red-500">
                                {message}
                            </p>
                        )}
                    </form>
                </div>
            </>
        );
    };
    return (
        <div className="relative pl-12 pr-12 w-full">
            {/* <Button className='absolute top-12 right-20 bg-[#0CBBF0] hover:bg-[#0CBBF0] p-6'>
                <div className='text-[22px] font-bold text-white'>Save & Update</div>
            </Button> */}
            {/* Privacy Policy Section */}
            <div className="flex items-center gap-12 pt-8 pb-8">
                <div className="text-[24px] font-bold">Platform policy</div>
                <Button
                    variant="outline"
                    className="border-[#0075E2] bg-[#D9F6FF]"
                    onClick={() => setshowAddDialog(true)}
                >
                    <Plus size={24} color="#0075E2" />
                    <div className="ml-2 text-[16px] font-bold text-[#0075E2]">
                        Add new
                    </div>
                </Button>
            </div>
            {showAddDialog && dialogAdd()}
            {loadingFetchData ? (
                <div className=" mt-50  text-center">Loading...</div>
            ) : (
                <div className="mt-2">
                    {data.map((item) => (
                        <div key={item._id} className="ml-5">
                            <div className="flex mb-3 items-center gap-12">
                                <div className="text-[20px] font-semibold">
                                    {item.title}
                                </div>
                                <div className="flex items-center gap-5">
                                    <div className="flex gap-2 items-center cursor-pointer">
                                        <Pencil size={24} color="#3D29D0" />
                                        <div className="text-sm text-[#3D29D0] underline">
                                            Edit
                                        </div>
                                    </div>
                                    <button
                                        onClick={() =>
                                            setshowComfirmDialog(true)
                                        }
                                        className="flex gap-2 items-center cursor-pointer"
                                    >
                                        <Trash2 size={24} color="red" />
                                        <div className="text-sm text-red-700 underline">
                                            Delete
                                        </div>
                                    </button>
                                </div>
                            </div>
                            <div className="ml-4">
                                {item.children.map((content) => (
                                    <div key={content._id} className="mb-3">
                                        <div className="text-base font-normal">
                                            {content.title}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {/* Dialog xác nhận */}
            {showComfirmDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <AlertTriangle size={36} color="orange" className="text-center" />
                        <p className="text-sm text-center mb-6">
                            Bạn có chắc chắn muốn xóa điều khoản này không? Hành
                            động này không thể hoàn tác.
                        </p>
                        <div className="flex justify-between">
                            <button
                                onClick={() => {
                                    setshowComfirmDialog(false);
                                }}
                                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={() => handleDelete(selectedPolicy)}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                            >
                                Xóa
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CommunicatonStandardPage;
