import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlTableComponent } from './bl-table.component';

describe('BlTableComponent', () => {
  let component: BlTableComponent;
  let fixture: ComponentFixture<BlTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
