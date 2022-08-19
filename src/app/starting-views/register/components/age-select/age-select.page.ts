import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-age-select',
  templateUrl: './age-select.page.html',
  styleUrls: ['./age-select.page.scss'],
})
export class AgeSelectPage implements OnInit {
  selectedUnit: number = 1;
  selectedAge: number = 12;

  options: Options = {
    floor: 2,
    ceil: 100,
    vertical: false,
  };

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly userDataService: UserDataService
  ) {}

  ngOnInit() {}

  setSelectedAge() {
    this.userDataService.updateUserData({ age: this.selectedAge });
    this.router.navigate(['../goal-select'], {
      relativeTo: this.activatedRoute,
    });
  }
}
