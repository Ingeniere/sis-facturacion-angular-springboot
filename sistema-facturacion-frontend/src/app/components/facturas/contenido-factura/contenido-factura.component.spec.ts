import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidoFacturaComponent } from './contenido-factura.component';

describe('ContenidoFacturaComponent', () => {
  let component: ContenidoFacturaComponent;
  let fixture: ComponentFixture<ContenidoFacturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenidoFacturaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenidoFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
