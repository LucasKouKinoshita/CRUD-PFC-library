import { TestBed } from '@angular/core/testing';

import { PfcService } from './pfc.service';

describe('PfcService', () => {
  let service: PfcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PfcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
