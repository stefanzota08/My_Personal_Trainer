import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-neck-measurements',
  templateUrl: './neck-measurements.page.html',
  styleUrls: ['./neck-measurements.page.scss'],
})
export class NeckMeasurementsPage implements OnInit {
  selectedUnit: number = 1;
  neckCircumference: number = null;
  constructor(
    private readonly userDataService: UserDataService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {}

  setNeckMeasurement() {
    const valueInInches =
      this.selectedUnit === 2
        ? this.neckCircumference
        : this.neckCircumference * 0.393700787;
    this.userDataService.updateUserData({
      neckCircumference: valueInInches,
    });
    this.router.navigate(['../waist-circumference'], {
      relativeTo: this.activatedRoute,
    });
  }

  skipMeasurements() {
    this.router.navigate(['../measurements-done'], {
      relativeTo: this.activatedRoute,
    });
  }
}
