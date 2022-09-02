import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface UserTotalInformation {
  firstName: string;
  lastName: string;
  email: string;
  genderIsFemale: boolean;
  heightInCm: number;
  heightInInches: number;
  weight: number;
  age: number;
  goal: number;
  activeLevel: number;
  fatPercentage: number;
  neckCircumference: number;
  waistCircumference: number;
  hipCircumference: number;
  BMR: number;
  totalKcal: number;
  totalCarbs: number;
  totalProtein: number;
  totalFats: number;
  leanBodyMass: number;
}

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private userData: BehaviorSubject<UserTotalInformation> = new BehaviorSubject(
    {
      firstName: null,
      lastName: null,
      email: null,
      genderIsFemale: null,
      heightInCm: null,
      heightInInches: null,
      weight: null,
      age: null,
      goal: null,
      activeLevel: null,
      fatPercentage: null,
      neckCircumference: null,
      waistCircumference: null,
      hipCircumference: null,
      BMR: null,
      totalKcal: null,
      totalCarbs: null,
      totalProtein: null,
      totalFats: null,
      leanBodyMass: null,
    }
  );

  currentUserData = this.userData.asObservable();

  constructor() {}

  updateUserData(data) {
    this.userData.next({ ...this.userData.value, ...data });
  }

  log10(val) {
    return Math.log(val) / Math.log(10);
  }

  calculateKcalAndMacro(data: any) {
    console.log(data);
    let fatPercentage = null;
    let leanBodyMass = null;
    let BMR = null;
    let totalKcal = null;
    let totalProtein = null;
    let totalFats = null;
    let totalCarbs = null;

    // If we have the fat percentage
    if (data.fatPercentage) {
      fatPercentage = data.fatPercentage;
      leanBodyMass = (data.weight * (100 - data.fatPercentage)) / 100;
      BMR = 370 + 21.6 * leanBodyMass;
    }
    // if we calculated our fat percentage through measurements
    else if (
      (data.genderIsFemale && data.hipCircumference) ||
      (!data.genderIsFemale && data.waistCircumference)
    ) {
      // we calculate the fat percentage using neck/waist/hip measurements
      fatPercentage = data.genderIsFemale
        ? 163.205 *
            this.log10(
              data.waistCircumference +
                data.hipCircumference -
                data.neckCircumference
            ) -
          97.684 * this.log10(data.heightInInches) -
          78.387
        : 86.01 * this.log10(data.waistCircumference - data.neckCircumference) -
          70.041 * this.log10(data.heightInInches) +
          36.76;

      // we aprox the result to 1 decimal
      fatPercentage = Math.round(fatPercentage * 10) / 10;

      // we calculate the lean mass
      leanBodyMass = (data.weight * (100 - fatPercentage)) / 100;

      // calculate the BMR using FIRST formula
      BMR = 370 + 21.6 * leanBodyMass;
    }

    // if we don't have the fat percentage set up
    else {
      // we calculate the BMR using SECOND formula
      BMR = 10 * data.weight + 6.25 * data.heightInCm - 5 * data.age + 5;

      if (data.genderIsFemale) {
        BMR -= 166; // we substract 166 kcal if user is a woman
      }
    }

    // multiply BMR by activity level
    totalKcal = Math.round(BMR * data.activeLevel);

    // substract or add calories regarding the goal
    switch (data.goal) {
      case -1:
        totalKcal -= 300;
        break;
      case 1:
        totalKcal += 300;
        break;
    }

    //  fats = 30% of total calories
    totalFats = Math.round((0.3 * totalKcal) / 9);

    if (data.age < 18) {
      totalProtein = Math.round(data.weight);
    } else if (18 <= data.age && data.age < 35) {
      totalProtein = Math.round(data.weight * 1.4);
    } else if (35 <= data.age && data.age < 45) {
      totalProtein = Math.round(data.weight * 1.5);
    } else {
      totalProtein = Math.round(data.weight * 1.6);
    }

    totalCarbs = Math.round((totalKcal - totalFats * 9 - totalProtein * 4) / 4);

    const result: UserTotalInformation = {
      ...data,
      fatPercentage,
      leanBodyMass,
      BMR,
      totalKcal,
      totalProtein,
      totalCarbs,
      totalFats,
    };

    return result;
  }
}
