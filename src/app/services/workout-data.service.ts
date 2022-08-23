import { Injectable } from '@angular/core';
import { Firestore, doc, updateDoc, getDoc } from '@angular/fire/firestore';
import * as workouts from '../workout-logic-db';
@Injectable({
  providedIn: 'root',
})
export class WorkoutDataService {
  constructor(private readonly firestore: Firestore) {}

  async addItemsToDatabase() {
    const workoutDataRef = doc(this.firestore, `workout-data/exercises`);
    const exercises = workouts.exercises;
    let uploadedData = {};
    uploadedData['abs'] = exercises.abs;
    uploadedData['chest'] = exercises.chest;
    uploadedData['legs'] = exercises.legs;
    uploadedData['arms'] = exercises.arms;
    updateDoc(workoutDataRef, uploadedData);

    const dailyWorkoutsRef = doc(this.firestore, `workout-data/daily-workouts`);
    const dailyWorkouts = workouts.dailyWorkouts;
    let _uploadedData = {};
    _uploadedData['abs'] = dailyWorkouts.abs;
    _uploadedData['chest'] = dailyWorkouts.chest;
    _uploadedData['legs'] = dailyWorkouts.legs;
    _uploadedData['arms'] = dailyWorkouts.arms;
    // uploadedData['chest'] = exercises.chest;
    updateDoc(dailyWorkoutsRef, _uploadedData);
  }

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
}
