import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class DailyDataService {
  constructor(
    private readonly auth: Auth,
    private readonly firestore: Firestore
  ) {
    this.createNewDayDocument();
  }

  // returns the values left for today
  async getTodaysData() {
    const currentDate = this.getCurrentDate();
    const user = this.auth.currentUser;
    const docRef = doc(this.firestore, `daily-data/${user.uid}`);
    let result = await getDoc(docRef).then((data) => data.data()[currentDate]);
    return result;
  }

  // returns the total values of the diet
  async getDietData() {
    const user = this.auth.currentUser;
    const docRef = doc(this.firestore, `diet-data/${user.uid}`);
    const result = await getDoc(docRef);
    return result.data();
  }

  async getTodaysMeals() {
    try {
      const todaysData = await this.getTodaysData();
      return todaysData.meals;
    } catch {
      return;
    }
  }

  // returns the current date in format (dd-mm-yyyy)
  getCurrentDate() {
    const currentDate = new Date();
    const today =
      currentDate.getDate() +
      '-' +
      (currentDate.getMonth() + 1) +
      '-' +
      currentDate.getFullYear();
    return today;
  }

  instantCreateNewDayDocument() {
    this.getDietData().then((data) => {
      this.uploadCurrentDateWithData(data);
    });
  }

  // function scheduled every day at 00:00 that resets the values to max
  createNewDayDocument() {
    const schedule = require('node-schedule');
    schedule.scheduleJob('0 0 * * *', () => {
      this.getDietData().then((data) => {
        this.uploadCurrentDateWithData(data);
      });
    });
  }

  // creates a new entry in the database containing today's date and measurements
  async uploadCurrentDateWithData(data) {
    const today = this.getCurrentDate();
    const user = this.auth.currentUser;
    const userDocRef = doc(this.firestore, `daily-data/${user.uid}`);

    let todayData = {};
    todayData[today] = { ...data, meals: [] };
    try {
      await updateDoc(userDocRef, todayData);
    } catch {
      await setDoc(userDocRef, todayData);
    }
  }
}
