"use client";
import React, { useEffect, useState, ChangeEvent } from "react";
import Cookies from "js-cookie";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogClose } from "@radix-ui/react-dialog";
import AxiosInstance from "@/constants/AxiosInstance";
import { ErrorDescription } from "@/interfaces/ErrorDescription";

const SettingProfilePage: React.FC = () => {
    const [avatarShow, setAvatarShow] = useState<string>("");
    const [fullname, setFullname] = useState<string>("");
    const [role, setRole] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [avatar, setAvatar] = useState<File | null>(null);
    const [password, setPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [isDialogOpenUp, setIsDialogOpenUp] = useState(false);
    const [isLoadingUp, setIsLoadingUp] = useState(false);
    const [isLoadingChange, setIsLoadingChange] = useState(false);
    const [isDialogOpenChange, setIsDialogOpenChange] = useState(false);
    const [errorDescription, setErrorDescription] = useState<ErrorDescription>({})

    useEffect(() => {
        const name = Cookies.get("fullname") ?? "";
        const avt = Cookies.get("avatar") ?? "";
        const role = Cookies.get("role") ?? "";
        setAvatarShow(avt);
        setFullname(name);
        setRole(role);
        const names = name.split(" ");
        if (names.length > 1) {
            setFirstName(names[0]);
            setLastName(names.slice(1).join(" "));
        } else {
            setFirstName(name);
        }
    }, [isLoadingUp]);

    const handleUpdate = async () => {
        try {
            setIsLoadingUp(true);
            const formData = new FormData();
            if (firstName == '' || lastName == '') {
                setErrorDescription({ message: 'Please fill in all fields', errType: 'text' })
                return
            }
            if (avatar == null) {
                setErrorDescription({ message: 'Please select a photo', errType: 'avatar' })
                return
            }
            setErrorDescription({})
            formData.append("avatar", avatar);
            formData.append("first_name", firstName);
            formData.append("last_name", lastName);

            const response = await AxiosInstance().post(`/infomation/change-avatar-name`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (response.status) {
                Cookies.set("avatar", response.data.avatar);
                Cookies.set("fullname", response.data.fullname);
                setAvatar(null)
                setIsDialogOpenUp(false);
            }

        } catch (error) {
            console.log(error)
        } finally {
            setIsLoadingUp(false);
        }

    };

    const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setAvatar(e.target.files[0]);
            setErrorDescription({})
        }
    };

    const handleChangePassword = async () => {
        try {
            setIsLoadingChange(true);
            if (password == '' || newPassword == '' || confirmPassword == '') {
                setErrorDescription({ message: 'Please fill in all fields', errType: 'passwordEmty' })
                return
            }
            if (newPassword !== confirmPassword) {
                setErrorDescription({ message: 'Passwords do not match', errType: 'passwordConfirm' })
                return
            }
            setErrorDescription({})
            const formData = new FormData();
            formData.append("oldPassword", password);
            formData.append("newPassword", newPassword);
            const response = await AxiosInstance().post(`/account/change-password`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(response.data)
            if (response.status) {
                setIsDialogOpenChange(false);
            }

        } catch (error) {
            setErrorDescription({ message: 'Old password is incorrect', errType: 'password' })
        } finally {
            setIsLoadingChange(false)
        }
    }

    return (
        <div className="w-full flex flex-wrap items-center justify-center pt-20 mb-20">
            <div className="lg:w-2/4 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0">
                <div className="p-4 md:p-12 text-center lg:text-left">
                    <div className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center">
                        <img
                            src={avatarShow}
                            alt="Profile Avatar"
                            className="h-48 w-48 rounded-full"
                        />
                    </div>
                    <h1 className="text-3xl font-bold pt-8 lg:pt-0">{fullname}</h1>
                    <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-[#0CBBF0] opacity-25"></div>
                    <p className="pt-4 text-lg font-bold flex items-center justify-center lg:justify-start">
                        <svg
                            className="h-4 fill-current text-[#0CBBF0] pr-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
                        </svg>
                        {role}
                    </p>
                    <p className="pt-8 text-sm">
                        Totally optional short description about yourself, what you do and
                        so on.
                    </p>
                    <div className="w-full pt-12 pb-8 flex gap-3 items-center justify-center lg:items-start lg:justify-start">
                        <Dialog open={isDialogOpenUp} onOpenChange={setIsDialogOpenUp}>
                            <DialogTrigger asChild>
                                <button className="bg-[#0CBBF0] hover:bg-[#0CBBF0] text-white font-bold py-2 px-4 rounded-xl">
                                    Update profile
                                </button>
                            </DialogTrigger>
                            <DialogContent className="overflow-auto">
                                <DialogHeader>
                                    <DialogTitle>Update profile</DialogTitle>
                                    <DialogDescription>
                                        Make changes to your profile here. Click save when you're
                                        done.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="w-full">
                                    <div className="flex flex-col gap-2 mb-4">
                                        <div className="flex items-center gap-2">
                                            <Label
                                                htmlFor="firstName"
                                                className="w-28 text-left font-semibold text-lg"
                                            >
                                                Username
                                            </Label>
                                            <Input
                                                id="firstName"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                placeholder="First name"
                                            />
                                            <Input
                                                id="lastName"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                                placeholder="Last name"
                                            />
                                        </div>
                                        <div className="ml-24">
                                            {errorDescription.errType == 'text'
                                                && (
                                                    <p className="text-red-600 text-xs">{errorDescription.message}</p>
                                                )
                                            }
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-2">
                                                <Label htmlFor="avatar" className="w-28 font-semibold text-lg">
                                                    Avatar
                                                </Label>
                                                <Input
                                                    id="avatar"
                                                    type="file"
                                                    onChange={handleAvatarChange}
                                                />
                                            </div>
                                            <div className="ml-24">
                                                {errorDescription.errType == 'avatar'
                                                    && (
                                                        <p className="text-red-600 text-xs">{errorDescription.message}</p>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    {avatar && (
                                        <div className="mt-4">
                                            <img
                                                src={URL.createObjectURL(avatar)}
                                                alt="Preview"
                                                className="rounded shadow"
                                            />
                                        </div>
                                    )}
                                </div>
                                <DialogFooter>
                                    <div className="flex gap-5">
                                        <DialogClose asChild>
                                            <Button type="button" className="bg-red-600 hover:bg-red-700"
                                                onClick={() => {
                                                    setAvatar(null);
                                                }}>
                                                Cancel
                                            </Button>
                                        </DialogClose>
                                        <Button type="button" className={`${isLoadingUp ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#00C3FE] hover:bg-[#00C3FE]'}`} onClick={handleUpdate} disabled={isLoadingUp}>
                                            Update
                                        </Button>
                                    </div>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        <Dialog open={isDialogOpenChange} onOpenChange={setIsDialogOpenChange}>
                            <DialogTrigger asChild>
                                <button className="bg-[#0CBBF0] hover:bg-[#0CBBF0] text-white font-bold py-2 px-4 rounded-xl">
                                    Change password
                                </button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Change password</DialogTitle>
                                    <DialogDescription>
                                        Make changes to Change password here. Click save when you're
                                        done.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="w-full flex flex-col gap-3">
                                    <div className="flex flex-col items-start gap-3">
                                        <Label
                                            htmlFor="password"
                                            className="text-left font-semibold text-base"
                                        >
                                            Password
                                        </Label>
                                        <Input
                                            id="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Password"
                                            type="password"
                                        />
                                        {
                                            errorDescription.errType == 'password'
                                            && (
                                                <p className="text-red-600 text-xs ml-2">{errorDescription.message}</p>
                                            )
                                        }
                                    </div>
                                    <div className="flex flex-col items-start gap-3">
                                        <Label
                                            htmlFor="newPassword"
                                            className="text-left font-semibold text-base"
                                        >
                                            New Password
                                        </Label>
                                        <Input
                                            id="newPassword"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            placeholder="New Password"
                                            type="password"
                                        />

                                    </div>
                                    <div className="flex flex-col items-start gap-3">
                                        <Label
                                            htmlFor="confirmPassword"
                                            className="text-left font-semibold text-base"
                                        >
                                            Confirm Password
                                        </Label>
                                        <Input
                                            id="confirmPassword"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="Confirm Password"
                                            type="password"
                                        />
                                        {
                                            errorDescription.errType == 'passwordEmty'
                                            && (
                                                <p className="text-red-600 text-xs ml-2">{errorDescription.message}</p>
                                            )
                                        }
                                        {
                                            errorDescription.errType == 'passwordConfirm'
                                            && (
                                                <p className="text-red-600 text-xs ml-2">{errorDescription.message}</p>
                                            )
                                        }
                                    </div>
                                </div>
                                <DialogFooter>
                                    <div className="flex gap-5">
                                        <DialogClose asChild>
                                            <Button type="button" className="bg-red-600 hover:bg-red-700"
                                                onClick={() => {
                                                    setAvatar(null);
                                                }}>
                                                Cancel
                                            </Button>
                                        </DialogClose>
                                        <Button type="button" className={`${isLoadingChange ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#00C3FE] hover:bg-[#00C3FE]'}`} onClick={handleChangePassword} disabled={isLoadingChange}>
                                            Change
                                        </Button>
                                    </div>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
            <div className="w-[375px]">
                <img
                    src={avatarShow}
                    alt="User Avatar"
                    className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block"
                />
            </div>
        </div >
    );
};

export default SettingProfilePage;
