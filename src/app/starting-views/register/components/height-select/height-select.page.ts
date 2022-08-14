import { Component, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-height-select',
  templateUrl: './height-select.page.html',
  styleUrls: ['./height-select.page.scss'],
})
export class HeightSelectPage implements OnInit {
  value: number = 170;
  options: Options = {
    floor: 120,
    ceil: 220,
    vertical: true,
  };
  constructor() {}

  ngOnInit() {}
}
