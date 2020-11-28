export interface IPost {
  id: number;
  title: string;
  contents: string;
  commentCount: number;
  likeCount: number;
  writer: string;
  createdAt: Date;
}

export interface IPostList {
  postList: IPost[];
  totalCount: number;
}

export interface IInputPost {
  id?: number;
  title: string;
  contents: string;
  userId: number;
}

export interface IPaginationOption {
  skip: number;
  take: number;
}
