import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication-service';
import { Subject, takeUntil } from 'rxjs';
import { NgForm } from '@angular/forms';
import { AuthData } from '../../models/auth-data';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit, OnDestroy {
  progress: boolean = false;
  errors: string[] = [];
  private destroy$ = new Subject<void>();

  constructor(private authService: AuthenticationService) { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    // Listening for failed logins so we can present an error to the user and turn off the progress spinner
    this.authService.getAuthStatusListener()
      .pipe(takeUntil(this.destroy$))
      .subscribe(authStatus => {
        if (!authStatus.authenticated) {
          this.errors.push('Authentication failed');
          this.progress = false;
        }
      })
  }

  onLogin(form: NgForm): void {
    this.errors = [];

    if (form.invalid)
      return;

    this.progress = true;

    let authData: AuthData = {
      username: form.value.username,
      password: form.value.password
    }

    this.authService.login(authData);
  }
}
