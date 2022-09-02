import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { DailyDataService } from 'src/app/services/daily-data.service';
import {
  UserDataService,
  UserTotalInformation,
} from 'src/app/services/user-data.service';
import { UserInfoService } from 'src/app/services/user-info.service';

@Component({
  selector: 'app-measurements-done',
  templateUrl: './measurements-done.page.html',
  styleUrls: ['./measurements-done.page.scss'],
})
export class MeasurementsDonePage implements OnInit {
  constructor(
    private readonly userDataService: UserDataService,
    private readonly dailyDataService: DailyDataService,
    private readonly userInfoService: UserInfoService
  ) {}

  ngOnInit() {
    this.userDataService.currentUserData.pipe(take(1)).subscribe((data) => {
      const result: UserTotalInformation =
        this.userDataService.calculateKcalAndMacro(data);

      const fatPercentage = result.fatPercentage;
      const leanBodyMass = result.leanBodyMass;
      const BMR = Math.round(result.BMR);
      const totalKcal = result.totalKcal;
      const totalProtein = result.totalProtein;
      const totalFats = result.totalFats;
      const totalCarbs = result.totalCarbs;

      this.userInfoService.uploadUserInfo({
        ...data,
        fatPercentage,
        leanBodyMass,
      });

      this.userInfoService.uploadUserDietData({
        BMR,
        totalKcal,
        totalProtein,
        totalCarbs,
        totalFats,
        weight: Math.round(data.weight),
      });

      this.dailyDataService.uploadCurrentDateWithData({
        BMR,
        totalKcal,
        totalProtein,
        totalCarbs,
        totalFats,
        weight: Math.round(data.weight),
      });
    });
  }

  log10(val) {
    return Math.log(val) / Math.log(10);
  }
}
