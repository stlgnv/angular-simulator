import { IPost } from "./Ipost";

export interface IPostResponse {
  posts: IPost[];
  total: number;
  skip: number;
  limit: number;
}
