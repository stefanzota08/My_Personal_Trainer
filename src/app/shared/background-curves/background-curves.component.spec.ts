import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundCurvesComponent } from './background-curves.component';

describe('BackgroundCurvesComponent', () => {
  let component: BackgroundCurvesComponent;
  let fixture: ComponentFixture<BackgroundCurvesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackgroundCurvesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackgroundCurvesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
