import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface User {
  uid: string;
  displayName: string;
  email: string;
  tccTitle?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private firestore: AngularFirestore) {}

  /**
   * Obtém os dados do perfil do usuário a partir do Firestore
   * @param uid UID do usuário logado
   * @returns Observable com os dados ou null se não encontrado
   */
  getProfile(uid: string): Observable<User | null> {
    if (!uid) return of(null);

    return this.firestore
      .doc<User>(`users/${uid}`)
      .valueChanges()
      .pipe(map(user => user ?? null)); // garante que nunca retorna undefined
  }

  /**
   * Atualiza os dados do perfil do usuário, exceto o UID
   * @param uid UID do usuário logado
   * @param data Campos parciais a serem atualizados
   * @returns Promise do Firebase
   */
  updateProfile(uid: string, data: Omit<Partial<User>, 'uid'>) {
    return this.firestore
      .doc(`users/${uid}`) // REMOVIDO <User> aqui para permitir dados parciais
      .set(data, { merge: true });
  }
}
