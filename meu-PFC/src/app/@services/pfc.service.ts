import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';

export interface Pfc {
  email: string;
  title: string;
  orientator: string;
  author: string;
  content: string;
}
@Injectable({
  providedIn: 'root',
})
export class PfcService {
  email: string | undefined;

  constructor(
    private readonly authService: AuthService,
    private readonly firestore: Firestore
  ) {
  }

  async setEmailFromAuth(): Promise<void> {
    const user = this.authService.currentUserSig();
    if (user) {
      this.email = user.email;
    }
  }

  async addPfc(content: string, title: string, orientator: string, author: string) {
    if (!this.email) {
      await this.setEmailFromAuth();
      if (!this.email) throw new Error('User not authenticated.');
    }

    const pfcRef = collection(this.firestore, 'pfcs');
    const pfcData: Pfc = {
      email: this.email,
      title,
      orientator,
      author,
      content,
    };
    return addDoc(pfcRef, pfcData);
  }
}