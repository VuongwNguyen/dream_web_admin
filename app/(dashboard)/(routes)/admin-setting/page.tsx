'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import AxiosInstance from '@/constants/AxiosInstance'
import { Pencil, Trash2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'

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
        username: '',
        email: '',
        password: '',
        role: ''
    });

    const [dataAdmins, setDataAdmins] = useState<UserAdmin[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewAdmin((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRoleChange = (value: string) => {
        setNewAdmin((prev) => ({ ...prev, role: value }));

    };

    const fectchDataAdmins = async () => {
        try {
            setIsLoading(true)
            const response = await AxiosInstance().get(`admin/admins?_page=${currentPage}&_limit=3`)
            setDataAdmins(response.data.list);
            setMaxPage(response.data.page.max);
        } catch (error) {
            console.error(error)
        }
        finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fectchDataAdmins()
    }, [currentPage])

    const pageNumbers = Array.from({ length: maxPage }, (_, index) => index + 1);


    return (
        <div className='pl-12 pr-12 w-full h-full'>
            <div className='text-2xl font-bold'>Add New Admin</div>
            <div className='mt-8 ml-5 flex flex-col gap-10'>
                <div className='flex items-center gap-10'>
                    <div className='w-28'>
                        <span className='text-lg font-semibold'>Username <span className='text-lg font-semibold text-red-600'>*</span></span>
                    </div>
                    <Input className='w-2/5' name="username" value={newAdmin.username} onChange={handleInputChange} />
                </div>
                <div className='flex  items-center gap-10'>
                    <div className='w-28'>
                        <span className='text-lg font-semibold'>Email <span className='text-lg font-semibold text-red-600'>*</span></span>
                    </div>
                    <Input className='w-2/5' name="email" value={newAdmin.email} onChange={handleInputChange} />
                </div>
                <div className='flex  items-center gap-10'>
                    <div className='w-28'>
                        <span className='text-lg font-semibold'>Password <span className='text-lg font-semibold text-red-600'>*</span></span>
                    </div>
                    <Input type='password' className='w-2/5' name="password" value={newAdmin.password} onChange={handleInputChange} />
                </div>
                <div className='flex  items-center gap-10'>
                    <div className='w-28'>
                        <span className='text-lg font-semibold'>Role <span className='text-lg font-semibold text-red-600'>*</span></span>
                    </div>
                    <Select value={newAdmin.role} onValueChange={handleRoleChange}>
                        <SelectTrigger className="w-2/5">
                            <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="administrator">Administrator</SelectItem>
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="moderator">Moderator</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className='w-full'>
                    <Button className='w-40 h-14 bg-[#0CBBF0] hover:bg-[#0CBBF0]'>
                        <div className='text-xl font-bold'>Add New</div>
                    </Button>
                </div>
            </div>
            <div className='mt-12'>
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
                                        <Button variant="outline" size="icon">
                                            <Pencil className="h-4 w-4 text-blue-500" />

                                        </Button>
                                        <Button variant="outline" size="icon">
                                            <Trash2 className="h-4 w-4 text-red-500" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-center gap-2 mt-4">
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
    )
}

export default AdminSettngPage;
