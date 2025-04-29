import { Routes } from '@angular/router';

export const pfcManagementRoutes: Routes = [
  {
    path: 'upload-pfc',
    loadComponent: () =>
      import('./pfc-uploader/pfc-uploader.component').then((m) => m.PfcUploaderComponent),
  },
];
