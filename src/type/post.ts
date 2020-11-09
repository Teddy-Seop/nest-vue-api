export interface IPostList {
    postList: IPost[];
    totalCount: number;
}

export interface IPost {
    id: number;
    title: string;
    contents: string;
    commentCount: number;
    likeCount: number;
    writer: string;
    createdAt: Date;
}