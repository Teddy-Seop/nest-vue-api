export interface IPostInput {
  id?: number;
  title: string;
  contents: string;
  userId: number;
}

export interface IPaginationOption {
  skip: number;
  take: number;
}
