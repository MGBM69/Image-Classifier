import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ImageClassifier } from './image-classifier/image-classifier';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ImageClassifier],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ai-image-classifier');
}
