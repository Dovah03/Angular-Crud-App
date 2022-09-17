import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientBcComponent } from './client-bc.component';

describe('ClientBcComponent', () => {
  let component: ClientBcComponent;
  let fixture: ComponentFixture<ClientBcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientBcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientBcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
