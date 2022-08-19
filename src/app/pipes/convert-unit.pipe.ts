import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertUnit',
})
export class ConvertUnitPipe implements PipeTransform {
  transform(value: number, unit: number): string {
    let heightInCm = '';
    let heightInFeet = '';
    let inches = '';

    if (!value) {
      return '';
    }

    if (unit === 1) {
      heightInCm = value.toString();
      return heightInCm;
    } else {
      heightInFeet = Math.floor(Math.round(value / 2.54) / 12).toString();
      inches = (Math.round(value / 2.54) % 12).toString();
      return heightInFeet + '"' + inches + "'";
    }
  }
}

@NgModule({
  declarations: [ConvertUnitPipe],
  exports: [ConvertUnitPipe],
  providers: [ConvertUnitPipe],
})
export class ConvertUnitPipeModule {}
