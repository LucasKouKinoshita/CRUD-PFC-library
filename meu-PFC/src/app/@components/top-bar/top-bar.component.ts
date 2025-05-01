import { Component, inject } from '@angular/core';
import { AuthService } from '../../@services/auth.service';
import { ButtonModule } from 'primeng/button';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  imports: [ButtonModule],
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
