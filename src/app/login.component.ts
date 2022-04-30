import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component } from '@angular/core';
import { WebService } from './web.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FilterPipe } from './filter.pipe';
import { FormsModule } from '@angular/forms';
import {HttpHeaders} from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: []
})

export class LoginComponent {
    loginForm: any;
    private username: string = '';
    private password: string = '';

    constructor(public webService: WebService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute, 
        private router: Router,
        private toastr: ToastrService) {}

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: '',
            password: '',
        })
    }

    isBlank() {}

    isUnfinished() {}

    isInvalid(control: any) {
        return this.loginForm.controls[control].invalid &&
      this.loginForm.controls[control].touched;
    }

    tokenHeader() {
        return {
          headers: new HttpHeaders({
            'Authorization': 'Basic ' + btoa(this.username + ':' + this.password)
          })
        }
      }

    onSubmit() {
        this.username = (<HTMLInputElement>document.getElementById("username")).value;
        this.password = (<HTMLInputElement>document.getElementById("password")).value;
        this.webService.getLogin(this.tokenHeader());
    }


}