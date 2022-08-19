import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  @Input() workouts = null;
  currentKcal: number = 0;
  totalKcal: number = 1;

  currentProtein: number = 0;
  totalProtein: number = 1;

  currentFats: number = 0;
  totalFats: number = 1;

  currentCarbs: number = 0;
  totalCarbs: number = 1;

  stroke = 9;
  strokeMacro = 12;

  radius = 125;
  responsive = true;
  clockwise = true;
  color = '#005B74';
  background = '#CEE0E5';
  duration = 1500;
  animation = 'easeOutCubic';
  animationDelay = 0;
  realCurrent = 0;

  currentDate: string = null;

  constructor(
    private authService: AuthService,
    private readonly router: Router
  ) {}

  ionViewWillEnter(): void {
    this.getDietData();
    this.getTodaysData();
  }

  getOverlayStyle(textSize: number) {
    const transform = 'translateY(-50%) ' + 'translateX(-50%)';

    return {
      top: '50%',
      bottom: 'auto',
      left: '50%',
      transform,
      fontSize: textSize + 'px',
    };
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

  async getDietData() {
    await this.authService.getDietData().then((data) => {
      this.totalKcal = data.totalKcal;
      this.totalProtein = data.totalProtein;
      this.totalFats = data.totalFats;
      this.totalCarbs = data.totalCarbs;
    });
  }

  async getTodaysData() {
    try {
      await this.authService.getTodaysData().then((data) => {
        this.currentKcal = data.totalKcal;
        this.currentProtein = data.totalProtein;
        this.currentFats = data.totalFats;
        this.currentCarbs = data.totalCarbs;
      });
    } catch {
      this.authService.instantCreateNewDayDocument();
      this.getTodaysData();
    }
  }
}
