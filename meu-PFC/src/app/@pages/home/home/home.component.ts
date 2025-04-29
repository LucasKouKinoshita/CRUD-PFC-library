import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../@services/auth.service';
import { Router } from '@angular/router';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { DisplayComponent } from '../display/display.component';

@Component({
  selector: 'app-home',
  imports: [
    SearchBarComponent,
    DisplayComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit{
  authService = inject(AuthService);
  router = inject(Router);

  ngOnInit(): void {
    if (!this.authService.currentUserSig()) {
      this.router.navigateByUrl('/login');
    }
  }

}
