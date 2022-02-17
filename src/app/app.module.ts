import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CarListingsComponent } from './carListings.component';
import { CarListingComponent } from './carListing.component';
import { WebService } from './web.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from '@auth0/auth0-angular';
import { NavComponent } from './nav.component';
import { FootComponent } from './foot.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './filter.pipe'


var routes: any = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'CarListings',
    component: CarListingsComponent
  },
  {
    path: 'CarListings/:id',
    component: CarListingComponent
  }
];


@NgModule({
  declarations: [
    AppComponent, CarListingsComponent, HomeComponent, CarListingComponent, NavComponent, FootComponent, FilterPipe
  ],
  imports: [
    BrowserModule, HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    AuthModule.forRoot({
      domain: 'dev-nl4j4ua7.us.auth0.com',
      clientId: 'aKYBf9jUc3NHQdEjtfjCScxIbQTJryLG'
    }),
    
  ],
  providers: [WebService],
  bootstrap: [AppComponent],
})
export class AppModule { }
