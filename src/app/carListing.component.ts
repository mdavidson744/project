import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { WebService } from './web.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import {HttpHeaders} from "@angular/common/http";




@Component({
    selector: 'carListing',
    templateUrl: './carListing.component.html',
    styleUrls: ['./carListing.component.css']
})
export class CarListingComponent { 
    carEditForm: any
    photoForm: any;
    ImagePath: string;
    form: any;
    showMe: boolean=false;
    showMeP: boolean= false;

    constructor(public webService: WebService,
                public route: ActivatedRoute,
                private formBuilder: FormBuilder,
                private router: Router,
                private http: HttpClient,
                public fb: FormBuilder,
                private toastr: ToastrService) {
                    this.ImagePath = 'assets/images/7594299e-b051-11ec-8b84-4ccc6a828fe8.jpeg',
                    this.form = this.fb.group({
                        filesW: [null],
                    });
                }
                // image location
    

    toggleTagP(){
        this.showMeP=!this.showMeP
    }

    ngOnInit() {
        

        this.car_list = this.webService.getCarListing(this.route.snapshot.params['id']);
        this.photos = this.webService.getPhotos(this.route.snapshot.params['id']);
        this.carEditForm = this.formBuilder.group({
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
        }),
        this.photoForm = this.formBuilder.group({
            filesW: null
        })
    }
    get make(){return this.carEditForm.get('make')}
    get model(){return this.carEditForm.get('model')}
    get year(){return this.carEditForm.get('year')}
    get gearbox(){return this.carEditForm.get('gearbox')}
    get engineCapacity(){return this.carEditForm.get('engineCapacity')}
    get engineType(){return this.carEditForm.get('engineType')}
    get numberSeats(){return this.carEditForm.get('numberSeats')}
    get numberDoors(){return this.carEditForm.get('numberDoors')}
    get colour(){return this.carEditForm.get('colour')}
    get regNumber(){return this.carEditForm.get('regNumber')}
    get price(){return this.carEditForm.get('price')}

    onEditSubmit() {
        this.webService.edCarListing(this.carEditForm.value, this.pushedHeader())
    }

    toggleTag(){
        this.showMe=!this.showMe
    }


    id = this.webService.getCarListing(this.route.snapshot.params['id'])

    deleteCarListing(carListingId: any){
        this.webService.delCarListing(carListingId, this.pushedHeader())
    }

    editCarListing(carListingId: any) {
        this.webService.edCarListing(carListingId, this.pushedHeader())
    }

    deletePhoto(carListingId: any, photoid: any) {
        this.webService.delPhoto(carListingId, photoid, this.pushedHeader())
    }
    filesW: File = null;
    //add photo
    onFileSelected(event){
        this.filesW = <File>event.target.files[0]
    }

    onUpload(carListingId: any, {headers: httpHeaders}){
        const fd = new FormData();
        fd.append('filesW', this.filesW, this.filesW.name)
        this.http.post('http://localhost:5000/api/v1.0/carListings/' + carListingId + '/photos', fd, this.pushedHeader()).subscribe(
            res => {
                console.log(res)
                this.toastr.success("Photo added")
                this.photos = this.webService.getPhotos(this.route.snapshot.params['id'])
            }
        )
    }

    pushedHeader() {
        return {
            
            headers: new HttpHeaders({'x-access-token': sessionStorage['x-access-token'],
                                        'username': sessionStorage['username']})
        }
      }


    car_list: any = [];
    photos: any = [];


}