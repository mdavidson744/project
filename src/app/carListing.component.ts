import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { WebService } from './web.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';





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
            make: '',
            model: '',
            year: '',
            gearbox: '',
            engineCapacity: '',
            engineType: '',
            numberSeats: '',
            numberDoors: '',
            colour: '',
            description: '',
            regNumber: '',
            price: ''
        }),
        this.photoForm = this.formBuilder.group({
            filesW: null
        })
    }

    onEditSubmit() {
        console.log('test')
        this.webService.edCarListing(this.carEditForm.value)
            .subscribe((response: any) =>{
                this.carEditForm.reset();
                this.car_list = this.webService.getCarListing(this.route.snapshot.params['id']);
                this.photos = this.webService.getPhotos(this.route.snapshot.params['id'])
            });
        this.carEditForm.reset();
    }

    toggleTag(){
        this.showMe=!this.showMe
    }

    // isInvalid(control: any) {
    //     return this.photoForm.controls[control].invalid &&
    //         this.photoForm.controls[control].touched
    // }

    // isUntouched() {
    //     return this.photoForm.controls.username.pristine  ||
    //         this.photoForm.controls.comment.pristine;
    // }

    // isIncomplete() {
    //     return this.isInvalid('username') ||
    //         this.isInvalid('comment') ||
    //         this.isUntouched();
    // }

    id = this.webService.getCarListing(this.route.snapshot.params['id'])

    deleteCarListing(carListingId: any){
        this.webService.delCarListing(carListingId).subscribe((response: any) => {
            this.toastr.success("You have deleted a listing")
            this.router.navigateByUrl('/CarListings');
            
        })
    }

    editCarListing(carListingId: any) {
        this.webService.edCarListing(carListingId).subscribe((response: any) => {
            this.toastr.success("You have edited a listing")
            this.router.navigateByUrl('/CarListings/' + carListingId);
        })
    }

    deletePhoto(carListingId: any, photoid: any) {
        this.webService.delPhoto(carListingId, photoid).subscribe((response: any) => {
            this.toastr.success("Photo deleted")
            this.photos = this.webService.getPhotos(this.route.snapshot.params['id']);
        })
    }

    //add photo
    // 'http://localhost:5000/api/v1.0/carListings/' + this.carListingId + '/photos', postData
    // onFileSelected(event){
    //     console.log(event);
    // }

    filesW: File = null;
    //add photo
    onFileSelected(event){
        this.filesW = <File>event.target.files[0]
    }

    onUpload(carListingId: any){
        const fd = new FormData();
        fd.append('filesW', this.filesW, this.filesW.name)
        this.http.post('http://localhost:5000/api/v1.0/carListings/' + carListingId + '/photos', fd).subscribe(
            res => {
                console.log(res)
                this.toastr.success("Photo added")
                this.photos = this.webService.getPhotos(this.route.snapshot.params['id'])
            }
        )
    }

    // onPhotoSubmit(carListingId:any){
    //     this.webService.postPhoto(this.photoForm.File).subscribe((response: any) =>{
    //         this.photoForm.reset();
    //         this.toastr.success("You have added a photo")
    //         console.log("pass")
    //         // return this.router.navigate(['/CarListings', carListingId])
    //     });
    // this.photoForm.reset();
    // }

    // onPhotoSubmit(carListingId, file: File)
    // {
    //     this.http.post('http://localhost:5000/api/v1.0/carListings/' + this.carListingId + '/photos', postData)
    // }


    car_list: any = [];
    photos: any = [];


}