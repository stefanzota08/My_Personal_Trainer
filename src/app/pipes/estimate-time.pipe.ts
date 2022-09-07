import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estimateTime'
})
export class EstimateTimePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
