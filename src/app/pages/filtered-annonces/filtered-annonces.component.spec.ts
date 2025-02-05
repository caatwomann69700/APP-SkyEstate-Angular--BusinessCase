import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredAnnoncesComponent } from './filtered-annonces.component';

describe('FilteredAnnoncesComponent', () => {
  let component: FilteredAnnoncesComponent;
  let fixture: ComponentFixture<FilteredAnnoncesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilteredAnnoncesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilteredAnnoncesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
