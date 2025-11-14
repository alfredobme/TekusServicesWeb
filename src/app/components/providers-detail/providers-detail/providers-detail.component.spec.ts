import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidersDetailComponent } from './providers-detail.component';

describe('ProvidersDetailComponent', () => {
  let component: ProvidersDetailComponent;
  let fixture: ComponentFixture<ProvidersDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProvidersDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProvidersDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
