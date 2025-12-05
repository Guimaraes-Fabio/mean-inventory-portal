import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../auth/services/authentication-service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  const isAuth = authService.getIsAuthenticated();

  if(!isAuth)
    router.navigate(['/login']);

  return isAuth;
};
