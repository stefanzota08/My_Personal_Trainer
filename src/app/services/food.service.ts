import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { doc, Firestore, getDoc, updateDoc } from '@angular/fire/firestore';
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
    const docRef = doc(this.firestore, 'food-list/food-list');
    const result = await getDoc(docRef);
    let foodList = result.data();
    foodList = Object.keys(foodList).map((key) => {
      return foodList[key];
    });
    return foodList;
  }

  async addMeal(item) {
    const currentDate = this.dailyDataService.getCurrentDate();
    const user = this.auth.currentUser;
    const docRef = doc(this.firestore, `daily-data/${user.uid}`);

    let currentKcal: number;
    let currentProtein: number;
    let currentCarbs: number;
    let currentFats: number;

    try {
      await this.dailyDataService.getTodaysData().then((data) => {
        currentKcal = data.totalKcal;
        currentProtein = data.totalProtein;
        currentFats = data.totalFats;
        currentCarbs = data.totalCarbs;
      });
    } catch {
      this.dailyDataService.instantCreateNewDayDocument();
      this.dailyDataService.getTodaysData();
    }

    let todayData = {};
    console.log(currentKcal);
    todayData[currentDate] = {
      totalKcal: Math.round(currentKcal - parseInt(item.kcal)),
      totalCarbs: Math.round(currentCarbs - parseInt(item.carbs)),
      totalProtein: Math.round(currentProtein - parseInt(item.protein)),
      totalFats: Math.round(currentFats - parseInt(item.fats)),
    };
    updateDoc(docRef, todayData);
    return currentKcal;
  }
}
