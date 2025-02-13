import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoupDeCoeurComponent } from './coup-de-coeur.component';

describe('CoupDeCoeurComponent', () => {
  let component: CoupDeCoeurComponent;
  let fixture: ComponentFixture<CoupDeCoeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoupDeCoeurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoupDeCoeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
