import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../@services/auth.service';
import { ButtonModule } from 'primeng/button';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserInterface } from '../../@interfaces/user.interface';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [
    ButtonModule,
    RouterModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent implements OnInit {
  user: UserInterface | null = null;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      this.user = user;
      console.log('Usuário logado:', user);
    });
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigateByUrl('/login');
    });
  }
}
