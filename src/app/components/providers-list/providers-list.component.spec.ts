import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColaboradoresListadoComponent } from './providers-list.component';

describe('ColaboradoresListadoComponent', () => {
  let component: ColaboradoresListadoComponent;
  let fixture: ComponentFixture<ColaboradoresListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColaboradoresListadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColaboradoresListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
