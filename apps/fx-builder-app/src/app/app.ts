import { Component } from '@angular/core';
import { Test } from '@theclovedental/fx-builder-wrapper';

@Component({
  standalone: true,
  imports: [ Test ],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'fx-builder-app';
}
