import { Routes } from '@angular/router';

export const pfcManagementRoutes: Routes = [
  {
    path: 'upload-pfc',
    loadComponent: () =>
      import('./pfc-uploader/pfc-uploader.component').then((m) => m.PfcUploaderComponent),
  },
  {
    path: 'manage-pfc',
    loadComponent: () =>
      import('./pfc-manager/pfc-manager.component').then((m) => m.PfcManagerComponent),
  },
];
