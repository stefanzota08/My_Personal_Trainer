import { Component, OnInit, NgModule } from '@angular/core';

@Component({
  selector: 'app-background-curves',
  templateUrl: './background-curves.component.html',
  styleUrls: ['./background-curves.component.scss'],
})
export class BackgroundCurvesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

@NgModule({
  declarations: [BackgroundCurvesComponent],
  imports: [],
  exports: [BackgroundCurvesComponent],
})
export class BackgroundCurvesComponentModule {}
