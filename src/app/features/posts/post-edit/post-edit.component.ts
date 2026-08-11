import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { catchError, EMPTY, tap } from 'rxjs';
import { PostService } from '../post.service';
import { DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IPost } from '../IPost';
import { Component, inject, OnInit } from '@angular/core';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-post-edit-dialog',
  imports: [DynamicDialogModule, ReactiveFormsModule],
  templateUrl: './post-edit.component.html',
  styleUrl: './post-edit.component.scss',
})
export class PostEditDialogComponent implements OnInit {

  dynamicDialogConfig: DynamicDialogConfig = inject(DynamicDialogConfig);
  dynamicDialogRef: DynamicDialogRef = inject(DynamicDialogRef);
  postService: PostService = inject(PostService);
  formBuilder: FormBuilder = inject(FormBuilder);
  messageService: NotificationService = inject(NotificationService);

  post!: IPost;

  ngOnInit(): void {
    this.post = this.dynamicDialogConfig.data;

    this.form = this.formBuilder.group({
    title: this.post.title,
    tags: this.post.tags.join(', '),
    views: this.post.views,
  });
  }

  form!: FormGroup;

  saveChanges(): void {
    const convertedData: Partial<IPost> = {
      title: this.form.value.title,
      tags: this.form.value.tags.split(', '),
      views: this.form.value.views,
    }
    this.postService.updatePost(this.dynamicDialogConfig.data.id, convertedData)
      .pipe(
        tap(() => this.dynamicDialogRef.close(),
      ),
      catchError(() => {
        this.messageService.showErrorMessage('Не удалось сохранить изменения');
        return EMPTY;
      }),
    ).subscribe();
  }

}
