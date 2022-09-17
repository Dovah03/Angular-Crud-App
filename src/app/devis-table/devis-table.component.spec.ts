import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevisTableComponent } from './devis-table.component';

describe('DevisTableComponent', () => {
  let component: DevisTableComponent;
  let fixture: ComponentFixture<DevisTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevisTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevisTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
