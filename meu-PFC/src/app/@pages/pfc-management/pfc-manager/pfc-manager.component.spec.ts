import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PfcManagerComponent } from './pfc-manager.component';

describe('PfcManagerComponent', () => {
  let component: PfcManagerComponent;
  let fixture: ComponentFixture<PfcManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PfcManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PfcManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
