import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Chart, registerables } from 'chart.js';
import { ChartDataService } from '../services/chart-data.service';
import { UserInfoService } from '../services/user-info.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { getStorage } from '@angular/fire/storage';

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
  weightLabels: string[] = [];
  weightData: number[] = [];
  allDaysData: any;
  userAlertInputs = ['firstName', 'lastName', 'age', 'weight', 'height'];
  selectedPhoto;

  constructor(
    private readonly userInfoService: UserInfoService,
    private readonly alertController: AlertController,
    private readonly chartDataService: ChartDataService,
    private readonly camera: Camera,
    private readonly navController: NavController
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
        labels: this.weightLabels,
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
        ],
      },
      options: {
        scales: {
          x: {
            min: 0,
            max: 5,
          },
          y: {
            min: Math.min.apply(Math, this.weightData),
            max: Math.max.apply(Math, this.weightData),
          },
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
          value: Math.round(this.userInfo.height * 2.54),
        },
      ],
      animated: true,
    });

    await alert.present();
  }

  async getUserInfo() {
    const result = await this.userInfoService.getUserInfo();
    this.userInfo = result;
    this.heightInCm = Math.round(this.userInfo?.height * 2.54);
  }

  async updateUserInfo(data) {
    let updatedData = {};

    Object.keys(data).forEach((key) => {
      switch (this.userAlertInputs[key]) {
        case 'height':
          updatedData[this.userAlertInputs[key]] = data[key] / 2.54;
          break;
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
    this.weightLabels = this.allDaysData.map((day) => day.date);
    console.log(this.weightData);
    console.log(this.weightLabels);
  }

  // takeImage() {
  //   const options: CameraOptions = {
  //     quality: 100,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     sourceType: this.camera.PictureSourceType.CAMERA,
  //     saveToPhotoAlbum: false,
  //     allowEdit: true,
  //     targetHeight: 500,
  //     targetWidth: 500,
  //   };
  //   this.camera.getPicture(options).then(
  //     (imageData) => {
  //       this.selectedPhoto = this.dataURLtoBlob(
  //         'data:image/jpeg;base64, ' + imageData
  //       );
  //       this.upload();
  //     },
  //     (err) => {
  //       console.log('error ', err);
  //     }
  //   );
  // }

  // dataURLtoBlob(dataURL) {
  //   let binary = atob(dataURL.split(',')[1]);
  //   let array = [];
  //   for (let i = 0; i < binary.length; i++) {
  //     array.push(binary.charCodeAt(i));
  //   }
  //   return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
  // }

  // async upload() {
  //   let storage = getStorage();
  //   let uploadTask = storage.ref()
  // }
}
