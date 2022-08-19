import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-goal-select',
  templateUrl: './goal-select.page.html',
  styleUrls: ['./goal-select.page.scss'],
})
export class GoalSelectPage implements OnInit {
  selectedGoal = null;
  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly userDataService: UserDataService
  ) {}

  ngOnInit() {}

  setSelectedGoal() {
    this.userDataService.updateUserData({ goal: this.selectedGoal });
    this.router.navigate(['../active-level-select'], {
      relativeTo: this.activatedRoute,
    });
  }
}
