import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { UserService } from '@services/user.service';

export const authGuard: CanActivateChildFn = () => {
  const userService = inject(UserService);
  const router = inject(Router);
  if (userService.isLoggedIn()) {
    return true;
  }
  return router.parseUrl(['', 'auth', 'login'].join('/'));
};
