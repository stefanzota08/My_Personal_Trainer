import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { range } from 'rxjs';
import { WorkoutDataService } from '../services/workout-data.service';
import { WorkoutStateService } from '../services/workout-state.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  isModalOpen: boolean = false;
  isDailyRoutineSummaryOpen: boolean = false;
  exercisesList: any = null;
  dailyWorkouts: any = null;
  displayedTitle: string = null;
  selectedTab: string = null;
  selectedDay = null;
  todayWorkout = null;
  workoutEstimatedTime = null;
  numberOfDays = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];
  constructor(
    private readonly workoutDataService: WorkoutDataService,
    private readonly router: Router,
    private readonly workoutState: WorkoutStateService
  ) {
    // this.workoutDataService.addItemsToDatabase();
    this.getExercisesList();
    this.getDailyWorkouts();
  }

  openModal(bodyPart) {
    this.isModalOpen = true;
    this.selectedTab = bodyPart;
    this.displayedTitle = bodyPart + ' Workout';
  }

  closeSelectDayModal() {
    this.isModalOpen = false;
  }

  openDailyRoutineModal(dayNumber: number) {
    this.isDailyRoutineSummaryOpen = true;
    this.selectedDay = dayNumber;
    this.todayWorkout =
      this.dailyWorkouts[this.selectedTab][this.selectedDay - 1].exercises;
    this.todayWorkout = this.todayWorkout.map(
      (index) => this.exercisesList[this.selectedTab][index]
    );

    this.todayWorkout = this.todayWorkout.map((exercise) => {
      return {
        ...exercise,
        totalReps: Math.floor(
          exercise.initialReps * ((9 + this.selectedDay) / 10)
        ),
      };
    });

    let workoutTotalReps = 0;

    this.todayWorkout.forEach((exercise) => {
      workoutTotalReps += exercise.totalReps;
    });

    this.todayWorkout = this.todayWorkout.concat(this.todayWorkout);

    // nr of total reps * 4sec + (nr of exercises * 30 sec pause)
    this.workoutEstimatedTime =
      workoutTotalReps * 4 + this.todayWorkout.length * 30;

    this.workoutEstimatedTime = Math.ceil(this.workoutEstimatedTime / 60);

    console.log(this.todayWorkout);
  }

  closeDailyRoutineModal() {
    this.isDailyRoutineSummaryOpen = false;
  }

  async getExercisesList() {
    this.exercisesList = await this.workoutDataService.getExercisesList();
    console.log(this.exercisesList);
  }

  async getDailyWorkouts() {
    this.dailyWorkouts = await this.workoutDataService.getDailyWorkouts();
    console.log(this.dailyWorkouts);
  }

  startFullWorkoutFlow() {
    this.isModalOpen = false;
    this.isDailyRoutineSummaryOpen = false;
    this.workoutState.updateWorkoutData({ todayWorkout: this.todayWorkout });
    this.workoutState.updateWorkoutData({ bodyPart: this.selectedTab });
    this.router.navigateByUrl('/full-workout-flow', { replaceUrl: true });
  }
}
