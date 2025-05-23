import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  DocumentData,
  Firestore,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Pfc {
  email: string;
  title: string;
  orientator: string;
  author: string;
  content: string;
  orientatorReview: string;
}

@Injectable({
  providedIn: 'root',
})
export class PfcService {
  email: string | undefined;
  private collectionName = 'pfcs';

  constructor(
    private readonly authService: AuthService,
    private readonly firestore: Firestore
  ) {}

  async setEmailFromAuth(): Promise<void> {
    const user = this.authService.currentUserSig();
    if (user) {
      this.email = user.email;
    }
  }

  async addPfc(content: string, title: string, orientator: string, author: string, orientatorReview: string) {
    if (!this.email) {
      await this.setEmailFromAuth();
      if (!this.email) throw new Error('User not authenticated.');
    }

    const pfcRef = collection(this.firestore, this.collectionName);
    const pfcData: Pfc = {
      email: this.email,
      title,
      orientator,
      author,
      content,
      orientatorReview
    };
    await addDoc(pfcRef, pfcData);
  }

  getPfcs(): Observable<(DocumentData & { id: string })[]> {
    const pfcRef = collection(this.firestore, this.collectionName);
    return collectionData(pfcRef, { idField: 'id' }) as Observable<(DocumentData & { id: string })[]>;
  }

  getPfcById(id: string): Observable<DocumentData | undefined> {
    const itemDoc = doc(this.firestore, `${this.collectionName}/${id}`);
    return docData(itemDoc, { idField: 'id' });
  }

  async updatePfc(id: string, data: Partial<Pfc>): Promise<void> {
    const itemDoc = doc(this.firestore, `${this.collectionName}/${id}`);
    return updateDoc(itemDoc, data);
  }

  async deletePfc(id: string): Promise<void> {
    const itemDoc = doc(this.firestore, `${this.collectionName}/${id}`);
    await deleteDoc(itemDoc);
  }
}
