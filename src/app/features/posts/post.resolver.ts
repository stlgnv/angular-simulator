import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { IPost } from './Ipost';
import { inject } from '@angular/core';
import { PostService } from './post.service';

export const postResolver: ResolveFn<Observable<IPost>> = (route) => {

  const postService: PostService = inject(PostService);
  const post: string = route.paramMap.get('id')!;
  const parse: number = +post;

  return postService.getPost(parse);

};
