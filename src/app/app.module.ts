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
import { NavComponent } from './nav.component';
import { FootComponent } from './foot.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './filter.pipe'
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';


var routes: any = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'CarListings',
    component: CarListingsComponent
  },
  {
    path: 'CarListings/:id',
    component: CarListingComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];


@NgModule({
  declarations: [
    AppComponent, CarListingsComponent, HomeComponent, CarListingComponent, NavComponent, FootComponent, FilterPipe, LoginComponent, RegisterComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    FormsModule    
  ],
  providers: [WebService],
  bootstrap: [AppComponent],
})
export class AppModule { }
