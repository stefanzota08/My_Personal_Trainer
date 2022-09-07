import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { doc, Firestore, getDoc, updateDoc } from '@angular/fire/firestore';
import { setDoc } from 'firebase/firestore';
import { DailyDataService } from './daily-data.service';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor(
    private readonly auth: Auth,
    private firestore: Firestore,
    private readonly dailyDataService: DailyDataService
  ) {}

  async getFoodList() {
    const user = this.auth.currentUser;
    const docRef = doc(this.firestore, 'food-list/food-list');
    const result = await getDoc(docRef);
    let foodList = result.data();
    foodList = Object.keys(foodList).map((key) => {
      return foodList[key];
    });

    const personalDoc = doc(this.firestore, `food-list/${user.uid}`);
    try {
      const personalResult = await getDoc(personalDoc);
      let personalList = personalResult.data();
      personalList = Object.keys(personalList).map((key) => {
        return personalList[key];
      });
      foodList = foodList.concat(personalList);
    } catch {}

    return foodList;
  }

  async getBeveragesList() {
    const user = this.auth.currentUser;
    const docRef = doc(this.firestore, 'beverages-list/beverages-list');
    const result = await getDoc(docRef);
    let beveragesList = result.data();
    beveragesList = Object.keys(beveragesList).map((key) => {
      return beveragesList[key];
    });

    const personalDoc = doc(this.firestore, `beverages-list/${user.uid}`);
    try {
      const personalResult = await getDoc(personalDoc);
      let personalList = personalResult.data();
      personalList = Object.keys(personalList).map((key) => {
        return personalList[key];
      });
      beveragesList = beveragesList.concat(personalList);
    } catch {}

    return beveragesList;
  }

  async getSnackList() {
    const user = this.auth.currentUser;
    const docRef = doc(this.firestore, 'snacks-supplements/snack-supplements');
    const result = await getDoc(docRef);
    let snackList = result.data();
    snackList = Object.keys(snackList).map((key) => {
      return snackList[key];
    });

    const personalDoc = doc(this.firestore, `snacks-supplements/${user.uid}`);
    try {
      const personalResult = await getDoc(personalDoc);
      let personalList = personalResult.data();
      personalList = Object.keys(personalList).map((key) => {
        return personalList[key];
      });
      snackList = snackList.concat(personalList);
    } catch {}

    return snackList;
  }

  async addMeal(item) {
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

    meals.push({ ...item, kcal: Math.round(item.kcal) });

    let todayData = {};
    todayData[currentDate] = {
      totalKcal: Math.round(currentKcal - parseInt(item.kcal)),
      totalCarbs: Math.round(currentCarbs - parseInt(item.carbs)),
      totalProtein: Math.round(currentProtein - parseInt(item.protein)),
      totalFats: Math.round(currentFats - parseInt(item.fats)),
      weight: weight,
      meals: meals,
      workouts: workouts,
    };
    try {
      await updateDoc(docRef, todayData);
      return true;
    } catch (error) {
      return error;
    }
  }

  // exactly the same as addMeal() but we ADD instead of SUBSTRACT the values and DELETE the meal from the meals array
  async removeMeal(item) {
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

    console.log('before', meals);
    let indexForRemoval;
    meals.forEach((meal, index) => {
      if (
        meal.name === item.name &&
        meal.kcal === item.kcal &&
        meal.protein === item.protein &&
        meal.fats === item.fats &&
        meal.carbs === item.carbs
      ) {
        indexForRemoval = index;
      }
    });

    meals.splice(indexForRemoval, 1);
    console.log('after', meals);

    let todayData = {};
    todayData[currentDate] = {
      totalKcal: Math.round(currentKcal + parseInt(item.kcal)),
      totalCarbs: Math.round(currentCarbs + parseInt(item.carbs)),
      totalProtein: Math.round(currentProtein + parseInt(item.protein)),
      totalFats: Math.round(currentFats + parseInt(item.fats)),
      weight: weight,
      meals: meals,
      workouts: workouts,
    };
    updateDoc(docRef, todayData);
  }

  async addNewItemToList(type: string, data: any) {
    const user = this.auth.currentUser;
    let collection = '';
    switch (type) {
      case 'FOOD':
        collection = 'food-list';
        break;
      case 'BEVERAGES':
        collection = 'beverages-list';
        break;
      case 'SNACKS':
        collection = 'snacks-supplements';
        break;
    }
    const userDocRef = doc(this.firestore, `${collection}/${user.uid}`);

    let newItem = {};
    newItem[data.name] = { ...data };

    try {
      await updateDoc(userDocRef, newItem);
    } catch {
      await setDoc(userDocRef, newItem);
    }
  }
}
