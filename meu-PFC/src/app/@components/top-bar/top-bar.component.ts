import { Component, inject } from '@angular/core';
import { AuthService } from '../../@services/auth.service';
import { ButtonModule } from 'primeng/button';
import { RouterModule, Router } from '@angular/router';
import { PfcUploaderComponent } from '../pfc-uploader/pfc-uploader.component';

@Component({
  selector: 'app-top-bar',
  imports: [ButtonModule, PfcUploaderComponent],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent {
  authService = inject(AuthService);
  router = inject(Router); 

  logout(): void{
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigateByUrl('/login');
      }
    });
  }
}
