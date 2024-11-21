'use client'

import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import AxiosInstance from '@/constants/AxiosInstance'
import { Trash2 } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogOverlay, DialogTrigger, DialogPortal } from '@/components/ui/dialog'

interface UserAdmin {
    _id: string,
    fullname: string,
    email: string,
    role: string,
    avatar: string,
    isMe: boolean,
}

const AdminSettngPage = () => {
    const [newAdmin, setNewAdmin] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        role: ''
    });

    const role = Cookies.get('role');
    const [dataAdmins, setDataAdmins] = useState<UserAdmin[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedAdmin, setSelectedAdmin] = useState<UserAdmin | null>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewAdmin((prev) => ({
            ...prev,
            [name]: value
        }));
    };
    const fectchDataAdmins = async () => {
        try {
            setIsLoading(true);
            const response = await AxiosInstance().get(`admin/admins?_page=${currentPage}&_limit=10`);
            setDataAdmins(response.data.list);
            setMaxPage(response.data.page.max);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fectchDataAdmins();
    }, [currentPage]);

    const handleRevokeAdmin = async () => {
        if (!selectedAdmin) return;
        try {
            if (selectedAdmin && role === selectedAdmin.role) {
                alert('You cannot revoke the permissions of someone of the same level as you');
                return;
            }
            const response = await AxiosInstance().put(`/admin/revoke-admin`, { admin_id: selectedAdmin._id });
            if (response.status) {
                alert('Admin recovery successful');
                setDataAdmins((prev) => prev.filter((admin) => admin._id !== selectedAdmin._id));
            }
        } catch (error) {
            console.error('Error revoking admin:', error);
        } finally {
            setIsDialogOpen(false);
        }
    };

    const handleAddNewAdmin = async () => {
        try {
            const body = {
                first_name: newAdmin.first_name,
                last_name: newAdmin.last_name,
                email: newAdmin.email,
            }
            const response = await AxiosInstance().post('/admin/register-admin', body);
            if (response.status) {
                alert('Add new admin successful');
                setNewAdmin({
                    first_name: '',
                    last_name: '',
                    email: '',
                    password: '',
                    role: ''
                });
                fectchDataAdmins();

            }
        } catch (error) {
            console.error('Error adding new admin:', error);
        }
    }

    const pageNumbers = Array.from({ length: maxPage }, (_, index) => index + 1);

    return (
        <div className='pl-12 pr-12 w-full h-full'>
            <div className='text-2xl font-bold'>Add New Admin</div>
            <div className='mt-8 ml-5 flex flex-col gap-8'>
                <div className='flex items-center gap-10'>
                    <div className='w-28'>
                        <span className='text-lg font-semibold'>Username <span className='text-lg font-semibold text-red-600'>*</span></span>
                    </div>
                    <div className='w-2/5 flex gap-3'>
                        <Input className='flex-1' placeholder='First name' name="first_name" value={newAdmin.first_name} onChange={handleInputChange} />
                        <Input className='flex-1' placeholder='Last name' name="last_name" value={newAdmin.last_name} onChange={handleInputChange} />
                    </div>
                </div>
                <div className='flex items-center gap-10'>
                    <div className='w-28'>
                        <span className='text-lg font-semibold'>Email <span className='text-lg font-semibold text-red-600'>*</span></span>
                    </div>
                    <Input className='w-2/5' placeholder='Email' name="email" value={newAdmin.email} onChange={handleInputChange} />
                </div>
                <div className='w-full'>
                    <Button className='w-40 h-14 bg-[#0CBBF0] hover:bg-[#0CBBF0]' onClick={handleAddNewAdmin}>
                        <div className='text-xl font-bold'>Add New</div>
                    </Button>
                </div>
            </div>

            {/* Bảng quản lý admin */}
            <div className='mt-10'>
                <div className='text-2xl font-bold mb-5'>Tài khoản Admin</div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Username</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {dataAdmins.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.fullname}</TableCell>
                                <TableCell>{item.role}</TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell>
                                    <div className="flex space-x-2">
                                        {!item.isMe && (
                                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() => {
                                                            setSelectedAdmin(item);
                                                            setIsDialogOpen(true);
                                                        }}
                                                    >
                                                        <Trash2 className="h-4 w-4 text-red-500" />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                                                        <DialogDescription>
                                                            This action will revoke administrator status of this account.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className='w-full flex justify-end'>
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            onClick={handleRevokeAdmin}
                                                        >
                                                            <Trash2 className="h-4 w-4 text-red-500" />
                                                        </Button>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-4 mb-4">
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
        </div>
    );
}

export default AdminSettngPage;
