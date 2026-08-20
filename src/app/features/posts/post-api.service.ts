import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost } from './IPost';
import { IPostResponse } from './IPost-response';

@Injectable({
  providedIn: 'root',
})
export class PostApiService {

  private httpClient: HttpClient = inject(HttpClient);
  private readonly apiUrl = 'https://dummyjson.com/posts';

  getPosts(limit: number, skip: number): Observable<IPostResponse> {
    return this.httpClient.get<IPostResponse>(`${ this.apiUrl }?limit=${ limit }&skip=${ skip }`,);
  }

  getPost(id: number): Observable<IPost> {
    return this.httpClient.get<IPost>(`${ this.apiUrl }/${ id }`);
  }

  updatePost(id: number, data: Partial<IPost>): Observable<IPost> {
    return this.httpClient.put<IPost>(`${ this.apiUrl }/${ id }`, data);
  }

  deletePost(id: number): Observable<IPost> {
    return this.httpClient.delete<IPost>(`${ this.apiUrl }/${ id }`);
  }

  createPost(post: Partial<IPost>): Observable<IPost> {
    return this.httpClient.post<IPost>(`${ this.apiUrl }/add`, post);
  }

}
