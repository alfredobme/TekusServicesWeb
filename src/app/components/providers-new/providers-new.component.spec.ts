import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProvidersNewComponent } from './providers-new.component';

describe('ProvidersNewComponent', () => {
  let component: ProvidersNewComponent;
  let fixture: ComponentFixture<ProvidersNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProvidersNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProvidersNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
