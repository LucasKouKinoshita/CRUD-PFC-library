import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of, switchMap } from 'rxjs';
import { ProfileService, User } from '../../../@services/profile.service';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { Auth, authState } from '@angular/fire/auth';
import { User as FirebaseUser } from 'firebase/auth';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    DividerModule,
    ButtonModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user$!: Observable<User | null>;

  constructor(
    private profileService: ProfileService,
    private firebaseAuth: Auth
  ) {}

  ngOnInit(): void {
    this.user$ = authState(this.firebaseAuth).pipe(
      switchMap((user: FirebaseUser | null) => {
        if (user?.uid) {
          return this.profileService.getProfile(user.uid);
        }
        return of(null);
      })
    );
  }
}
