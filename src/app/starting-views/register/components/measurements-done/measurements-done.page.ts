import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-measurements-done',
  templateUrl: './measurements-done.page.html',
  styleUrls: ['./measurements-done.page.scss'],
})
export class MeasurementsDonePage implements OnInit {
  constructor(
    private readonly userDataService: UserDataService,
    private readonly authService: AuthService
  ) {}

  ngOnInit() {
    this.userDataService.currentUserData.pipe(take(1)).subscribe((data) => {
      let fatPercentage = null;
      let leanBodyMass = null;
      let BMR = null;
      let totalKcal = null;
      let totalProtein = null;
      let totalFats = null;
      let totalCarbs = null;

      // If we have the fat percentage
      if (
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
            97.684 * this.log10(data.height) -
            78.387
          : 86.01 *
              this.log10(data.waistCircumference - data.neckCircumference) -
            70.041 * this.log10(data.height) +
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
        BMR = 10 * data.weight + 6.25 * data.height - 5 * data.age + 5;

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

      totalCarbs = Math.round(
        (totalKcal - totalFats * 9 - totalProtein * 4) / 4
      );

      this.authService.uploadUserInfo({
        ...data,
        fatPercentage,
        leanBodyMass,
      });

      this.authService.uploadUserDietData({
        BMR,
        totalKcal,
        totalProtein,
        totalCarbs,
        totalFats,
      });

      this.authService.uploadCurrentDateWithData({
        totalKcal,
        totalProtein,
        totalCarbs,
        totalFats,
      });
    });
  }

  log10(val) {
    return Math.log(val) / Math.log(10);
  }
}
