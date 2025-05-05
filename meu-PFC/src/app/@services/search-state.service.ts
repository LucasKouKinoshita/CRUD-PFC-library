import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface SearchTerm {
  term: string;
  field: string;
}

@Injectable({
  providedIn: 'root'
})
export class SearchStateService {
  private searchTermSubject = new BehaviorSubject<SearchTerm | null>(null);

  // Observable que os componentes podem assinar para escutar atualizações da busca
  public readonly searchTerm$: Observable<SearchTerm | null> = this.searchTermSubject.asObservable();

  constructor() {}

  // Atualiza o termo e o campo de busca
  setSearchTerm(term: string, field: string) {
    const cleanTerm = term.trim().toLowerCase(); // normaliza para melhorar a comparação
    this.searchTermSubject.next({ term: cleanTerm, field });
  }

  // Reseta a busca (opcional, se quiser limpar filtros)
  clearSearchTerm() {
    this.searchTermSubject.next(null);
  }
}
