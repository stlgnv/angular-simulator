import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogService } from 'primeng/dynamicdialog';
import { MenuItem } from 'primeng/api';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { BehaviorSubject, finalize, Observable, tap } from 'rxjs';
import { IPost } from '../Ipost';
import { IPostResponse } from '../Ipost-response';
import { PostService } from '../post.service';
import { PostEditDialogComponent } from '../post-edit/post-edit.component';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    TableModule,
    SkeletonModule,
    ContextMenuModule,
    AsyncPipe,
    ButtonModule,
    RouterLink
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
  providers: [DialogService],
})
export class PostsComponent implements OnInit {

  private router = inject(Router);
  private dialogService = inject(DialogService);
  private postService = inject(PostService);

  private postsSubject = new BehaviorSubject<IPost[]>([]);
  posts$: Observable<IPost[]> = this.postsSubject.asObservable();

  isLoading = true;
  pageSize = 10;
  totalRecords = 0;
  firstNumber = 0;
  selectedPost: IPost | null = null;

  contextMenuItems: MenuItem[] = [
    {
      label: 'Просмотр',
      command: () => this.onView()
    },
    {
      label: 'Редактировать',
      command: () => this.onEdit()
    },
    {
      label: 'Удалить',
      command: () => this.onDelete()
    },
  ];

  ngOnInit(): void {
    this.loadPosts(this.pageSize, this.firstNumber);
  }

  loadPosts(limit: number, skip: number): void {
    this.postService.getPosts(limit, skip)
      .pipe(
        tap((response: IPostResponse) => {
          this.postsSubject.next(response.posts);
          this.totalRecords = response.total;
        }),

        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        error: () => {
          console.error('Ошибка загрузки постов');
        }
      });
  }

  pageChange(event: any): void {
    this.firstNumber = event.first ?? 0;
    this.pageSize = event.rows ?? 10;
    this.loadPosts(this.pageSize, this.firstNumber);
  }

  onPostSelect(id: number): void {
    this.router.navigate(['/posts', id]);
  }

  onView(): void {
    if (this.selectedPost) {
      this.onPostSelect(this.selectedPost.id);
    }
  }

  onEdit(): void {
    if (!this.selectedPost) {
      return;
    }
    this.dialogService.open(PostEditDialogComponent, {
      header: 'Post Edit',
      width: '50vw',
      modal: true,
      data: this.selectedPost,
      draggable: false,

      contentStyle: {
        overflow: 'auto'
      },

      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
    });
  }

  onDelete(): void {
    if (!this.selectedPost) {
      return;
    }
    const selectedPostId = this.selectedPost.id;
    this.postService.deletePost(selectedPostId)
      .pipe(
        tap(() => {
          const updatedPosts = this.postService.filterPost(
            this.postsSubject.getValue(),
            selectedPostId
          );
          this.postsSubject.next(updatedPosts);
        })
      )
      .subscribe();
  }

}
