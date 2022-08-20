import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-weight-select',
  templateUrl: './weight-select.page.html',
  styleUrls: ['./weight-select.page.scss'],
})
export class WeightSelectPage implements OnInit {
  selectedWeight: number = null;
  selectedUnit = 1;
  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly userDataService: UserDataService
  ) {}

  ngOnInit() {}

  setSelectedWeight() {
    const valueInKg =
      this.selectedUnit === 1
        ? this.selectedWeight
        : this.selectedWeight * 0.45359237;
    this.userDataService.updateUserData({ weight: +valueInKg });
    this.router.navigate(['../age-select'], {
      relativeTo: this.activatedRoute,
    });
  }
}
