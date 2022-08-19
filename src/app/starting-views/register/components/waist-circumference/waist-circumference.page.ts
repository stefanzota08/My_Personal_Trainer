import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-waist-circumference',
  templateUrl: './waist-circumference.page.html',
  styleUrls: ['./waist-circumference.page.scss'],
})
export class WaistCircumferencePage implements OnInit {
  genderIsFemale: boolean = false;
  selectedUnit: number = 1;
  waistCircumference: number = null;
  constructor(
    private readonly userDataService: UserDataService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userDataService.currentUserData.pipe(take(1)).subscribe((data) => {
      this.genderIsFemale = data.genderIsFemale;
    });
  }

  setWaistMeasurement() {
    const valueInInches =
      this.selectedUnit === 2
        ? this.waistCircumference
        : this.waistCircumference * 0.393700787;
    this.userDataService.updateUserData({
      waistCircumference: valueInInches,
    });
    if (this.genderIsFemale) {
      this.router.navigate(['../hip-measurements'], {
        relativeTo: this.activatedRoute,
      });
    } else {
      this.router.navigate(['../measurements-done'], {
        relativeTo: this.activatedRoute,
      });
    }
  }

  skipMeasurements() {
    this.router.navigate(['../measurements-done'], {
      relativeTo: this.activatedRoute,
    });
  }
}
