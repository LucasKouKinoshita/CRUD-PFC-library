import { inject, Injectable, Signal, signal } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  reauthenticateWithCredential,
  updatePassword,
  updateProfile,
  user,
} from '@angular/fire/auth';
import { EmailAuthProvider, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { from, Observable } from 'rxjs';
import { UserInterface } from '../@interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _currentUserSig = signal<UserInterface | null>(null);
  currentUserSig = this._currentUserSig.asReadonly();

  firebaseAuth = inject(Auth);
  currentUser$: Observable<User | null> = authState(this.firebaseAuth);

  constructor() {
    authState(this.firebaseAuth).subscribe((user) => {
      if (user) {
        this._currentUserSig.set({
          email: user.email || '',
          username: user.displayName || '',
        });
      } else {
        this._currentUserSig.set(null);
      }
    });
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
        this._currentUserSig.set({
          email: currentUser.email || '',
          username: currentUser.displayName || '',
        });
      }
    });

    return from(promise);
  }

  logout(): Observable<void> {
    this._currentUserSig.set(null);
    return from(signOut(this.firebaseAuth));
  }

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
