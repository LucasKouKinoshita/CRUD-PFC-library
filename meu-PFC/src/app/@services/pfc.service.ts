import { inject, Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Storage, ref, uploadString, getDownloadURL } from '@angular/fire/storage';

export interface Pfc {
  email: string;
  titulo: string;
  orientador: string;
  fileUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class PfcService {
  firestore = inject(Firestore);
  storage = inject(Storage)

  constructor() { }

  async postPfc(email: string, titulo: string, orientador: string, base64Pdf: string): Promise<void> {
    try {
      const filePath = `trabalhos/${email}_${Date.now()}.pdf`;
      const fileRef = ref(this.storage, filePath);
      await uploadString(fileRef, base64Pdf, 'base64');

      const fileUrl = await getDownloadURL(fileRef);

      const trabalhosRef = collection(this.firestore, 'trabalhos');
      await addDoc(trabalhosRef, {
        email,
        titulo,
        orientador,
        fileUrl,
        createdAt: new Date(),
      });

    } catch (error) {
      console.error('Error while posting', error);
      throw error;
    }
  }
}
