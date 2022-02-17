import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';


@Component({
  selector: 'foot',
  templateUrl: './foot.component.html',
  styleUrls: []
})
export class FootComponent { 

  constructor(public authService: AuthService,
    public router: Router) {}

}
