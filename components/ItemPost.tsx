import { Post } from '@/interfaces/post';
import React from 'react';
import { Avatar } from './ui/avatar';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Earth, Heart, MessageCircle, Share } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react'; // Import Swiper
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi';
import 'swiper/css';
import 'swiper/css/pagination';

dayjs.extend(relativeTime);

const customLocale = {
    ...dayjs.Ls.vi,
    relativeTime: {
        ...dayjs.Ls.vi.relativeTime,
        future: 'in %s',
        past: '%s trước',
        s: 'vài giây',
        m: '1 phút',
        mm: '%d phút',
        h: '1 giờ',
        hh: '%d giờ',
        d: '1 ngày',
        dd: '%d ngày',
        M: '1 tháng',
        MM: '%d tháng',
        y: '1 năm',
        yy: '%d năm',
    },
};

// Sử dụng locale tùy chỉnh
dayjs.locale(customLocale);

const ItemPost: React.FC<Post> = ({
    content,
    title,
    author,
    createdAt,
    privacy_status,
    images,
    likeCount,
    commentCount,
}) => {
    return (
        <div className="w-full h-full rounded-xl bg-white flex flex-col gap-2">
            {/* Header */}
            <div className="h-14 w-full p-2 flex gap-2">
                <Avatar className="w-12 h-12">
                    <AvatarImage src={author?.avatar} alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                    <div className="font-semibold">{author?.fullname}</div>
                    <div className="flex gap-2">
                        <div className="text-sm text-slate-600">{dayjs(createdAt).locale('vi').fromNow()}</div>
                        {privacy_status === 'public' && (
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-slate-600"></div>
                                <Earth size={14} color="#475569" />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="pl-2 pr-2 flex flex-col gap-1">
                {/* Title */}
                {title ? (
                    <div className="font-semibold text-base">{title}</div>
                ) : (
                    <div className="h-5"></div> // Chiều cao cố định khi không có tiêu đề
                )}
                {/* Content */}
                {content ? (
                    <div>{content}</div>
                ) : (
                    <div className="h-5"></div> // Chiều cao cố định khi không có nội dung
                )}

            </div>

            {/* Image Slider */}
            <div className="w-full h-[350px]">
                {images && images.length > 0 ? (
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        navigation
                    >
                        {images.map((image, index) => (
                            <SwiperSlide key={index}>
                                <img
                                    src={image.url}
                                    alt={`Image ${index}`}
                                    className="w-full h-[350px]"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <div className="text-center w-full h-full flex items-center justify-center bg-slate-300">
                        No Images
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="flex pl-2 pr-2 gap-3 h-12">
                <div className="flex gap-1 items-center">
                    <Heart size={24} />
                    <div className="text-sm font-semibold">{likeCount}</div>
                </div>
                <div className="flex gap-1 items-center">
                    <MessageCircle size={24} />
                    <div className="text-sm font-semibold">{commentCount}</div>
                </div>
                <div className="flex gap-1 items-center">
                    <Share size={24} />
                </div>
            </div>
        </div>
    );
};

export default ItemPost;
