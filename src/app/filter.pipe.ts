import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(car_list: any, term?: any): any {
    //check if search term is undefined
    if (term === undefined) return car_list;

    //return updated ninjas array
    return car_list.filter(function(carListings){
      return carListings.make.includes(term)  ||
        carListings.model.includes(term) ||  
        carListings.year.includes(term) ||  
        carListings.gearbox.includes(term) ||  
        carListings.engineCapacity.includes(term) || 
         carListings.engineType.includes(term) ||  
         carListings.numberSeats.includes(term) ||  
         carListings.numberDoors.includes(term) ||  
         carListings.colour.includes(term) || 
         carListings.regNumber.includes(term)
    })
  }

}
