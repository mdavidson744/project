import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { WebService } from './web.service';
import { FormBuilder , FormControl, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FilterPipe } from './filter.pipe';
import { FormsModule } from '@angular/forms';
import {HttpHeaders} from "@angular/common/http";

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: []
})

export class RegisterComponent { 
    registerForm: any;

    constructor(public webService: WebService,
                        private formBuilder: FormBuilder,
                        private route: ActivatedRoute, 
                        private router: Router,
                        private toastr: ToastrService) {}

    ngOnInit() {
    
        this.registerForm = this.formBuilder.group({

           username: new FormControl('', [Validators.required]),
           password: new FormControl('', [Validators.required])
        })
    }
    get username(){return this.registerForm.get('username')}
    get password(){return this.registerForm.get('password')}

    onSubmit() {
        this.webService.postUser(this.registerForm.value);
        // this.registerForm.reset();
        // this.toastr.success("You have successfully registered. You have been redirected to the login page...")
        // return this.router.navigate(['/login'])
    }

}