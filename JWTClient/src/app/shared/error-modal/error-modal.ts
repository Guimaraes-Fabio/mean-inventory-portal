import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-modal',
  standalone: false,
  templateUrl: './error-modal.html',
  styleUrl: './error-modal.css',
})
export class ErrorModal {
  @Input() errors: string[] = [];
  @Input() show: boolean = false;

  close() {
    this.show = false;
    this.errors = [];
  }
}
