import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  @Input() workouts = null;
  currentKcal = 1769;
  maxKcal = 2200;

  currentProtein = 123;
  maxProtein = 149;

  currentFats = 50;
  maxFats = 76;

  currentCarbs = 120;
  maxCarbs = 213;

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

  constructor(
    private authService: AuthService,
    private readonly router: Router
  ) {}

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
    this.router.navigate(['/login']);
  }
}
