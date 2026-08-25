import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { NotificationService } from '../../../services/notification.service';
import { Router } from '@angular/router';
import { IPost } from '../IPost';
import { catchError, EMPTY, tap } from 'rxjs';

@Component({
  selector: 'app-post-create',
  imports: [ReactiveFormsModule],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss',
  standalone: true,
})
export class PostCreateComponent {

  private fb: FormBuilder = inject(FormBuilder);
  postService: PostService = inject(PostService);
  router: Router = inject(Router);
  messageService: NotificationService = inject(NotificationService);

  form: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    tags: ['', [Validators.required]],
    views: ['', [Validators.required]],
    body: ['', [Validators.required]],
    reactions: this.fb.group({
      likes: [0, [Validators.required]],
      dislikes: [0, [Validators.required]],
    }),
    userId: ['', [Validators.required]],
  })

  onSubmit(): void {
    this.postService.createPost(this.form.value as Partial<IPost>)
      .pipe(
        tap(() => {
          this.router.navigate(['/posts']);
        }),
        catchError(() => {
          this.messageService.showErrorMessage('Не удалось создать пост');
          return EMPTY;
        })
      )
      .subscribe();
  }
}
