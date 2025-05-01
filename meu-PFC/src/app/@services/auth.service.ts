import { inject, Injectable, signal } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  reauthenticateWithCredential,
  updatePassword,
  updateProfile,
  user,
} from '@angular/fire/auth';
import { EmailAuthProvider, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { from, Observable } from 'rxjs';
import { UserInterface } from '../@interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth);
  user$ = user(this.firebaseAuth)
  currentUserSig = signal<UserInterface | null | undefined>(undefined)

  constructor() {}

  register(
    email: string,
    username: string,
    password: string
  ): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then((response) =>
      updateProfile(response.user, { displayName: username })
    );

    return from(promise);
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then(() => {
      const currentUser = this.firebaseAuth.currentUser;

      if (currentUser) {
        // Set the currentUserSig signal with email and displayName
        this.currentUserSig.set({
          email: currentUser.email || '',
          username: currentUser.displayName || '',
        });
      }
    });

    return from(promise);
  }

  logout(): Observable<void> {
    const promise = signOut(this.firebaseAuth)
    this.currentUserSig.set(null);
    return from(promise)
  }

  changePassword(newPassword: string, currentPassword: string): Observable<void> {
    const user = this.firebaseAuth.currentUser;

    if (user) {
      const credential = EmailAuthProvider.credential(user.email || '', currentPassword);

      return from(
        reauthenticateWithCredential(user, credential)
          .then(() => {
            return updatePassword(user, newPassword);
          })
          .catch((error) => {
            throw error;
          })
      );
    }

    return new Observable<void>((observer) => {
      observer.error('No user is signed in.');
    });
  }
}
