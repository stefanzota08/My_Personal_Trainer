import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Chart, registerables } from 'chart.js';
import { ChartDataService } from '../services/chart-data.service';
import { UserInfoService } from '../services/user-info.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit, AfterViewInit {
  @ViewChild('lineCanvas') private lineCanvas: ElementRef;
  userInfo: any;
  lineChart: any;
  heightInCm: number;
  chartLabels: string[] = [];
  weightData: number[] = [];
  kcalData: number[] = [];
  proteinData: number[] = [];
  carbsData: number[] = [];
  fatsData: number[] = [];
  allDaysData: any;
  userAlertInputs = [
    'firstName',
    'lastName',
    'age',
    'weight',
    'heightInCm',
    'fatPercentage',
  ];
  selectedPhoto;

  constructor(
    private readonly userInfoService: UserInfoService,
    private readonly alertController: AlertController,
    private readonly chartDataService: ChartDataService,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  ngOnInit() {
    Chart.register(...registerables);
    this.getUserInfo();
  }

  ngAfterViewInit(): void {
    this.lineChartMethod();
  }

  async lineChartMethod() {
    await this.getChartData();
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.chartLabels,
        datasets: [
          {
            label: 'Weight',
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.weightData,
            spanGaps: false,
          },
          {
            label: 'Kcal',
            fill: false,
            backgroundColor: '#a64d79',
            borderColor: '#a64d79',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#a64d79',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#a64d79',
            pointHoverBorderColor: '#a64d79',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.kcalData,
            spanGaps: false,
          },
          {
            label: 'Protein',
            fill: false,
            backgroundColor: '#6aa84f',
            borderColor: '#6aa84f',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#6aa84f',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#6aa84f',
            pointHoverBorderColor: '#6aa84f',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.proteinData,
            spanGaps: false,
          },
          {
            label: 'Fats',
            fill: false,
            backgroundColor: '#f1c232',
            borderColor: '#f1c232',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#f1c232',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#f1c232',
            pointHoverBorderColor: '#f1c232',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.fatsData,
            spanGaps: false,
          },
          {
            label: 'Carbs',
            fill: false,
            backgroundColor: '#e06666',
            borderColor: '#e06666',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#e06666',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#e06666',
            pointHoverBorderColor: '#e06666',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.carbsData,
            spanGaps: false,
          },
        ],
      },
      options: {
        scales: {
          x: {
            min: 0,
            max: 5,
          },
          // y: {
          //   min: Math.min.apply(Math, this.weightData),
          //   max: Math.max.apply(Math, this.weightData),
          // },
        },
      },
    });
  }

  scroller(direction) {
    const dataLenght = this.lineChart.data.labels.length;
    if (direction > 0) {
      if (this.lineChart.options.scales.x.max >= dataLenght - 1) {
        this.lineChart.options.scales.x.min = dataLenght - 6;
      } else {
        this.lineChart.options.scales.x.min += 1;
        this.lineChart.options.scales.x.max += 1;
      }
    }
    if (direction < 0) {
      if (this.lineChart.options.scales.x.min <= 0) {
        this.lineChart.options.scales.x.min = 0;
        this.lineChart.options.scales.x.max = 5;
      } else {
        this.lineChart.options.scales.x.min -= 1;
        this.lineChart.options.scales.x.max -= 1;
      }
    }
    this.lineChart.update();
  }

  async updateAlert() {
    const alert = await this.alertController.create({
      header: 'User information',
      buttons: [
        {
          text: 'Update',
          role: 'confirm',
          handler: (inputData) => this.updateUserInfo(inputData),
        },
      ],
      inputs: [
        {
          label: 'First Name',
          type: 'text',
          value: this.userInfo.firstName,
        },
        {
          label: 'Last Name',
          type: 'text',
          value: this.userInfo.lastName,
        },
        {
          label: 'Age',
          type: 'number',
          value: this.userInfo.age,
        },
        {
          label: 'Weight',
          type: 'number',
          value: this.userInfo.weight,
        },
        {
          label: 'Height',
          type: 'number',
          value: this.userInfo.heightInCm,
        },
        this.userInfo.fatPercentage
          ? {
              label: 'Fat Percentage',
              type: 'number',
              value: this.userInfo.fatPercentage,
            }
          : {
              label: 'Fat Percentage',
              type: 'number',
              placeholder: 'Add your fat percentage',
            },
      ],
      animated: true,
    });

    await alert.present();
  }

  async getUserInfo() {
    const result = await this.userInfoService.getUserInfo();
    this.userInfo = result;
    this.heightInCm = this.userInfo?.heightInCm;
  }

  async updateUserInfo(data) {
    let updatedData = {};

    Object.keys(data).forEach((key) => {
      switch (this.userAlertInputs[key]) {
        case 'weight':
          updatedData[this.userAlertInputs[key]] = +data[key];
          break;
        default:
          updatedData[this.userAlertInputs[key]] = data[key];
      }
    });
    console.log(updatedData);
    await this.userInfoService.updateUserInfo(updatedData);
    this.getUserInfo();
  }

  async getChartData() {
    this.allDaysData = await this.chartDataService.getAllDaysData();
    console.log(this.allDaysData);
    this.weightData = this.allDaysData.map((day) => day.weight);
    this.kcalData = this.allDaysData.map((day) => {
      let kcal = 0;
      day.meals.forEach((meal) => {
        kcal += meal.kcal;
      });
      return Math.round(kcal);
    });

    this.proteinData = this.allDaysData.map((day) => {
      let protein = 0;
      day.meals.forEach((meal) => {
        protein += meal.protein;
      });
      return Math.round(protein);
    });

    this.carbsData = this.allDaysData.map((day) => {
      let carbs = 0;
      day.meals.forEach((meal) => {
        carbs += meal.carbs;
      });
      return Math.round(carbs);
    });

    this.fatsData = this.allDaysData.map((day) => {
      let fats = 0;
      day.meals.forEach((meal) => {
        fats += meal.fats;
      });
      return Math.round(fats);
    });

    this.chartLabels = this.allDaysData.map((day) => day.date);
    console.log('weight data', this.weightData);
    console.log('kcal data', this.kcalData);
    console.log(this.chartLabels);
  }

  async logout() {
    this.authService
      .logout()
      .then(() => {
        this.router.navigateByUrl('/login', { replaceUrl: true });
      })
      .catch((error) => console.log(error));
  }
}
