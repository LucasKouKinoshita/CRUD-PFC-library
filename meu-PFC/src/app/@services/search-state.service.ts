import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchStateService {
  private searchTermSubject = new BehaviorSubject<{ term: string; field: string } | null>(null);
  searchTerm$ = this.searchTermSubject.asObservable();

  setSearchTerm(term: string, field: string) {
    this.searchTermSubject.next({ term, field });
  }
}
