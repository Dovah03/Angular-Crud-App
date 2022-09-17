import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDevisComponent } from './client-devis.component';

describe('ClientDevisComponent', () => {
  let component: ClientDevisComponent;
  let fixture: ComponentFixture<ClientDevisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientDevisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientDevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
