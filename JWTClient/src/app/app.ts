import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { ErrorService } from './services/error-service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  showError: boolean = false;
  errorMessages: string[] = [];
  username?: string;

  private destroy$ = new Subject<void>();

  constructor(private errorService: ErrorService) { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.errorService.getErrorAlertListener()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (message: string[]) => {
        console.log(message);
        this.showError = true;
        this.errorMessages = message;
      }
    })
  }
}
