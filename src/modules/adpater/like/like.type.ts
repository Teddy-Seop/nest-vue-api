export interface ILikeInput {
  postId: number;
  userId?: number;
}

export interface ILikeCount {
  postId: number;
  likeCount: number;
}
