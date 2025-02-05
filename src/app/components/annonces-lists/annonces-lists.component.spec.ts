import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnoncesListsComponent } from './annonces-lists.component';

describe('AnnoncesListsComponent', () => {
  let component: AnnoncesListsComponent;
  let fixture: ComponentFixture<AnnoncesListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnoncesListsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnoncesListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
