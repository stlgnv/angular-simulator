import { inject, Injectable } from '@angular/core';
import { PostApiService } from './post-api.service';
import { LoaderService } from '../../services/loader.service';
import { BehaviorSubject, catchError, EMPTY, finalize, Observable, tap } from 'rxjs';
import { IPostResponse } from './IPost-response';
import { NotificationService } from '../../services/notification.service';
import { IPost } from './IPost';

@Injectable({
  providedIn: 'root',
})
export class PostService {

  postApiService: PostApiService = inject(PostApiService);
  messageService: NotificationService = inject(NotificationService);
  loaderService: LoaderService = inject(LoaderService);

  private postsSubject: BehaviorSubject<IPost[]> = new BehaviorSubject<IPost[]>([]);
  posts$: Observable<IPost[]> = this.postsSubject.asObservable();

  getPosts(limit: number, skip: number): Observable<IPostResponse> {
    return this.postApiService.getPosts(limit, skip)
      .pipe(
        tap((response: IPostResponse) => {
          this.postsSubject.next(response.posts);
        }),
        catchError(() => {
          this.messageService.showErrorMessage('Не удалось получить посты');
          return EMPTY;
        })
      )
  }

  getPost(id: number): Observable<IPost> {
    this.loaderService.showLoader();
    return this.postApiService.getPost(id)
      .pipe(
        finalize(() => {
          this.loaderService.hideLoader();
        }),
        catchError(() => {
          this.messageService.showErrorMessage('не удалось получить пост');
          return EMPTY;
        }),
      )
  }

  updatePost(id: number, data: Partial<IPost>): Observable<IPost> {
    this.loaderService.showLoader();
    return this.postApiService.updatePost(id, data)
      .pipe(
        finalize(() => {
          this.loaderService.hideLoader();
        }),
        catchError(() => {
          this.messageService.showErrorMessage('Не удалось редактировать пост');
          return EMPTY;
        }),
      )
  }

  deletePost(id: number): Observable<IPost> {
    this.loaderService.showLoader();
    return this.postApiService.deletePost(id)
      .pipe(
        tap(() => {
          const posts: IPost[] = this.postsSubject.getValue();
          const updatedPosts: IPost[] = this.filterPost(posts, id)

          this.postsSubject.next(updatedPosts);
        }),
        finalize(() => {
          this.loaderService.hideLoader();
        }),
        catchError(() => {
          this.messageService.showErrorMessage('Не удалось удалить пост');
          return EMPTY;
        }),
      )
  }

  filterPost(posts: IPost[], id: number): IPost[] {
    return posts.filter((post: IPost) => post.id !== id);
  }

  createPost(post: Partial<IPost>): Observable<IPost> {
    this.loaderService.showLoader();
    return this.postApiService.createPost(post)
      .pipe(
        finalize(() => {
          this.loaderService.hideLoader();
        }),
        catchError(() => {
          this.messageService.showErrorMessage('Не удалось создать пост');
          return EMPTY;
        })
      )
  }
}
