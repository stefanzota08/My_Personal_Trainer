import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { DailyDataService } from './daily-data.service';

@Injectable({
  providedIn: 'root',
})
export class ChartDataService {
  constructor(
    private readonly dailyDataService: DailyDataService,
    private readonly auth: Auth,
    private readonly firestore: Firestore
  ) {}

  async getAllDaysData() {
    // we fetch all the data from every day
    const user = this.auth.currentUser;
    const docRef = doc(this.firestore, `daily-data/${user.uid}`);
    const result = await getDoc(docRef);
    let chartData = result.data();

    // we turn the object of objects into array of objects
    chartData = Object.keys(chartData).map((key) => {
      return { ...chartData[key], date: key };
    });

    // we sort the data by date value
    chartData.sort((a, b) => (a.date > b.date ? 1 : -1));
    return chartData;
  }
}
