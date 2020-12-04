export interface ICommentInput {
  id?: number;
  comment: string;
  postId: number;
  userId: number;
}

export interface ICommentCount {
  postId: number;
  commentCount: number;
}
