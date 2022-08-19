import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-fat-percentage',
  templateUrl: './fat-percentage.page.html',
  styleUrls: ['./fat-percentage.page.scss'],
})
export class FatPercentagePage implements OnInit {
  fatPercentage: number = null;
  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly userDataService: UserDataService
  ) {}

  ngOnInit() {}

  setSelectedFatPercentage() {
    this.userDataService.updateUserData({ fatPercentage: this.fatPercentage });

    this.router.navigate(['../measurements-done'], {
      relativeTo: this.activatedRoute,
    });
  }
}
