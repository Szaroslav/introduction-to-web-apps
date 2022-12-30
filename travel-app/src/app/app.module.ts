import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AccountModule } from './account/account.module';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { TripComponent } from './trips/trip/trip.component';
import { TripsComponent } from './trips/trips/trips.component';
import { TripCreateComponent } from './trips/trip-create/trip-create.component';
import { TripRateComponent } from './trips/trip-rate/trip-rate.component';
import { TripsFilterComponent } from './trips/trips-filter/trips-filter.component';
import { TripsFilterPipe } from './trips-filter.pipe';
import { CartComponent } from './cart/cart.component';
import { TripDetailsComponent } from './trips/trip-details/trip-details.component';
import { ImageSliderComponent } from './image-slider/image-slider.component';
import { TripsHistoryComponent } from './trips/trips-history/trips-history.component';
import { CartCompactComponent } from './cart-compact/cart-compact.component';
import { DashboardComponent } from './account/dashboard/dashboard.component';


@NgModule({
    declarations: [
        AppComponent,
        NavigationComponent,
        HomeComponent,
        TripsComponent,
        TripComponent,
        TripCreateComponent,
        TripRateComponent,
        TripsFilterComponent,
        TripsFilterPipe,
        CartComponent,
        TripDetailsComponent,
        ImageSliderComponent,
        TripsHistoryComponent,
        CartCompactComponent,
        DashboardComponent
    ],

    imports: [
        AccountModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        HttpClientJsonpModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatTooltipModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSliderModule,
        MatButtonToggleModule,
        MatSelectModule,
        MatDatepickerModule,
        MatMomentDateModule
    ],
    
    providers: [
        MatDatepickerModule
    ],

    bootstrap: [AppComponent]
})

export class AppModule { }