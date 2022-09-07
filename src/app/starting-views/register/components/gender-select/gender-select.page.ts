import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-gender-select',
  templateUrl: './gender-select.page.html',
  styleUrls: ['./gender-select.page.scss'],
})
export class GenderSelectPage implements OnInit {
  selectedGender: boolean = false;
  firstName: string = null;
  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly userDataService: UserDataService
  ) {}

  ngOnInit() {
    this.userDataService.currentUserData.subscribe((data) => {
      this.firstName = data.firstName;
    });
  }

  setSelectedGender() {
    this.userDataService.updateUserData({
      genderIsFemale: this.selectedGender,
    });
    this.router.navigate(['../height-select'], {
      relativeTo: this.activatedRoute,
    });
  }
}
