import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkoutStateService {
  private workoutData = new BehaviorSubject({
    todayWorkout: null,
    bodyPart: null,
  });

  currentWorkoutData = this.workoutData.asObservable();

  constructor() {}

  updateWorkoutData(data) {
    // console.log(data);
    this.workoutData.next({ ...this.workoutData.value, ...data });
  }
}
