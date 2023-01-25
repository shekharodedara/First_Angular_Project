import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  // pure : false
})
export class FilterPipe implements PipeTransform {

  transform(value:any, namesearch: any): any {

  if (value.length ===0) { return value }
    return value.filter((search: { name: { toLowerCase: () => any; }; }) => // return value.filter((search:any) =>    
    {
      if(search.name.toLowerCase().includes(namesearch.toLowerCase())) // if(search.name.toLowerCase().indexOf(namesearch.toLowerCase())===0)
       return search.name.toLowerCase()
    });
  }

}
