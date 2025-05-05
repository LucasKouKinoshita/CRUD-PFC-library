import { Component, inject, OnInit, Signal } from '@angular/core';
import { AuthService } from '../../@services/auth.service';
import { ButtonModule } from 'primeng/button';
import { RouterModule, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'firebase/auth';
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
  styleUrls: ['./top-bar.component.css'], // <-- Fix here too
})
export class TopBarComponent implements OnInit{
  user!: UserInterface | undefined

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      if (user) {
        this.user = user
        console.log('User is logged in:', user);
      } else {
        this.user = undefined
      }
    });
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigateByUrl('/login');
    });
  }
}
