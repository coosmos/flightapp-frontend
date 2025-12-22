import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { getRoles, isAdmin } from '../utils/auth.util';

export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);
 console.log('ADMIN GUARD ROLES:', getRoles());
  if (isAdmin()) {
    return true;
  }

  router.navigate(['/']);
  return false;
};
