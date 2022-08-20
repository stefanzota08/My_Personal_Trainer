import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { doc, Firestore, getDoc, updateDoc } from '@angular/fire/firestore';
import { setDoc } from 'firebase/firestore';
import { DailyDataService } from './daily-data.service';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  currentDate: string;
  constructor(
    private readonly auth: Auth,
    private readonly dailyDataService: DailyDataService,
    private readonly firestore: Firestore
  ) {
    this.currentDate = this.dailyDataService.getCurrentDate();
  }

  // returns the information about the current user
  async getUserInfo() {
    const user = this.auth.currentUser;
    const docRef = doc(this.firestore, `measurements/${user.uid}`);
    const result = await getDoc(docRef);
    return result.data();
  }

  // creates a new entry containing the details about the user (name, height, age, etc.)
  async uploadUserInfo(data) {
    const user = this.auth.currentUser;
    const userDocRef = doc(this.firestore, `measurements/${user.uid}`);
    setDoc(userDocRef, data);
  }

  // creates a new entry containing the numbers for kcal, protein, fat, carbs etc.
  async uploadUserDietData(data) {
    const user = this.auth.currentUser;
    const userDocRef = doc(this.firestore, `diet-data/${user.uid}`);
    setDoc(userDocRef, data);
  }

  async updateUserInfo(data) {
    const user = this.auth.currentUser;
    const userData = await this.getUserInfo();
    const userDailyData = await this.dailyDataService.getTodaysData();
    const measurementsDoc = doc(this.firestore, `measurements/${user.uid}`);
    const dailyDoc = doc(this.firestore, `daily-data/${user.uid}`);
    const dietDoc = doc(this.firestore, `diet-data/${user.uid}`);
    updateDoc(measurementsDoc, data);
    let updatedData = {};
    updatedData[this.currentDate] = { ...userDailyData, weight: data.weight };
    updateDoc(dailyDoc, updatedData);
    updateDoc(dietDoc, { weight: data.weight });
  }
}
