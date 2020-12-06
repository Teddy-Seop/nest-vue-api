export interface ISaveCommentInput {
  id?: number;
  comment: string;
  postId: number;
  userId: number;
}

export interface IDeleteCommentInput {
  id: number;
  postId: number;
}

export interface ICommentCount {
  postId: number;
  commentCount: number;
}
