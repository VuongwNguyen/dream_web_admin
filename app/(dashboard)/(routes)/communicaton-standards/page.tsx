"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Plus, Trash2, AlertTriangle, X } from "lucide-react";
import AxiosInstance from "@/constants/AxiosInstance";

// Định nghĩa kiểu dữ liệu policy
interface PolicyChild {
    _id: string;
    title: string;
}
interface Policy {
    _id: string;
    title: string;
    children: PolicyChild[];
}

// Dialog add
interface AddDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (newPolicy: { title: string; children: string[] }) => void;
}

const AddDialog: React.FC<AddDialogProps> = React.memo(
    ({ isOpen, onClose, onAdd }) => {
        const [title, setTitle] = useState<string>("");
        const [content, setContent] = useState<string>("");
        const [contentList, setContentList] = useState<string[]>([""]);
        const [message, setMessage] = useState<string>("");

        const handleAddContent = useCallback(() => {
            if (content.trim()) {
                setContentList((prev) => [...prev, content.trim()]);
                setContent("");
            }
        }, [content]);

        const handleRemoveContent = useCallback(
            (index: number) => {
                setContentList((prev) => prev.filter((_, i) => i !== index));
            },
            [contentList]
        );

        const handleSubmit = () => {
            if (!title.trim() || contentList.length === 0) {
                setMessage("Vui lòng nhập đầy đủ tiêu đề và nội dung!");
                return;
            }

            onAdd({ title: title, children: contentList });
            setTitle("");
            setContentList([""]);
            setMessage("");
            onClose();
        };

        if (!isOpen) return null;

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
                            <ul className="mt-4  mb-4 ml-4">
                                {contentList.slice(1).map((item, index) => (
                                    <li
                                        key={index}
                                        className="flex gap-4 items-center"
                                    >
                                        {item}
                                        <button
                                            onClick={() =>
                                                handleRemoveContent(index + 1)
                                            }
                                        >
                                            <X size={16} color="red" />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-row gap-[200px] items-center justify-center mt-6">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-[#0CBBF0] text-white font-semibold rounded hover:border hover:border-[#0CBBF0] hover:bg-[#9be7fe] hover:text-[#0CBBF0]"
                                onClick={handleSubmit}
                            >
                                Add
                            </button>
                            <button
                                type="button"
                                className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-100"
                                onClick={onClose}
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
    }
);

// Dialog confirm delete
interface DeleteDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
}
const ConfirmDialog: React.FC<DeleteDialogProps> = React.memo(
    ({ isOpen, onClose, onDelete }) => {
        if (!isOpen) return null;
        return (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                <div className="flex flex-col justify-center items-center gap-4 bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                    <AlertTriangle
                        size={80}
                        color="orange"
                        className="text-center"
                    />
                    <p className="text-2xl font-semibold">Are you sure?</p>
                    <p className="text-sm text-center text-gray-500 mb-6 ">
                        Do you really want to delete this terms? This process
                        cannot be undone.
                    </p>
                    <div className="flex gap-10">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                        >
                            Cancle
                        </button>
                        <button
                            onClick={onDelete}
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        );
    }
);

// Dialog Edit
interface EditDialogProps {
    isOpen: boolean;
    onClose: () => void;
    initData: Policy;
    onFetch: () => void;
}
const getChildrenTitles = (policy: Policy): string[] => {
    return policy.children.map((child) => child.title);
};
const EditDialog: React.FC<EditDialogProps> = React.memo(
    ({ isOpen, onClose, initData, onFetch }) => {
        const [title, setTitle] = useState<string>("");
        const [content, setContent] = useState<string>("");
        const [contentList, setContentList] = useState<string[]>([]);
        const [message, setMessage] = useState<string>("");
        useEffect(() => {
            if (initData) {
                setTitle(initData.title || "");
                setContentList(getChildrenTitles(initData) || []);
            }
        }, [initData]);
        // console.log("edit dialog:", initData);
        // console.log(title);
        // console.log(contentList);
        const handleAddContent = useCallback(() => {
            if (content.trim()) {
                setContentList((prev) => [...prev, content.trim()]);
                setContent("");
            }
        }, [content]);

        const handleRemoveContent = useCallback(
            (index: number) => {
                setContentList((prev) => prev.filter((_, i) => i !== index));
            },
            [contentList]
        );

        const handleSubmit = async () => {
            if (!title.trim() || contentList.length === 0) {
                setMessage("Vui lòng nhập đầy đủ tiêu đề và nội dung!");
                return;
            }
            const body = {
                id: initData._id,
                title: title,
                children: contentList,
            };
            try {
                const response = await AxiosInstance().post(
                    "/policy/upsert-policy",
                    body
                );
                alert("Cập nhật tài khoản điều khoản thành công!");
                setTitle("");
                setContentList([""]);
                setMessage("");
                onClose();
                onFetch();
            } catch (error) {
                alert(`Lỗi cập nhật điều khoản: ${error}`);
            }
        };

        if (!isOpen) return null;

        return (
            <>
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50"></div>
                <div className="w-[50%] p-10 fixed top-40 left-100 bg-[#fff] h-auto z-50 rounded-md">
                    <h2 className="text-xl font-bold text-center mb-4">
                        Chỉnh sửa điều khoản
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
                            <ul className="mt-4  mb-4 ml-4">
                                {contentList.slice(1).map((item, index) => (
                                    <li
                                        key={index}
                                        className="flex gap-4 items-center"
                                    >
                                        {item}
                                        <button
                                            onClick={() =>
                                                handleRemoveContent(index + 1)
                                            }
                                        >
                                            <X size={16} color="red" />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-row gap-[200px] items-center justify-center mt-6">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-[#0CBBF0] text-white font-semibold rounded hover:border hover:border-[#0CBBF0] hover:bg-[#9be7fe] hover:text-[#0CBBF0]"
                                onClick={handleSubmit}
                            >
                                Update
                            </button>
                            <button
                                type="button"
                                className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-100"
                                onClick={onClose}
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
    }
);
// Component chính
const CommunicatonStandardPage: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [showAddDialog, setShowAddDialog] = useState<boolean>(false);
    const [data, setData] = useState<Policy[]>([]);
    const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);
    const [showEditDialog, setShowEditDialog] = useState<boolean>(false);
    const [selectedPolicyId, setSelectedPolicyId] = useState("");
    const [selectedPolicyItem, setSelectedPolicyItem] = useState<Policy>({
        _id: "",
        title: "",
        children: [],
    });

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await AxiosInstance().get<Policy[]>(
                "/policy/policy"
            );
            setData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleAddPolicy = useCallback(
        async (newPolicy: { title: string; children: string[] }) => {
            try {
                const response = await AxiosInstance().post(
                    "/policy/upsert-policy",
                    newPolicy
                );
                console.log(response);
                if (response.status) {
                    setShowAddDialog(false);
                    alert("Thêm điều khoản thành công!");
                    fetchData();
                }
            } catch (error) {
                console.error("Error adding policy:", error);
            }
        },
        [fetchData]
    );
    const handleDeletePolicy = async (id: string) => {
        const body = {
            policy_id: id,
        };
        try {
            const response = await AxiosInstance().delete("/policy/policy", {
                data: body,
            });
            setShowConfirmDialog(false);
            alert("Xóa điều khoản thành công!");
            fetchData();
        } catch (error) {
            alert(`Lỗi xóa điều khoản: ${error}`);
        }
    };
    const renderedData = useMemo(() => {
        return (
            <div className="mt-2">
                {data.map((item) => (
                    <div key={item._id} className="ml-5">
                        <div className="flex mb-3 items-center gap-12">
                            <div className="text-[20px] font-semibold">
                                {item.title}
                            </div>
                            <div className="flex items-center gap-5">
                                <button
                                    className="flex gap-2 items-center cursor-pointer"
                                    onClick={() => {
                                        setShowEditDialog(true);
                                        setSelectedPolicyItem(item);
                                    }}
                                >
                                    <Pencil size={24} color="#3D29D0" />
                                    <div className="text-sm text-[#3D29D0] underline">
                                        Edit
                                    </div>
                                </button>
                                <button
                                    onClick={() => {
                                        setShowConfirmDialog(true);
                                        setSelectedPolicyId(item._id);
                                    }}
                                    className="flex gap-2 items-center cursor-pointer"
                                >
                                    <Trash2 size={24} color="red" />
                                    <div className="text-sm text-red-700 underline">
                                        Delete
                                    </div>
                                </button>
                            </div>
                        </div>
                        <ul className="ml-4">
                            {item.children.map((content) => (
                                <div key={content._id} className="mb-3">
                                    <div className="text-base font-normal">
                                        {content.title}
                                    </div>
                                </div>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        );
    }, [data]);
    return (
        <div className="pl-12 pr-12 w-full">
            <div className="flex items-center gap-12 pt-8 pb-8">
                <div className="text-[24px] font-bold">Platform policy</div>
                <Button
                    variant="outline"
                    className="border-[#0075E2] bg-[#D9F6FF]"
                    onClick={() => setShowAddDialog(true)}
                >
                    <Plus size={24} color="#0075E2" />
                    <div className="ml-2 text-[16px] font-bold text-[#0075E2]">
                        Add new
                    </div>
                </Button>
            </div>
            {loading ? (
                <div className=" mt-50  text-center">Loading...</div>
            ) : (
                renderedData
            )}
            <AddDialog
                isOpen={showAddDialog}
                onClose={() => setShowAddDialog(false)}
                onAdd={handleAddPolicy}
            />
            <ConfirmDialog
                isOpen={showConfirmDialog}
                onClose={() => setShowConfirmDialog(false)}
                onDelete={() => {
                    handleDeletePolicy(selectedPolicyId);
                }}
            />
            <EditDialog
                isOpen={showEditDialog}
                onFetch={fetchData}
                onClose={() => setShowEditDialog(false)}
                initData={selectedPolicyItem}
            />
        </div>
    );
};

export default CommunicatonStandardPage;
