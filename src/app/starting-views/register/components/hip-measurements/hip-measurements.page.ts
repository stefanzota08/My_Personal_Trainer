import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-hip-measurements',
  templateUrl: './hip-measurements.page.html',
  styleUrls: ['./hip-measurements.page.scss'],
})
export class HipMeasurementsPage implements OnInit {
  selectedUnit: number = 1;
  hipCircumference: number = null;
  constructor(
    private readonly userDataService: UserDataService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {}

  setHipMeasurements() {
    const valueInInches =
      this.selectedUnit === 2
        ? this.hipCircumference
        : this.hipCircumference * 0.393700787;
    this.userDataService.updateUserData({
      hipCircumference: valueInInches,
    });
    this.router.navigate(['../measurements-done'], {
      relativeTo: this.activatedRoute,
    });
  }

  skipMeasurements() {
    this.router.navigate(['../measurements-done'], {
      relativeTo: this.activatedRoute,
    });
  }
}
