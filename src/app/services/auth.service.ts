import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import {
  doc,
  Firestore,
  getDoc,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private firestore: Firestore) {
    this.createNewDayDocument();
  }

  async register({ email, password }) {
    try {
      const user = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return user;
    } catch (error) {
      return null;
    }
  }

  async login({ email, password }) {
    try {
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      return user;
    } catch (error) {
      return null;
    }
  }

  logout() {
    return signOut(this.auth);
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

  // creates a new entry in the database containing today's date and measurements
  async uploadCurrentDateWithData(data) {
    const today = this.getCurrentDate();
    const user = this.auth.currentUser;
    const userDocRef = doc(this.firestore, `daily-data/${user.uid}`);

    let todayData = {};
    todayData[today] = { ...data };
    try {
      await updateDoc(userDocRef, todayData);
    } catch {
      await setDoc(userDocRef, todayData);
    }
  }

  // returns the total values of the diet
  async getDietData() {
    const user = this.auth.currentUser;
    const docRef = doc(this.firestore, `diet-data/${user.uid}`);
    const result = await getDoc(docRef);
    return result.data();
  }

  // returns the values left for today
  async getTodaysData() {
    const currentDate = this.getCurrentDate();
    const user = this.auth.currentUser;
    const docRef = doc(this.firestore, `daily-data/${user.uid}`);
    let result = await getDoc(docRef).then((data) => data.data()[currentDate]);
    return result;
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

  instantCreateNewDayDocument() {
    this.getDietData().then((data) => {
      this.uploadCurrentDateWithData(data);
    });
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

  async addMeal(item) {
    const currentDate = this.getCurrentDate();
    const user = this.auth.currentUser;
    const docRef = doc(this.firestore, `daily-data/${user.uid}`);

    let currentKcal: number;
    let currentProtein: number;
    let currentCarbs: number;
    let currentFats: number;

    try {
      await this.getTodaysData().then((data) => {
        currentKcal = data.totalKcal;
        currentProtein = data.totalProtein;
        currentFats = data.totalFats;
        currentCarbs = data.totalCarbs;
      });
    } catch {
      this.instantCreateNewDayDocument();
      this.getTodaysData();
    }

    let todayData = {};
    console.log(currentKcal);
    todayData[currentDate] = {
      totalKcal: Math.round(currentKcal - item.kcal),
      totalCarbs: Math.round(currentCarbs - item.carbs),
      totalProtein: Math.round(currentProtein - item.protein),
      totalFats: Math.round(currentFats - item.fats),
    };
    updateDoc(docRef, todayData);
  }
}
