import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyTrustUsComponent } from './why-trust-us.component';

describe('WhyTrustUsComponent', () => {
  let component: WhyTrustUsComponent;
  let fixture: ComponentFixture<WhyTrustUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhyTrustUsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhyTrustUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
