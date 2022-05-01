import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { WebService } from './web.service';
import { FormBuilder } from '@angular/forms';
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
           username: '',
           password: ''
        })
    }

    onSubmit() {
        this.webService.postUser(this.registerForm.value);
        // this.registerForm.reset();
        // this.toastr.success("You have successfully registered. You have been redirected to the login page...")
        // return this.router.navigate(['/login'])
    }

}