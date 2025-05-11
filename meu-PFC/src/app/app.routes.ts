import { Routes } from '@angular/router';
import { authRoutes } from './@pages/auth/auth.routes';
import { homeRoutes } from './@pages/home/home.routes';
import { pfcManagementRoutes } from './@pages/pfc-management/pfc-management.routes';

export const routes: Routes = [
    {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full',
    },
    ...authRoutes,
    ...homeRoutes,
    ...pfcManagementRoutes,
    {
    path: '**',
    redirectTo: 'home',
    },
  ];
