import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class WebService {
    
    private carListingId: any;

    constructor (private http: HttpClient) {}

    car_list: any;

    getCarListings(page: number) {
        return this.http.get('http://localhost:5000/api/v1.0/carListings?pn=' + page);
    }

    getCarListing(id: any) {
        this.carListingId = id;
        return this.http.get('http://localhost:5000/api/v1.0/carListings/' + id);
    }
    delCarListing(carListingId: any) {
        return this.http.delete('http://localhost:5000/api/v1.0/carListings/' + carListingId);
    }

    delPhoto(carListingId: any, photoId: any) {
        return this.http.delete('http://localhost:5000/api/v1.0/carListings/' + carListingId + '/photos/' + photoId);
    }
    
    getPhotos(id: string) {
        return this.http.get('http://localhost:5000/api/v1.0/carListings/' + id + '/photos');
    }
    
    

    postCarListing(car: any){
        let postData = new FormData();
        postData.append("make", car.make);
        postData.append("model", car.model);
        postData.append("year", car.year);
        postData.append("gearbox", car.gearbox);
        postData.append("engineCapacity", car.engineCapacity);
        postData.append("engineType", car.engineType);
        postData.append("numberSeats", car.numberSeats);
        postData.append("numberDoors", car.numberDoors);
        postData.append("colour", car.colour);
        postData.append("description", car.description);
        postData.append("regNumber", car.regNumber);
        postData.append("price", car.price);
        
        return this.http.post('http://localhost:5000/api/v1.0/carListings', postData);
    }

    // postPhoto()

    edCarListing(car: any) {
        let putData = new FormData();
        putData.append("make", car.make);
        putData.append("model", car.model);
        putData.append("year", car.year);
        putData.append("gearbox", car.gearbox);
        putData.append("engineCapacity", car.engineCapacity);
        putData.append("engineType", car.engineType);
        putData.append("numberSeats", car.numberSeats);
        putData.append("numberDoors", car.numberDoors);
        putData.append("colour", car.colour);
        putData.append("description", car.description);
        putData.append("regNumber", car.regNumber);
        putData.append("price", car.price);
        
        return this.http.put('http://localhost:5000/api/v1.0/carListings/' + this.carListingId, putData);
    }

    // deleteReview(id: string){
    //     return this.http.delete('http://localhost:5000/api/v2.0/movies/' + this.movieID + '/reviews' + id);
    // }

    // postPhoto(filesW: File){

    //     return this.http.post('http://localhost:5000/api/v1.0/carListings/' + this.carListingId + '/photos', file);
    // }

}