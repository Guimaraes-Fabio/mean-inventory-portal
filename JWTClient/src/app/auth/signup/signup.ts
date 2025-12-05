import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication-service';
import { Subject, takeUntil } from 'rxjs';
import { NgForm } from '@angular/forms';
import { AuthData } from '../../models/auth-data';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup implements OnDestroy, OnInit {
  public progress: boolean = false;

  private destroy$ = new Subject<void>();

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.getAuthStatusListener()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.progress = false;
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  signUp(form: NgForm): void {
    if (form.invalid)
      return;

    this.progress = true;

    let user: AuthData = {
      username: form.value.username,
      password: form.value.password
    }
    this.authService.createUser(user); 
    // on success we should have a record in the db and redirected to login
    // not success, we will get a message in the abovegetAuthStatusListener() from the error in createUser
  }
}
