import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBarComponent } from './@components/top-bar/top-bar.component';
import { AuthService } from './@services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit{
  title = 'meu-PFC';

  authService = inject(AuthService);

  ngOnInit(): void {
  }
}
