import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, doc, updateDoc, getDoc } from '@angular/fire/firestore';
import * as workouts from '../workout-logic-db';
import { DailyDataService } from './daily-data.service';
@Injectable({
  providedIn: 'root',
})
export class WorkoutDataService {
  constructor(
    private readonly firestore: Firestore,
    private readonly dailyDataService: DailyDataService,
    private readonly auth: Auth
  ) {}

  // async addItemsToDatabase() {
  //   const workoutDataRef = doc(this.firestore, `workout-data/exercises`);
  //   const exercises = workouts.exercises;
  //   let uploadedData = {};
  //   uploadedData['abs'] = exercises.abs;
  //   uploadedData['chest'] = exercises.chest;
  //   uploadedData['legs'] = exercises.legs;
  //   uploadedData['arms'] = exercises.arms;
  //   updateDoc(workoutDataRef, uploadedData);

  //   const dailyWorkoutsRef = doc(this.firestore, `workout-data/daily-workouts`);
  //   const dailyWorkouts = workouts.dailyWorkouts;
  //   let _uploadedData = {};
  //   _uploadedData['abs'] = dailyWorkouts.abs;
  //   _uploadedData['chest'] = dailyWorkouts.chest;
  //   _uploadedData['legs'] = dailyWorkouts.legs;
  //   _uploadedData['arms'] = dailyWorkouts.arms;
  //   // uploadedData['chest'] = exercises.chest;
  //   updateDoc(dailyWorkoutsRef, _uploadedData);
  // }

  async getExercisesList() {
    const workoutDataRef = doc(this.firestore, `workout-data/exercises`);
    const result = await getDoc(workoutDataRef);
    return result.data();
  }

  async getDailyWorkouts() {
    const dailyWorkoutsRef = doc(this.firestore, `workout-data/daily-workouts`);
    const result = await getDoc(dailyWorkoutsRef);
    return result.data();
  }

  async getExerciseCompletion() {
    const user = this.auth.currentUser;
    const dailyWorkoutsRef = doc(
      this.firestore,
      `exercise-completion/${user.uid}`
    );
    const result = await getDoc(dailyWorkoutsRef);
    return result.data();
  }

  async addWorkout(item) {
    const currentDate = this.dailyDataService.getCurrentDate();
    const user = this.auth.currentUser;
    const docRef = doc(this.firestore, `daily-data/${user.uid}`);

    let currentKcal: number;
    let currentProtein: number;
    let currentCarbs: number;
    let currentFats: number;
    let weight: number;
    let meals: any[] = [];
    let workouts: any[] = [];

    try {
      await this.dailyDataService.getTodaysData().then((data) => {
        currentKcal = data.totalKcal;
        currentProtein = data.totalProtein;
        currentFats = data.totalFats;
        currentCarbs = data.totalCarbs;
        weight = data.weight;
        meals = data.meals;
        workouts = data.workouts;
      });
    } catch {
      this.dailyDataService.instantCreateNewDayDocument();
      this.dailyDataService.getTodaysData();
    }

    workouts.push({ ...item });

    let todayData = {};
    todayData[currentDate] = {
      totalKcal: currentKcal,
      totalCarbs: currentCarbs,
      totalProtein: currentProtein,
      totalFats: currentFats,
      weight: weight,
      meals: meals,
      workouts: workouts,
    };
    updateDoc(docRef, todayData);
  }

  async removeWorkout(item) {
    const currentDate = this.dailyDataService.getCurrentDate();
    const user = this.auth.currentUser;
    const docRef = doc(this.firestore, `daily-data/${user.uid}`);

    let currentKcal: number;
    let currentProtein: number;
    let currentCarbs: number;
    let currentFats: number;
    let weight: number;
    let meals: any[] = [];
    let workouts: any[] = [];

    try {
      await this.dailyDataService.getTodaysData().then((data) => {
        currentKcal = data.totalKcal;
        currentProtein = data.totalProtein;
        currentFats = data.totalFats;
        currentCarbs = data.totalCarbs;
        weight = data.weight;
        meals = data.meals;
        workouts = data.workouts;
      });
    } catch {
      this.dailyDataService.instantCreateNewDayDocument();
      this.dailyDataService.getTodaysData();
    }

    console.log('before', workouts);
    let indexForRemoval;
    workouts.forEach((workout, index) => {
      if (
        workout.bodyPart === item.bodyPart &&
        workout.time === item.time &&
        workout.exercisesNr === item.exercisesNr
      ) {
        indexForRemoval = index;
      }
    });

    workouts.splice(indexForRemoval, 1);
    console.log('after', workouts);

    let todayData = {};
    todayData[currentDate] = {
      totalKcal: currentKcal,
      totalCarbs: currentCarbs,
      totalProtein: currentProtein,
      totalFats: currentFats,
      weight: weight,
      meals: meals,
      workouts: workouts,
    };
    updateDoc(docRef, todayData);
  }

  async setDayAsCompleted(dayNumber, bodyPart) {
    const user = this.auth.currentUser;
    const dailyWorkoutsRef = doc(
      this.firestore,
      `exercise-completion/${user.uid}`
    );
    const result = await getDoc(dailyWorkoutsRef);
    let dailyWorkoutInfo = result.data();
    dailyWorkoutInfo[bodyPart][dayNumber] = 1;
    console.log(dailyWorkoutInfo);
    updateDoc(dailyWorkoutsRef, dailyWorkoutInfo);
  }
}
