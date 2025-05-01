import { Routes } from '@angular/router';
import { authRoutes } from './@pages/auth/auth.routes';
import { homeRoutes } from './@pages/home/home..routes';

export const routes: Routes = [
    {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full',
    },
    ...authRoutes,
    ...homeRoutes,
    {
    path: '**',
    redirectTo: 'home',
    },
  ];
