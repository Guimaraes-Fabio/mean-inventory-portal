import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AuthStatus } from '../../models/auth-status';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ErrorService } from '../../services/error-service';
import { AuthData } from '../../models/auth-data';
import { LoggedIn } from '../../models/logged-in';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly API_URL: string = 'https://mean-inventory-portal-4i7b.vercel.app/';
  private tokenTimer: any;
  private isAuthenticated: boolean = false;
  private username?: string;
  private token?: string;
  private authStatusListener = new Subject<AuthStatus>();

  getAuthStatusListener(): Observable<AuthStatus> {
    return this.authStatusListener.asObservable();
  }

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private errorService: ErrorService) { }

  getToken(): string {
    return this.token!;
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  getUserName(): string {
    return this.username!;
  }

  createUser(user: AuthData): void {
    const apiMethod: string = `${this.API_URL}/api/auth/signup`;

    this.httpClient.post(apiMethod, user)
      .subscribe({
        next: () => {
          this.router.navigate(['/login']);// redirect user
        },
        error: error => {
          // http error issued from the backend
          // network loss
          console.log(error);
          this.errorService.issueErrorAlert(error.error);
          this.authStatusListener.next({ username: undefined, authenticated: false });
        }
      });
  }

  login(user: AuthData): void {
    const apiMethod: string = `${this.API_URL}/api/auth/login`;

    this.httpClient.post<LoggedIn>(apiMethod, user)
      .subscribe({
        next: (response: LoggedIn) => {
          this.token = response.token;

          if (!!this.token) {
            const expiresIn = response.expiresIn;
            this.setAuthTimer(response.expiresIn); // timer for the expiry of the token. Runs in the background
            this.username = response.username;
            this.isAuthenticated = true;
            this.authStatusListener.next({
              username: this.username, authenticated: true
            }); // raise event that othe component can listen for

            // save token and expiry in local storage for the purpose of being able to leave the site and come back
            // and just use the token we sotred in local storage if not expired
            const expireDate: Date = new Date(new Date(new Date().getTime() + (expiresIn ? expiresIn : 0) * 1000));

            this.saveAuthData(this.token, expireDate, this.username ?? '');

            this.router.navigate(['/']);
          }
        },
        error: () => {
          this.authStatusListener.next({
            username: undefined, authenticated: false
          });
        }
      })
  }

  private saveAuthData(token: string, expirationDate: Date, username: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('username', username);
  }

  private clearAuthData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('username');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const username = localStorage.getItem('username');

    if (!token || !expirationDate)
      return;

    return {
      token,
      expirationDate: new Date(expirationDate),
      username
    }
  }

  private setAuthTimer(expiresIn?: number): void {
    if (!!expiresIn) {
      this.tokenTimer = setTimeout(() => {
        this.logout();
      }, expiresIn * 1000)
    }
  }

  public logout() {
    this.token = undefined;
    this.username = undefined;
    this.isAuthenticated = false;
    this.authStatusListener.next({
      username: undefined, authenticated: false
    });

    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/login']);
  }

  public autoAuthUser(): void {
    const authData = this.getAuthData();

    if (!authData)
      return;

    const now = new Date();
    const expiresIn = authData.expirationDate.getTime() - now.getTime();

    if (expiresIn > 0) {
      this.token = authData.token;
      this.isAuthenticated = true;
      this.username = authData.username!;
      this.authStatusListener.next({ username: this.username, authenticated: true });
      this.setAuthTimer(expiresIn / 1000);
    }
  }
}
