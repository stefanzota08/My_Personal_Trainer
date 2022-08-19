import { Component, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDataService } from 'src/app/services/user-data.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-height-select',
  templateUrl: './height-select.page.html',
  styleUrls: ['./height-select.page.scss'],
})
export class HeightSelectPage implements OnInit {
  selectedUnit: number = 1;
  selectedHeight: number = 170;
  genderIsFemale: boolean = false;

  options: Options = {
    floor: 120,
    ceil: 220,
    vertical: true,
  };

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly userDataService: UserDataService
  ) {}

  ngOnInit() {
    this.userDataService.currentUserData
      .pipe(take(1))
      .subscribe((data) => (this.genderIsFemale = data.genderIsFemale));
  }

  setSelectedHeight() {
    const heightInInches = this.selectedHeight / 2.54;
    this.userDataService.updateUserData({ height: heightInInches });
    this.router.navigate(['../weight-select'], {
      relativeTo: this.activatedRoute,
    });
  }
}
