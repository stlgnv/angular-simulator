import { Component, inject } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { AsyncPipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowsRotate, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-loader',
  imports: [AsyncPipe, FontAwesomeModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
  standalone: true
})
export class LoaderComponent {

  loaderService: LoaderService = inject(LoaderService);

  faArrowsRotate: IconDefinition = faArrowsRotate;

}
