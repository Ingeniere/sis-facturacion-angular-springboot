import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoClientesComponent } from './nuevo-clientes.component';

describe('NuevoClientesComponent', () => {
  let component: NuevoClientesComponent;
  let fixture: ComponentFixture<NuevoClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoClientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevoClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
