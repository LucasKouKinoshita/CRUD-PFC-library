import { TestBed } from '@angular/core/testing';
import { SearchStateService } from './search-state.service';

describe('SearchStateService', () => {
  let service: SearchStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchStateService]
    });
    service = TestBed.inject(SearchStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and emit search term and field', (done) => {
    const term = 'redes neurais';
    const field = 'title';

    service.searchTerm$.subscribe(value => {
      if (value) {
        expect(value.term).toBe(term);
        expect(value.field).toBe(field);
        done();
      }
    });

    service.setSearchTerm(term, field);
  });

  it('should emit null by default', (done) => {
    service.searchTerm$.subscribe(value => {
      expect(value).toBeNull();
      done();
    });
  });
});
