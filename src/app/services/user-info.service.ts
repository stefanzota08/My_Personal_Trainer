import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { doc, Firestore, getDoc, updateDoc } from '@angular/fire/firestore';
import { setDoc } from 'firebase/firestore';
import { DailyDataService } from './daily-data.service';
import { UserDataService } from './user-data.service';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from '@angular/fire/storage';
import { uploadString } from 'firebase/storage';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  currentDate: string;
  constructor(
    private readonly auth: Auth,
    private readonly dailyDataService: DailyDataService,
    private readonly firestore: Firestore,
    private readonly userDataService: UserDataService
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

  // creates a new entry containing the numbers for kcal, protein, fat, carbs etc.
  async uploadExerciseCompletion() {
    const user = this.auth.currentUser;
    const userDocRef = doc(this.firestore, `exercise-completion/${user.uid}`);
    let data = {};
    data = {
      abs: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0,
      ],
      arms: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0,
      ],
      legs: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0,
      ],
      chest: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0,
      ],
    };
    setDoc(userDocRef, data);
  }

  async updateUserInfo(data) {
    const userMeasurements = await this.getUserInfo();

    const result = this.userDataService.calculateKcalAndMacro({
      ...userMeasurements,
      ...data,
    });

    console.log(result);

    const user = this.auth.currentUser;
    const userData = await this.getUserInfo();
    const userDailyData = await this.dailyDataService.getTodaysData();
    const measurementsDoc = doc(this.firestore, `measurements/${user.uid}`);
    const dailyDoc = doc(this.firestore, `daily-data/${user.uid}`);
    const dietDoc = doc(this.firestore, `diet-data/${user.uid}`);
    updateDoc(measurementsDoc, { ...result });

    let updatedData = {};
    updatedData[this.currentDate] = {
      ...userDailyData,
      weight: result.weight,
      totalProtein: result.totalProtein,
      totalKcal: result.totalKcal,
      totalCarbs: result.totalCarbs,
      totalFats: result.totalFats,
      BMR: result.BMR,
    };

    updateDoc(dailyDoc, updatedData);
    updateDoc(dietDoc, {
      weight: result.weight,
      totalProtein: result.totalProtein,
      totalKcal: result.totalKcal,
      totalCarbs: result.totalCarbs,
      totalFats: result.totalFats,
      BMR: result.BMR,
    });
  }

  uploadProfilePicture(file) {
    const user = this.auth.currentUser;
    const storage = getStorage();
    const imageRef = ref(storage, `profile-pictures/${user.uid}.jpg`);

    uploadBytes(imageRef, file).then((snapshot) => {
      console.log('uploaded successfully');
    });
  }

  async getProfilePicture() {
    const user = this.auth.currentUser;
    const storage = getStorage();
    const imageRef = ref(storage, `profile-pictures/${user.uid}.jpg`);
    let imageURL = null;
    await getDownloadURL(imageRef)
      .then((url) => {
        imageURL = url;
      })
      .catch((error) => {
        console.log('error', error);
      });

    return imageURL;
  }
}
