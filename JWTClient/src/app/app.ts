import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { ErrorService } from './services/error-service';
import { Subject, take, takeUntil } from 'rxjs';
import { AuthenticationService } from './auth/services/authentication-service';

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
  userIsAuthenticated: boolean = false;

  private destroy$ = new Subject<void>();

  constructor(
    private errorService: ErrorService,
    private authService: AuthenticationService
  ) { }

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

    this.authService.getAuthStatusListener()
      .pipe(takeUntil(this.destroy$))
      .subscribe(authStatus => {
        this.username = authStatus.username;
        this.userIsAuthenticated = authStatus.authenticated;
      });
  }

  logOut(): void {
    this.username = undefined;
    this.authService.logout();
  }
}
