import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FullWorkoutFlowPage } from './full-workout-flow.page';

describe('FullWorkoutFlowPage', () => {
  let component: FullWorkoutFlowPage;
  let fixture: ComponentFixture<FullWorkoutFlowPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FullWorkoutFlowPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FullWorkoutFlowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
