import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousingLocatingComponent } from './housing-locating.component';

describe('HousingLocatingComponent', () => {
  let component: HousingLocatingComponent;
  let fixture: ComponentFixture<HousingLocatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HousingLocatingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HousingLocatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
