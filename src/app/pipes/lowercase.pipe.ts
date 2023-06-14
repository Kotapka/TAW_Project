import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lowercase'
})
export class LowercasePipe implements PipeTransform {

  transform(value: string | undefined): any {
    if(!value){
      return null;
    }
    return value.toLowerCase();
  }

}
