'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Pencil, Trash2 } from 'lucide-react'
import React, { useState } from 'react'

interface User {
    username: string
    role: string
    email: string
}

const users: User[] = [
    { username: "Admin1", role: "Admin", email: "admin1@gmail.com" },
    { username: "Admin2", role: "Super Admin", email: "admin2@gmail.com" },
    { username: "Admin3", role: "Admin", email: "admin3@gmail.com" },
]

const AdminSettngPage = () => {
    const [newAdmin, setNewAdmin] = useState({
        username: '',
        email: '',
        password: '',
        role: ''
    });

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
    console.log(newAdmin.role);

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
                        {users.map((user) => (
                            <TableRow key={user.username}>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>{user.email}</TableCell>
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
        </div>
    )
}

export default AdminSettngPage;
