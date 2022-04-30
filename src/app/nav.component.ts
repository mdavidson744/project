import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WebService } from './web.service';
import {HttpHeaders} from "@angular/common/http";


@Component({
  selector: 'navigation',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent { 

  constructor(
    public router: Router,
    public webService: WebService
    ) {}

    loggedInQ = false;

    ngOnInit() {
      this.loggedInQ = sessionStorage['loggedIn'];
      console.log('loggedInQ: ' + this.loggedInQ)
    }

    pushedHeader() {
      return {
          
          headers: new HttpHeaders({'x-access-token': sessionStorage['x-access-token'],
                                      'username': sessionStorage['username']})
      }
    }

    logoutJWT() {
      this.webService.logOut(this.pushedHeader());
      this.loggedInQ = false;
    }

}
