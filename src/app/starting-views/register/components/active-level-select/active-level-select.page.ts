import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-active-level-select',
  templateUrl: './active-level-select.page.html',
  styleUrls: ['./active-level-select.page.scss'],
})
export class ActiveLevelSelectPage implements OnInit {
  selectedActiveLevel = null;
  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly userDataService: UserDataService
  ) {}

  ngOnInit() {}

  setSelectedActiveLevel() {
    this.userDataService.updateUserData({
      activeLevel: this.selectedActiveLevel,
    });
    this.router.navigate(['../fat-percentage'], {
      relativeTo: this.activatedRoute,
    });
  }
}
