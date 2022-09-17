import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientBlComponent } from './client-bl.component';

describe('ClientBlComponent', () => {
  let component: ClientBlComponent;
  let fixture: ComponentFixture<ClientBlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientBlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientBlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
