import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PfcUploaderComponent } from './pfc-uploader.component';

describe('PfcUploaderComponent', () => {
  let component: PfcUploaderComponent;
  let fixture: ComponentFixture<PfcUploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PfcUploaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PfcUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
