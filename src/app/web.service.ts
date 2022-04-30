import { HttpClient, HttpErrorResponse, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs';

@Injectable()
export class WebService {
    
    private carListingId: any;

    constructor (private http: HttpClient, private toastr: ToastrService, private router: Router,) {}

    car_list: any;
    tt: Boolean;

    private currentUser:string='';
    private admin: boolean = sessionStorage['admin'];

    headers = new HttpHeaders()
   .append('content-type', 'application/json')
   .append('Access-Control-Allow-Origin', '*');

    getCarListings(page: number) {
        return this.http.get('http://localhost:5000/api/v1.0/carListings?pn=' + page);
        this.headers = this.headers.append('x-access-token', sessionStorage['x-access-token']);
        this.headers = this.headers.append('username', sessionStorage['username']);
        console.log(this.headers)
    }

    getCarListing(id: any) {
        this.carListingId = id;
        return this.http.get('http://localhost:5000/api/v1.0/carListings/' + id);
         //setting http headers here
    }
    delCarListing(carListingId: any, { headers: httpHeaders}) {
        return this.http.delete('http://localhost:5000/api/v1.0/carListings/' + carListingId, { headers: httpHeaders});
    }

    delPhoto(carListingId: any, photoId: any, { headers: httpHeaders}) {
        return this.http.delete('http://localhost:5000/api/v1.0/carListings/' + carListingId + '/photos/' + photoId, { headers: httpHeaders});
    }
    
    getPhotos(id: string) {
        return this.http.get('http://localhost:5000/api/v1.0/carListings/' + id + '/photos');
    }
    
    

    postCarListing(car: any,  { headers: httpHeaders}){
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

        this.headers = this.headers.append('x-access-token', sessionStorage['x-access-token']);
        this.headers = this.headers.append('username', sessionStorage['username']);
        console.log(this.headers)
        
        return this.http.post('http://localhost:5000/api/v1.0/carListings', postData, {headers: httpHeaders});
    }

    // postPhoto()

    edCarListing(car: any, {headers: httpHeaders}) {
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
        
        return this.http.put('http://localhost:5000/api/v1.0/carListings/' + this.carListingId, putData, {headers: httpHeaders});
    }

    // deleteReview(id: string){
    //     return this.http.delete('http://localhost:5000/api/v2.0/movies/' + this.movieID + '/reviews' + id);
    // }

    // postPhoto(filesW: File){

    //     return this.http.post('http://localhost:5000/api/v1.0/carListings/' + this.carListingId + '/photos', file);
    // }


    async getLogin( { headers: httpHeaders }) {
        this.http.get('http://localhost:5000/api/v1.0/login', {headers: httpHeaders}).pipe(catchError(this.errorHandler)).subscribe(res => {
          console.log(res);
    
          //parse json response
          let json = JSON.stringify(res);
          const obj = JSON.parse(json);
          this.tt = false;
          
          console.log(obj)

          if (HttpStatusCode.Ok) {
            sessionStorage['username'] = obj.username;
            sessionStorage['x-access-token'] = obj.token;
            sessionStorage['loggedIn'] = true;
        
            this.headers = this.headers.set('x-access-token', sessionStorage['x-access-token']);
            this.headers = this.headers.set('username', sessionStorage['username']);
            console.log(this.headers)
            this.toastr.success('Login successful')

            this.router.navigate(['/CarListings'])

          }


        }, (error) => {this.toastr.error('Login unsuccessful. Bad password or username')});
    }

    async logOut( {headers: httpHeaders}) {
        this.http.get('http://localhost:5000/api/v1.0/logout', {headers: httpHeaders}).subscribe(res => {
            
            sessionStorage['username'] = '';
            sessionStorage['x-access-token'] = '';
            sessionStorage['loggedIn'] = false;
        
            this.headers = this.headers.set('x-access-token', sessionStorage['x-access-token']);
            this.headers = this.headers.set('username', sessionStorage['username']);
            console.log(this.headers)
            this.toastr.success('Logout successful')

            this.router.navigate(['/CarListings'])  

  
          });

    }

    errorHandler(error) {
        return throwError(error.message || "Server Error")
    }

    postUser(user: any) {
        let postUserData = new FormData();
        postUserData.append("username", user.username);
        postUserData.append("password", user.password);

        return this.http.post('http://localhost:5000/api/v1.0/users', postUserData);
        this.router.navigate(['/Login'])

    }

}