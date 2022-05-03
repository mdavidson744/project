import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { WebService } from './web.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FilterPipe } from './filter.pipe';
import { FormsModule } from '@angular/forms';
import {HttpHeaders} from "@angular/common/http";

@Component({
    selector: 'carListings',
    templateUrl: './carListings.component.html',
    styleUrls: ['./carListings.component.css']
})

export class CarListingsComponent { 
    carForm: any;
    term: any;
    showMe: boolean=false;
    showMeTA: boolean=false;
    showMeRA: boolean=false;
    showMeCF: boolean=false;

    // for makes filter drop down
    carMakes: any = [
        {make: "Make"},
        {make: "Toyota"},
        {make: "BMW"},
        {make: "test"},
        {make: "Mercedes"},
        {make: "Audi"},
        {make: "Suzuki"},
        {make: "Toyota"}
    ];

    constructor(public webService: WebService,
                        private formBuilder: FormBuilder,
                        private route: ActivatedRoute, 

                        private router: Router,
                        private toastr: ToastrService) {}

    ngOnInit() {
        this.car_list = this.webService.getCarListings(this.page);
        this.photos = this.webService.getPhotos(this.route.snapshot.params['id']);
        this.carForm = this.formBuilder.group({
            make: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]),
            model: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]),
            year: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]),
            gearbox: new FormControl('', [Validators.required]),
            engineCapacity: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]),
            engineType: new FormControl('', [Validators.required]),
            numberSeats: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]),
            numberDoors: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]),
            colour: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]),
            description: '', //optional so no validators.
            regNumber: new FormControl('', [Validators.required]),
            price: new FormControl('',[Validators.required, Validators.pattern(/^[0-9]\d*$/)])
        })
    }
    get make(){return this.carForm.get('make')}
    get model(){return this.carForm.get('model')}
    get year(){return this.carForm.get('year')}
    get gearbox(){return this.carForm.get('gearbox')}
    get engineCapacity(){return this.carForm.get('engineCapacity')}
    get engineType(){return this.carForm.get('engineType')}
    get numberSeats(){return this.carForm.get('numberSeats')}
    get numberDoors(){return this.carForm.get('numberDoors')}
    get colour(){return this.carForm.get('colour')}
    get regNumber(){return this.carForm.get('regNumber')}
    get price(){return this.carForm.get('price')}
    
    
    

    toggleTag(){
        this.showMe=!this.showMe
    }
    sponsoredAds(){
        this.showMeTA=!this.showMeTA
    }
    recommendedAds(){
        this.showMeRA=!this.showMeRA
    }
    similarAds(){
        this.showMeCF=!this.showMeCF
    }

    car_list: any = [];
    photos: any = [];
    carListings: any;
    page: number = 1;

    previousPage(){
        if (this.page > 1) {
            this.page = this.page -1;
            this.car_list = this.webService.getCarListings(this.page);
        }
    }

    nextPage(){
        this.page = this.page + 1;
        this.car_list = this.webService.getCarListings(this.page);
    }
    pushedHeader() {
        return {
            
            headers: new HttpHeaders({'x-access-token': sessionStorage['x-access-token'],
                                        'username': sessionStorage['username']})
        }
      }

    onSubmit() {
        this.webService.postCarListing(this.carForm.value, this.pushedHeader())
        this.carForm.reset();
    }

}