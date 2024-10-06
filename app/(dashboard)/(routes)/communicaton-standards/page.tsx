'use client'
import { Button } from '@/components/ui/button'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import React, { useState } from 'react'

const CommunicatonStandardPage = () => {
    const [dataPrivacyPolicy, setDataPrivacyPolicy] = useState(fakeDataPrivacyPolicy);
    const [dataCommunity, setDataCommunity] = useState(fakeDataCommunity);
    return (
        <div className='relative pl-12 pr-12 w-full'>
            <Button className='absolute top-12 right-20 bg-[#0CBBF0] hover:bg-[#0CBBF0] p-6'>
                <div className='text-[22px] font-bold text-white'>Save & Update</div>
            </Button>
            <div className='flex items-center gap-12 pt-8 pb-8'>
                <div className='text-[24px] font-bold'>Privacy Policy</div>
                <Button variant='outline' className='border-[#0075E2] bg-[#D9F6FF]'>
                    <Plus size={24} color='#0075E2' />
                    <div className='ml-2 text-[16px] font-bold text-[#0075E2]'>Thêm mới</div>
                </Button>
            </div>
            <div className='mt-2'>
                {
                    dataPrivacyPolicy.map((item, index) => (
                        <div key={index} className='ml-5'>
                            <div className='flex mb-3 items-center gap-12'>
                                <div className='text-[20px] font-semibold '>{item.title}</div>
                                <div className='flex items-center gap-5'>
                                    <div className='flex gap-2 items-center cursor-pointer'>
                                        <Pencil size={24} color='#3D29D0' />
                                        <div className='text-sm text-[#3D29D0] underline'>Edit</div>
                                    </div>
                                    <div className='flex gap-2 items-center cursor-pointer'>
                                        <Trash2 size={24} color='red' />
                                        <div className='text-sm text-red-700 underline'>Delete</div>
                                    </div>
                                </div>
                            </div>
                            <div className='ml-4'>
                                {
                                    item.contents.map((content, index) => (
                                        <div className='mb-3'>
                                            <div className='text-base font-normal'>{content}</div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className='flex items-center gap-12 pt-8 pb-8'>
                <div className='text-[24px] font-bold'>Community Standards</div>
                <Button variant='outline' className='border-[#0075E2] bg-[#D9F6FF]'>
                    <Plus size={24} color='#0075E2' />
                    <div className='ml-2 text-[16px] font-bold text-[#0075E2]'>Thêm mới</div>
                </Button>
            </div>
            <div className='mt-2'>
                {
                    dataCommunity.map((item, index) => (
                        <div key={index} className='ml-5'>
                            <div className='flex mb-3 items-center gap-12'>
                                <div className='text-[20px] font-semibold '>{item.title}</div>
                                <div className='flex items-center gap-5'>
                                    <div className='flex gap-2 items-center cursor-pointer'>
                                        <Pencil size={24} color='#3D29D0' />
                                        <div className='text-sm text-[#3D29D0] underline'>Edit</div>
                                    </div>
                                    <div className='flex gap-2 items-center cursor-pointer'>
                                        <Trash2 size={24} color='red' />
                                        <div className='text-sm text-red-700 underline'>Delete</div>
                                    </div>
                                </div>
                            </div>
                            <div className='ml-4'>
                                {
                                    item.contents.map((content, index) => (
                                        <div className='mb-3'>
                                            <div className='text-base font-normal'>{content}</div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default CommunicatonStandardPage;

const fakeDataPrivacyPolicy = [
    {
        id: 1,
        title: 'Thu thập thông tin cá nhân',
        contents: [
            'Thông tin đăng ký: Họ tên, địa chỉ email, số điện thoại, ngày sinh, giới tính.',
            'Dữ liệu sử dụng: Thông tin về hành vi người dùng trên ứng dụng (lịch sử tương tác, nội dung chia sẻ)'
        ]
    },
    {
        id: 2,
        title: 'Mục đích sử dụng thông tin',
        contents: [
            'Cá nhân hóa trải nghiệm: Cung cấp nội dung, đề xuất phù hợp với sở thích của người dùng.',
            'Bảo mật: Phát hiện và ngăn chặn các hành vi lừa đảo hoặc truy cập trái phép.'
        ]
    },
    {
        id: 3,
        title: ' Bảo mật dữ liệu',
        contents: [
            'Mã hóa: Thông tin người dùng được mã hóa trong quá trình truyền và lưu trữ.',
        ]
    },

]

const fakeDataCommunity = [
    {
        id: 1,
        title: 'Hành vi được phép và không được phép',
        contents: [
            'Tôn trọng lẫn nhau: Người dùng phải tôn trọng các quan điểm, quyền lợi, và phẩm giá của người khác.',
            'Ngôn từ thù địch: Cấm phát ngôn chứa ngôn từ phân biệt chủng tộc, giới tính, tôn giáo, và bất kỳ nội dung nào kích động thù hận.',
            'Quấy rối và bắt nạt: Cấm các hành vi quấy rối, đe dọa, xúc phạm, hoặc làm tổn thương tinh thần người dùng khác.',
            'Phát tán tin giả (Misinformation): Nghiêm cấm phát tán thông tin sai lệch, đặc biệt là liên quan đến sức khỏe, an ninh, hoặc các sự kiện chính trị.'
        ]
    },
    {
        id: 2,
        title: 'Nội dung bị cấm',
        contents: [
            'Nội dung bạo lực và kích động: Nghiêm cấm các bài đăng mô tả, khuyến khích hoặc ca ngợi hành vi bạo lực.'
        ]
    },

]

