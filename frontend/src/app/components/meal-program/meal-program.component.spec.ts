import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealProgramComponent } from './meal-program.component';

describe('MealProgramComponent', () => {
  let component: MealProgramComponent;
  let fixture: ComponentFixture<MealProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MealProgramComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MealProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
