import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchBarService {
  constructor(private firestore: Firestore) {}

  searchTccs(field: string, value: string): Observable<any[]> {
    const tccCollection = collection(this.firestore, 'pfcs');

    const q = query(
      tccCollection,
      where(field, '>=', value),
      where(field, '<=', value + '\uf8ff')
    );

    return collectionData(q, { idField: 'id' });
  }
}
