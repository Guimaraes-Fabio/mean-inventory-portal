import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-activity',
  standalone: false,
  templateUrl: './activity.html',
  styleUrl: './activity.css',
})
export class Activity {
  @Input() message: string = '';
}
