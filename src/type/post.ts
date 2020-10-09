export interface IPostList {
    id: number;
    title: string;
    contents: string;
    commentCount: number;
    likeCount: number;
    writer: string;
    createdAt: Date;
}