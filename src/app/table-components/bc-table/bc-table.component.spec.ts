import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BCTableComponent } from './bc-table.component';

describe('BCTableComponent', () => {
  let component: BCTableComponent;
  let fixture: ComponentFixture<BCTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BCTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BCTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
