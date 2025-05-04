import { TestBed } from '@angular/core/testing';
import { SearchBarService } from './search-bar.service';
import { Firestore } from '@angular/fire/firestore';

describe('SearchBarService', () => {
  let service: SearchBarService;
  let firestoreMock: jasmine.SpyObj<Firestore>;

  beforeEach(() => {
    firestoreMock = jasmine.createSpyObj('Firestore', ['']);
    TestBed.configureTestingModule({
      providers: [
        SearchBarService,
        { provide: Firestore, useValue: firestoreMock }
      ]
    });
    service = TestBed.inject(SearchBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
