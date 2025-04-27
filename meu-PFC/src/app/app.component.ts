import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBarComponent } from './@components/top-bar/top-bar.component';
import { BottomBarComponent } from './@components/bottom-bar/bottom-bar.component';
import { AuthService } from './@services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopBarComponent, BottomBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'meu-PFC';

  authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.authService.currentUserSig.set({
          email: user.email!,
          username: user.displayName!,
        });
      } else {
        this.authService.currentUserSig.set(null);
      }
      console.log(this.authService.currentUserSig())
    });
  }
}
