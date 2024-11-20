interface Image {
    _id: string;
    url: string;
}

interface Video {
    // Nếu video có cấu trúc chi tiết hơn, hãy thêm các thuộc tính cần thiết tại đây
}

interface TagUser {
    _id: string;
    fullname: string;
}

interface Hashtag {
    _id: string;
    title: string;
}

interface Author {
    _id: string;
    fullname: string;
    avatar: string;
}

interface ChildrenPost {
    _id: string;
    title: string;
    content: string;
    privacy_status: string;
    images: Image[];
    videos: Video[];
    tagUsers: TagUser[];
    hashtags: Hashtag[];
    createdAt: string;
    author: Author;
}

export interface Post {
    _id?: string;
    title?: string;
    content?: string;
    privacy_status?: string;
    images: Image[];
    videos?: Video[];
    tagUsers?: TagUser[];
    hashtags?: Hashtag[];
    createdAt?: string;
    author?: Author;
    followedStatus?: boolean;
    likeCount?: number;
    isLiked?: boolean;
    commentCount?: number;
    childrenPost?: ChildrenPost | null;
    isSelf?: boolean;
}
