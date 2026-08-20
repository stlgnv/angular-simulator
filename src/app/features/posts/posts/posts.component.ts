import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogService } from 'primeng/dynamicdialog';
import { MenuItem } from 'primeng/api';
import { SkeletonModule } from 'primeng/skeleton';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { catchError, EMPTY, finalize, Observable, tap } from 'rxjs';
import { IPost } from '../IPost';
import { IPostResponse } from '../IPost-response';
import { PostService } from '../post.service';
import { PostEditDialogComponent } from '../post-edit/post-edit.component';
import { NotificationService } from '../../../services/notification.service';

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

  private router: Router = inject(Router);
  private dialogService: DialogService = inject(DialogService);
  private postService: PostService = inject(PostService);
  private messageService: NotificationService = inject(NotificationService);

  posts$: Observable<IPost[]> = this.postService.posts$;

  isLoading: boolean = true;
  pageSize: number = 10;
  totalRecords: number = 0;
  firstNumber: number = 0;
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
          this.totalRecords = response.total;
        }),

        finalize(() => {
          this.isLoading = false;
        }),
        catchError(() => {
          this.messageService.showErrorMessage('Ошибка загрузки постов');
          return EMPTY;
        }),
      )
      .subscribe();
  }

  pageChange(event: TableLazyLoadEvent): void {
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
    
    this.postService
    .deletePost(this.selectedPost.id)
    .subscribe();
  }

}
