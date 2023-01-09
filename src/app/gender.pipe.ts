import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender',
  // pure:false
})
export class GenderPipe implements PipeTransform {
  count=0;
  transform(ob:any): any {
    // console.log("Gender pipe",this.count++);
    return ob?.name ? 
              ob.male === 'male' ? 'mr. ' + ob.name :
              ob.male === 'female'? 'mrs. ' + ob.name 
              : 'please enter your gender'
           : ob?.name==="" && ob?.male!=="" ? 'please enter your name'
           : null;
  }
}
