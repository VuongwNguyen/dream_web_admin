import { Post } from '@/interfaces/post';
import React from 'react';
import { Avatar } from './ui/avatar';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Earth, Heart, MessageCircle, Share } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react'; // Import Swiper
// import 'swiper/swiper-bundle.min.css'; // Import Swiper styles

const ItemPost: React.FC<Post> = ({
    content, title, author, createdAt, privacy_status, images, likeCount, commentCount,
}) => {
    return (
        <div className='w-full h-[500px] rounded-xl bg-white flex flex-col gap-2'>
            <div className='h-14 w-full p-2 flex gap-2'>
                <Avatar className='w-12 h-12'>
                    <AvatarImage src={author?.avatar} alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                    <div className='font-semibold'>{author?.fullname}</div>
                    <div className='flex gap-2'>
                        <div className='text-sm text-slate-600'>{createdAt}</div>
                        {
                            privacy_status === 'public' && (
                                <div className='flex items-center gap-2'>
                                    <div className='w-2 h-2 rounded-full bg-slate-600'></div>
                                    <Earth size={14} color='#475569' />
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className='pl-2 pr-2 flex flex-col gap-1'>
                <div className='font-semibold text-base'>{title}</div>
                <div>{content}</div>
            </div>
            <div className="w-full h-[330px]">
                {/* Swiper slider */}
                {images && images.length > 0 ? (
                    <Swiper
                        spaceBetween={10} // Khoảng cách giữa các slide
                        slidesPerView={1} // Hiển thị 1 ảnh mỗi lần
                        pagination={{ clickable: true }} // Phân trang có thể nhấp
                        navigation // Nút điều hướng (mũi tên trái/phải)
                    >
                        {images.map((image, index) => (
                            <SwiperSlide key={index}>
                                <img
                                    src={image.url}
                                    alt={`Image ${index}`}
                                    className="w-full h-full"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) :
                    <div className='text-center w-full h-full flex items-center justify-center bg-slate-300'>No Images</div>
                }
                <div className='flex pl-2 pr-2 gap-3 h-12'>
                    <div className='flex gap-1 items-center'>
                        <Heart size={24} />
                        <div className='text-sm font-semibold'>{likeCount}</div>

                    </div>
                    <div className='flex gap-1 items-center'>
                        <MessageCircle size={24} />
                        <div className='text-sm font-semibold'>{commentCount}</div>
                    </div>
                    <div className='flex gap-1 items-center'>
                        <Share size={24} />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemPost;
