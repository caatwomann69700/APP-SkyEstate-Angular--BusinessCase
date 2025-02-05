import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnoncesPageComponent } from './annonces-page.component';

describe('AnnoncesPageComponent', () => {
  let component: AnnoncesPageComponent;
  let fixture: ComponentFixture<AnnoncesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnoncesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnoncesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
