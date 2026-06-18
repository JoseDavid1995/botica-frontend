import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // Si estamos en el servidor, permitimos el paso para evitar redirecciones erróneas
  if (!isPlatformBrowser(platformId)) {
    return true; 
  }

  // Ahora, si estamos en el navegador, validamos el token
  if (authService.getToken()) {
    return true; 
  } else {
    router.navigate(['/login']);
    return false;
  }
};