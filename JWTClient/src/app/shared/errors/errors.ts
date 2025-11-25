import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-errors',
  standalone: false,
  templateUrl: './errors.html',
  styleUrl: './errors.css',
})
export class Errors {
  @Input() messages: string[] = [];
}
